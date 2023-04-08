import {h} from 'preact';
import { useState } from 'preact/hooks';

function CalculatorInput({symbol, units, name, value, handler}) {

  return (
    <div class='col-sm input-group'>
      <span class='input-group-text'>{symbol}</span>
      <input type="text" class='form-control text-center' placeholder={name} aria-label={name} value={value} onInput={handler} />
      <span class='input-group-text'>{units}</span>
    </div>
  )
}

export default function Pt100Calculator() {
  const [resistance, setResistance] = useState(100);
  const [temperature, setTemperature] = useState(0);
  const [celsius, setCelsius] = useState(true);

  const handleResistance = (rtext) => {
    const r = parseFloat(rtext);
    if (!isNaN(r)) {
      let t = celsius ? 0 : 273.15;
      if (r > 100) {
        t += 3383.809524 - .8658008658e-1*Math.sqrt(1758480889. - 2310000.*r);
      } else {
        t += .172184658699642e-7*Math.pow(r, 4) - .995479323918948e-5*Math.pow(r, 3) + .285795641832195e-2*Math.pow(r, 2) + 2.21610504733757*r - 241.959043339973;
      }
      setResistance(r);
      setTemperature(t);
    } // to prevent accidentally turning both R and T into NaNs, in lieu of proper validation
  }

  const handleTemperature = (ttext) => {
    const tInWhateverUnits = parseFloat(ttext);
    if (!isNaN(tInWhateverUnits)) {
      const t = celsius ? tInWhateverUnits : tInWhateverUnits - 273.15; //in celsius!
      const R0 = 100;
      const a = 3.9083e-3;
      const b = -5.775e-7;
      const c = -4.183e-12;
      let r = 0;
      if (t > 0) {
        r = R0 * (1 + a*t + b*Math.pow(t, 2));
      } else {
        r = R0 * (1 + a*t + b*Math.pow(t, 2) + c*Math.pow(t, 3)*(t - 100));
      }
      setResistance(r);
      setTemperature(tInWhateverUnits);
    } //else do nothing - useful for typing the negative T starting with '-'
  }

  const handleUnits = (switchToCelsius) => {
    const additive = switchToCelsius ? (-273.15) : 273.15;
    setTemperature(temperature + additive);
  }

  return (
    <div class='container mt-3 mb-3'>
      <div class='row gy-2'>
        <CalculatorInput 
          symbol='R' 
          units='Ohm' 
          name='Resistance' 
          value={parseFloat(resistance.toFixed(4))} 
          handler={(e) => handleResistance(e.target.value)} />
        <CalculatorInput 
          symbol='T' 
          units={celsius ? '°C' : 'K'} 
          name='Temperature' 
          value={parseFloat(temperature.toFixed(3))} 
          handler={(e) => handleTemperature(e.target.value)} />
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