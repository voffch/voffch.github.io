"use strict";

//Output-related functions
//This file is not quite general and relies on the particular structure of the html
//and also uses a lot of classes from w3.css

var currentChemicalSubstance;
var currentChemicalEquation;

function signalErroneousInput(node) {
    node.classList.remove("w3-border-light-green");
    node.classList.add("w3-border-deep-orange");
}

function clearErroneousInput(node) {
    node.classList.remove("w3-border-deep-orange");
    node.classList.add("w3-border-light-green");
}

function outputMolarMass(inputID, outTextID, outMassID, outButtonsID, outCalcID, outTableID) {
    //read the formula
    var inputNode = document.getElementById(inputID);
    var formula = inputNode.value;
    var subst = new chemCalc.ChemicalSubstance(formula);
    //update the global variable
    currentChemicalSubstance = subst;
    //init the output nodes
    var outputText = document.getElementById(outTextID);
    var outputMass = document.getElementById(outMassID);
    var outputButtons = document.getElementById(outButtonsID);
    var outputCalc = document.getElementById(outCalcID);
    var outputTable = document.getElementById(outTableID);
    //hide all output nodes
    for (var node of [outputText, outputMass, outputButtons, outputCalc, outputTable]) {
        node.classList.add("w3-hide");
    }
    //clear calc input fields
    var outputCalcInputs = document.querySelectorAll("#" + outCalcID + " input");
    for (var node of outputCalcInputs) {
        node.value = "";
    }
    if (subst.valid) {
        //compute output
        outputText.innerHTML = subst.html;
        outputMass.innerHTML = "<i>M</i> = " + chemCalc.ftoa(subst.molarMass) + " g\u00B7mol<sup>-1</sup>";
        var tableRows = document.querySelectorAll("#" + outTableID + " tr");
        for (var row = 1; row < tableRows.length; row++) {
            outputTable.removeChild(tableRows[row]);
        }
        var totalElementMoles = 0;
        for (var element in subst.elementMoles) {
            totalElementMoles += subst.elementMoles[element];
        }
        for (var element in subst.elementMoles) {
            var columns = [
                element,
                chemCalc.ftoa(subst.elementMoles[element]),
                chemCalc.ftoa(100 * subst.elementMoles[element] / totalElementMoles, 3),
                chemCalc.ftoa(100 * subst.elementMoles[element] * 
                    chemCalc.periodicTable[element] / subst.molarMass, 3)
            ];
            var newRow = document.createElement("tr");
            for (var td of columns) {
                var newCell = document.createElement("td");
                newCell.textContent = td;
                newRow.appendChild(newCell);
            }
            outputTable.appendChild(newRow);
        }
        //display all
        clearErroneousInput(inputNode);
        for (var node of [outputText, outputMass, outputButtons, outputCalc, outputTable]) {
            node.classList.remove("w3-hide");
        }
    } else {
        //error report, display the text node only
        signalErroneousInput(inputNode);
        outputText.innerHTML = subst.html;
        outputText.classList.remove("w3-hide")
    }
}

function outputChemicalEquation(inputID, outTextID, outReagentsID, outProductsID, outButtonsID) {
    //helper function so as not to duplicate the code
    function fillTableWithParticipants(participantArray, tableNode, inputIDprefix) {
        if (!inputIDprefix) {
            inputIDprefix = "";
        }
        for (var participant of participantArray) {
            var subst = participant.substance;
            var coeff = participant.coefficient;
            var columns = [
                chemCalc.ftoa(coeff),
                subst.html,
                chemCalc.ftoa(subst.molarMass)
            ];
            var newRow = document.createElement("tr");
            for (var td of columns) {
                var newCell = document.createElement("td");
                newCell.innerHTML = td;
                newRow.appendChild(newCell);
            }
            var newInput = document.createElement("input");
            newInput.id = inputIDprefix + subst.formula;
            newInput.type = "text";
            newInput.classList.add("w3-input");
            newInput.addEventListener("input", function() {equationMassCalculator(this.id);});
            var inputCell = document.createElement("td");
            inputCell.appendChild(newInput);
            newRow.appendChild(inputCell);
            tableNode.appendChild(newRow);
        }
    }
    //init nodes
    var inputNode = document.getElementById(inputID);
    var reagentTable = document.getElementById(outReagentsID);
    var productsTable = document.getElementById(outProductsID);
    var outputText = document.getElementById(outTextID);
    var outputButtons = document.getElementById(outButtonsID);
    //hide everything before calculating
    for (var node of [outputText, reagentTable, productsTable, outputButtons]) {
        node.classList.add("w3-hide");
    }
    var equationTextString = inputNode.value;
    var equation = new chemCalc.ChemicalEquation(equationTextString);
    //update the global variable
    currentChemicalEquation = equation;
    if (equation.valid) {
        //compute output
        outputText.innerHTML = equation.html;
        //clear the reagents and products
        for (var id of [outReagentsID, outProductsID]) {
            var tableRows = document.querySelectorAll("#" + id + " tr");
            var table = (id == outReagentsID) ? reagentTable : productsTable;
            for (var row = 1; row < tableRows.length; row++) {
                table.removeChild(tableRows[row]);
            }
        }
        //fill out the tables
        fillTableWithParticipants(equation.reagents, reagentTable, "r");
        fillTableWithParticipants(equation.products, productsTable, "p");
        clearErroneousInput(inputNode);
        for (var node of [outputText, reagentTable, productsTable, outputButtons]) {
            node.classList.remove("w3-hide");
        }
    } else {
        //error report
        outputText.innerHTML = equation.html;
        signalErroneousInput(inputNode);
        outputText.classList.remove("w3-hide");
    }
}

function equationMassCalculator(callerID) {
    //assuming that callerID is composed of a prefix, "r" or "p" for reagent or product
    //followed by a substance.formula string
    if ((typeof(currentChemicalEquation) != "undefined") && currentChemicalEquation.valid) {
        var formula = callerID.substr(1);
        var reagent = (callerID.charAt(0) == "r");
        var mass = Number(document.getElementById(callerID).value);
        var molesPerCoeff = 0;//i.e. moles of a substance divided by its stoichiometric coeff
        var arrPtr;
        if (reagent) {
            arrPtr = currentChemicalEquation.reagents;
        } else {
            arrPtr = currentChemicalEquation.products;
        }
        for (var part of arrPtr) {
            //could have used Array.find and a custom function, but probably not with so few elements
            if (part.substance.formula == formula) {
                molesPerCoeff = (mass / part.substance.molarMass) / part.coefficient;
                break;
            }
        }
        for (var part of currentChemicalEquation.reagents) {
            if (!(reagent && (part.substance.formula == formula))) {
                var currentInput = document.getElementById("r" + part.substance.formula);
                mass = molesPerCoeff * part.coefficient * part.substance.molarMass;
                currentInput.value = chemCalc.ftoa(mass);
            }
        }
        for (var part of currentChemicalEquation.products) {
            if (reagent || !(part.substance.formula == formula)) {
                var currentInput = document.getElementById("p" + part.substance.formula);
                mass = molesPerCoeff * part.coefficient * part.substance.molarMass;
                currentInput.value = chemCalc.ftoa(mass);
            }
        }
    }
}

function formulaInputKeydown(event) {
    if (event.key == "Enter") {
        formulaInputBlur();
    }
}

function formulaInputBlur() {
    outputMolarMass("formula_input", "formula_output_text", "formula_output_molar_mass", "formula_copy_button_container",
                        "formula_output_calculator", "formula_output_table");
}

function formulaOutputCalculator(whichOneChanged) {
    //assumed that there are two inputs, and the first one is moles
    var inputs = document.querySelectorAll("#formula_output_calculator input");
    if (inputs.length == 2) {
        var moles = Number(inputs[0].value);
        var mass = Number(inputs[1].value);
        if (currentChemicalSubstance.valid) {
            var molarMass = currentChemicalSubstance.molarMass;
            switch (whichOneChanged) {
                case 0:
                    var newMass = molarMass * moles;
                    inputs[1].value = chemCalc.ftoa(newMass);
                    break;
                case 1:
                    var newMoles = mass / molarMass;
                    inputs[0].value = chemCalc.ftoa(newMoles);
                    break;
                default:
                    break;
            }
        }
    }
}

function equationInputKeydown(event) {
    if (event.key == "Enter") {
        equationInputBlur();
    }
}

function equationInputBlur() {
    outputChemicalEquation("equation_input", "equation_output_text", "equation_output_reagents", 
                                "equation_output_products", "equation_copy_button_container");
}

function toggleSectionDisplay(sectionID) {
    var section = document.getElementById(sectionID);
    section.classList.toggle("w3-hide");
}

//clipboard-copying functions

function copyTextToClipboard(html, plainText) {
    //large part of the solution was suggested by John Henckel on stackoverflow
    if (!plainText) {
        plainText = html.replace(/<[^>]+>/g, "");
    }
	try {
		function listener(e) {
			e.clipboardData.setData("text/html", html);
			e.clipboardData.setData("text/plain", plainText);
			e.preventDefault();
		}
		document.addEventListener("copy", listener);
		document.execCommand("copy");
		document.removeEventListener("copy", listener);
	} catch (err) {
		console.log('Unable to copy to clipboard (unsupported by the browser?)');
	}
}

function clipboardCopyFormula(whatToCopy) {
	if ((typeof(currentChemicalSubstance) != "undefined") && currentChemicalSubstance.valid) {
        switch (whatToCopy) {
            case "formula":
                copyTextToClipboard(currentChemicalSubstance.html);
                break;
            case "mass":
                copyTextToClipboard(chemCalc.ftoa(currentChemicalSubstance.molarMass));
                break;
            default:
                break;
        }
	}
}

function clipboardCopyEquation(whatToCopy) {

    //helper function
    //assuming that ids of inputs are composed of a prefix, "r" or "p" for reagent or product
    //followed by a substance.formula string
    //it is not exactly the table that we construct, but should paste to e.g. Excel nicely
    function constructTable(equation) {

        function constructHeader(what) {
            var headerParts = [
                "Coefficient",
                what,
                "M, g\u00B7mol<sup>-1</sup>",
                "Mass, g"
            ];
            return "<tr><th>" + headerParts.join("</th><th>") + "</th></tr>";
        }

        function constructLine(prefix, part) {
            var input = document.getElementById(prefix + part.substance.formula);
            var lineParts = [
                chemCalc.ftoa(part.coefficient),
                part.substance.html,
                chemCalc.ftoa(part.substance.molarMass),
                input.value
            ];
            return "<tr><td>" + lineParts.join("</td><td>") + "</td></tr>";
        }

        var html = "";
        var plainText = "";

        html += "<table>" + constructHeader("Reagent");
        for (var part of equation.reagents) {
            html += constructLine("r", part);
        }
        html += constructHeader("Product");
        for (var part of equation.products) {
            html += constructLine("p", part);
        }
        html += "</table>";

        plainText = html.replace(/<\/th><th>|<\/td><td>/g, "\t");
        plainText = plainText.replace(/<\/tr><tr>/g, "\n");
        plainText = plainText.replace(/<[^>]+>/g, "");

        return {
            html: html,
            plainText: plainText
        };
    }

	if ((typeof(currentChemicalEquation) != "undefined") && currentChemicalEquation.valid) {
        var htmlText = "";
        var plainText = "";
        switch(whatToCopy) {
            case "equation":
                htmlText = currentChemicalEquation.html;
                break;
            case "table":
                //this one is tricky: since all the masses are stored in the inputs
                //inside the table, we cannot just 'copy' the table, hence we reconstruct it
                var table = constructTable(currentChemicalEquation);
                htmlText = table.html;
                plainText = table.plainText;
                break;
            case "all":
                var table = constructTable(currentChemicalEquation);
                htmlText = currentChemicalEquation.html + "<br>" + table.html;
                plainText = currentChemicalEquation.html.replace(/<[^>]+>/g, "") + "\n" + table.plainText;
                break;
            default:
                break;
        }
        if (plainText.length == 0) {
            copyTextToClipboard(htmlText);
        } else {
            copyTextToClipboard(htmlText, plainText);
        }
	}
}
