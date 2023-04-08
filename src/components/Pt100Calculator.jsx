import {h} from 'preact';
import { useState } from 'preact/hooks';

function getDecimalSeparator() {
  
  var str = parseFloat(0.1).toLocaleString();
  var sep = '.';
  
  if (str.match("0")) {
    const match = str.match(/0(.*)1/);
    if (match[1]) {
      sep = match[1];
    }
  }

  return sep;
}

function CalculatorInput({symbol, units, name, value, handler, valid}) {

  function handleBeforeInput(e) {
    //dirty validation directly on input
    const numericInputReg = /^[\d\.\,e\+-]+$/i;
    if (e.data && !numericInputReg.test(e.data)) {
      e.preventDefault();
    }
  }

  return (
    <div class='col-sm input-group'>
      <span class='input-group-text'>{symbol}</span>
      <input 
        type="text" 
        class={'form-control text-center ' + (!valid && 'is-invalid')}
        placeholder={name} 
        aria-label={name}
        value={value} 
        onInput={handler} 
        onBeforeInput={handleBeforeInput}/>
      <span class='input-group-text'>{units}</span>
    </div>
  )
}

export default function Pt100Calculator() {
  const [resistance, setResistance] = useState("100");
  const [temperature, setTemperature] = useState("0");
  const [celsius, setCelsius] = useState(true);
  const [valid, setValid] = useState(true);

  const numberReg = /^[+-]?(\d+[\,\.]?\d*|\d*[\,\.]?\d+)(e[+-]?\d+)?$/i;
  const isNumber = (text) => numberReg.test(text);
  const toString = (number, precision) => parseFloat(number.toFixed(precision)).toString();

  const handleResistance = (rtext) => {
    setResistance(rtext);
    if (isNumber(rtext)) {
      const r = parseFloat(rtext);
      let t = celsius ? 0 : 273.15;
      if (r >= 100) {
        t += 3383.809524 - .8658008658e-1*Math.sqrt(1758480889. - 2310000.*r);
      } else {
        t += .172184658699642e-7*Math.pow(r, 4) - .995479323918948e-5*Math.pow(r, 3) + .285795641832195e-2*Math.pow(r, 2) + 2.21610504733757*r - 241.959043339973;
      }
      setTemperature(toString(t, 3));
      setValid(true);
    } else {
      setValid(false);
    }
  }

  const handleTemperature = (ttext) => {
    setTemperature(ttext);
    if (isNumber(ttext)) {
      const tInWhateverUnits = parseFloat(ttext);
      const t = celsius ? tInWhateverUnits : tInWhateverUnits - 273.15; //in celsius!
      const R0 = 100;
      const a = 3.9083e-3;
      const b = -5.775e-7;
      const c = -4.183e-12;
      let r = 0;
      if (t >= 0) {
        r = R0 * (1 + a*t + b*Math.pow(t, 2));
      } else {
        r = R0 * (1 + a*t + b*Math.pow(t, 2) + c*Math.pow(t, 3)*(t - 100));
      }
      setResistance(toString(r, 4));
      setValid(true);
    } else {
      setValid(false);
    }
  }

  const handleUnits = (switchToCelsius) => {
    const additive = switchToCelsius ? (-273.15) : 273.15;
    const newValue = parseFloat(temperature) + additive;
    setTemperature(toString(newValue, 3));
  }

  return (
    <div class='container mt-3 mb-3'>
      <div class="small text-end">{`"${getDecimalSeparator()}" is your decimal separator`}</div>
      <div class='row gy-2'>
        <CalculatorInput 
          symbol='R' 
          units='Ohm' 
          name='Resistance' 
          value={resistance} 
          handler={(e) => handleResistance(e.target.value)}
          valid={valid} />
        <CalculatorInput 
          symbol='T' 
          units={celsius ? '°C' : 'K'} 
          name='Temperature' 
          value={temperature} 
          handler={(e) => handleTemperature(e.target.value)}
          valid={valid} />
      </div>
      <div class="d-flex justify-content-end form-check form-switch">
        <label class="form-check-label" for="temperatureInCelsius">T in °C? 
        <input 
          class="form-check-input" 
          type="checkbox" 
          role="switch" 
          id="temperatureInCelsius" 
          checked={celsius ? true : false}
          onChange={(e) => {
            setCelsius(e.target.checked);
            handleUnits(e.target.checked);
          }} />
        </label>
      </div>
    </div>
  )
}