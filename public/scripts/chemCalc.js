"use strict";

var chemCalc = (function() {

//atomic weight source: IUPAC and CIAAW (http://www.ciaaw.org), 2013
var periodicTable = {
    H:1.007975,
    He:4.0026022,
    Li:6.9675,
    Be:9.01218315,
    B:10.8135,
    C:12.0106,
    N:14.006855,
    O:15.9994,
    F:18.9984031636,
    Ne:20.17976,
    Na:22.989769282,
    Mg:24.305,
    Al:26.98153857,
    Si:28.085,
    P:30.9737619985,
    S:32.0675,
    Cl:35.4515,
    Ar:39.9481,
    K:39.09831,
    Ca:40.0784,
    Sc:44.9559085,
    Ti:47.8671,
    V:50.94151,
    Cr:51.99616,
    Mn:54.9380443,
    Fe:55.8452,
    Co:58.9331944,
    Ni:58.69344,
    Cu:63.5463,
    Zn:65.382,
    Ga:69.7231,
    Ge:72.6308,
    As:74.9215956,
    Se:78.9718,
    Br:79.905,
    Kr:83.7982,
    Rb:85.46783,
    Sr:87.621,
    Y:88.905842,
    Zr:91.2242,
    Nb:92.906372,
    Mo:95.951,
    Tc:97,
    Ru:101.072,
    Rh:102.905502,
    Pd:106.421,
    Ag:107.86822,
    Cd:112.4144,
    In:114.8181,
    Sn:118.7107,
    Sb:121.7601,
    Te:127.603,
    I:126.904473,
    Xe:131.2936,
    Cs:132.905451966,
    Ba:137.3277,
    La:138.905477,
    Ce:140.1161,
    Pr:140.907662,
    Nd:144.2423,
    Pm:145,
    Sm:150.362,
    Eu:151.9641,
    Gd:157.253,
    Tb:158.925352,
    Dy:162.5001,
    Ho:164.930332,
    Er:167.2593,
    Tm:168.934222,
    Yb:173.0545,
    Lu:174.96681,
    Hf:178.492,
    Ta:180.947882,
    W:183.841,
    Re:186.2071,
    Os:190.233,
    Ir:192.2173,
    Pt:195.0849,
    Au:196.9665695,
    Hg:200.5923,
    Tl:204.3835,
    Pb:207.21,
    Bi:208.980401,
    Po:209,
    At:210,
    Rn:222,
    Fr:223,
    Ra:226,
    Ac:227,
    Th:232.03774,
    Pa:231.035882,
    U:238.028913,
    Np:237,
    Pu:244,
    Am:243,
    Cm:247,
    Bk:247,
    Cf:251,
    Es:252,
    Fm:257,
    Md:258,
    No:259,
    Lr:262,
    Rf:267,
    Db:270,
    Sg:271,
    Bh:270,
    Hs:277,
    Mt:276,
    Ds:281,
    Rg:282,
    Cn:285,
    Uut:285,
    Fl:289,
    Uup:289,
    Lv:293,
    Uus:294,
    Uuo:294
};

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
        return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

var chemRegExp = (function () {
    var leftBracket = "[\\u0028\\u005B\\u007B]";// ({[
    var rightBracket = "[\\u0029\\u005D\\u007D]";// )}]
    var cdot = "[\\u002A\\u002B\\u00B7]";// +*cdot
    var element = "[A-Z][a-z]*";
    var num = "[0-9]*\\.?[0-9]+|[0-9]+\\.?[0-9]*";
    var formula = [element, num, leftBracket, rightBracket, cdot].join("|");
    var equation = "[^\\s\\+=]+|=";
    
    var regExps = {
        "leftBracket" : RegExp(leftBracket),
        "rightBracket" : RegExp(rightBracket),
        "cdot" : RegExp(cdot),
        "element" : RegExp(element),
        "number" : RegExp(num),
        "formula" : RegExp(formula, "g"),
        "equation" : RegExp(equation, "g")
    }

    function result(what) {
        return regExps[what];
    }

    return result;
})();

function ChemicalSubstance(formulaText) {
    this.formula = formulaText;
    this.html = "";
    this.elementMoles = {};
    this.molarMass = 0;
    this.valid = false;
    this.startsWithNumber = false;
    this.init = function(formula) {
        function FormulaToken(value, type) {
            //just a token type definition
            this.value = value;//text or number
            this.type = type;//unknown, cdot, element, quantity, leftBracket, rightBracket
        }

        function tokenize(strInput) {
            //takes string as an input
            //returns an array of FormulaToken tokens
            //thanks to regexps, this one is pretty straightforward
            var tokenArray = [];
            if (strInput.length > 0) {
                var tokenStringArray = strInput.match(chemRegExp("formula"));
                if (tokenStringArray != null && tokenStringArray.length > 0) {
                    for (var tokenText of tokenStringArray) {
                        var thisToken;
                        if (chemRegExp("element").test(tokenText)) {
                            if (typeof(periodicTable[tokenText]) != "undefined") {
                                thisToken = new FormulaToken(tokenText, "element");
                            } else {
                                thisToken = new FormulaToken(tokenText, "unknown");
                            }
                        } else if (chemRegExp("number").test(tokenText)) {
                            thisToken = new FormulaToken(Number(tokenText), "quantity");
                        } else if (chemRegExp("leftBracket").test(tokenText)) {
                            thisToken = new FormulaToken(tokenText, "leftBracket");
                        } else if (chemRegExp("rightBracket").test(tokenText)) {
                            thisToken = new FormulaToken(tokenText, "rightBracket");
                        } else if (chemRegExp("cdot").test(tokenText)) {
                            thisToken = new FormulaToken(tokenText, "cdot");
                        } else {
                            //not quite accessible
                            thisToken = new FormulaToken("???", "unknown");
                        }
                        tokenArray.push(thisToken);
                    }
                }
            }
            return tokenArray;
        }

        function appendElement(elementsObject, element, quantity) {
            //adds certain amount of element to the elementsObject
            if (typeof(elementsObject[element]) == "undefined") {
                elementsObject[element] = quantity;
            } else {
                elementsObject[element] += quantity;
            }
        }

        function countElements(tokenArray) {
            //this is where the most important part of the whole rigmarole happens
            //complicated 'cause the actual formula may look something like this 2(3Cu((SO4.5)3CO3)2)5*2.8H2O

            function multiplyQuantitiesByNumber(elementsObject, num) {
                for (var element in elementsObject) {
                    elementsObject[element] *= num;
                }
            }

            //here the elements will be located
            var formulaElements = {};
            //formulaParts are the ones separated by * (e.g. CuSO4 and 5H2O in CuSO4*5H2O)
            //an array of objects whose indices are chemical element symbols and values are element quantities
            var formulaParts = [];
            formulaParts.push({});
            var formulaPartIndex = 0;
            //an array is essential for multiple-bracketed formulae
            var multiplyingCoeffArray = [];
            var currentMultiplier = 1;
            //starting from right to left
            for (var i = tokenArray.length - 1; i >= 0; i--) {
                switch (tokenArray[i].type) {
                    case "quantity":
                        //we place the numbers encountered in currentMultiplier first
                        //the next token determines what to do with it
                        currentMultiplier = tokenArray[i].value;
                        break;
                    case "rightBracket":
                        //until the next leftBracket, the elements' quantities
                        //should be multiplied by the currentMultiplier
                        //that's why we push it
                        multiplyingCoeffArray.push(currentMultiplier);
                        currentMultiplier = 1;
                        break;
                    case "leftBracket":
                        multiplyingCoeffArray.pop();
                        if (i < (tokenArray.length - 1) && tokenArray[i+1].type != "quantity") {
                            break;
                        } else {
                            //left bracket encountered before (seen left-to-right) the number is a special case
                            //and is kinda equivalent to the next cdot one
                            //hence no break here
                            //break;
                        }
                    case "cdot":
                        if (currentMultiplier != 1) {
                            if (isEmpty(formulaParts[formulaPartIndex]) && formulaPartIndex > 0) {
                                //another special case of quantity stuck between * and (
                                //like in H2O*2(3CO2)
                                //here the quantity "2" applies to the previous formulaPart
                                multiplyQuantitiesByNumber(formulaParts[formulaPartIndex-1], currentMultiplier);
                            } else {
                                multiplyQuantitiesByNumber(formulaParts[formulaPartIndex], currentMultiplier);
                            }
                            currentMultiplier = 1;
                        }
                        //init the next formulaPart
                        formulaParts.push({});
                        formulaPartIndex += 1;
                        break;
                    case "element":
                        //works the same regardless of whether encountered after the number or not
                        for (var multiplier of multiplyingCoeffArray) {
                            currentMultiplier *= multiplier;
                        }
                        appendElement(formulaParts[formulaPartIndex], tokenArray[i].value, currentMultiplier);
                        currentMultiplier = 1;
                        break;
                    case "unknown":
                    default:
                        break;
                }
            }
            if (currentMultiplier != 1) {
                //numeric multiplier preceding the last formulaPart
                //means that we have to increase the quantity of all the elements in it
                if (isEmpty(formulaParts[formulaPartIndex]) && formulaPartIndex > 0) {
                    //that special case described above still applies!
                    multiplyQuantitiesByNumber(formulaParts[formulaPartIndex-1], currentMultiplier);
                } else {
                    multiplyQuantitiesByNumber(formulaParts[formulaPartIndex], currentMultiplier);
                }
            }
            //now we need to consolidate all the formulaParts into formulaElements
            //but before we do that, let's init the formulaElements
            //so as to put all the elements in order of appearance
            for (var token of tokenArray) {
                if (token.type == "element") {
                    appendElement(formulaElements, token.value, 0);
                }
            }
            for (var part of formulaParts) {
                for (var element in part) {
                    appendElement(formulaElements, element, part[element]);
                }
            }
            return formulaElements;
        }

        function validateFormula(tokenArray) {
            var errorMsg = "";
            var brackets = 0;
            //check the logic of the token placement in the formula
            //try to catch at least some of the most obvious inconvenient mistakes
            try {
                if (tokenArray.length <= 0) {
                    throw "empty formula";
                }
                for (var i = 0; i < tokenArray.length; i++) {
                    switch (tokenArray[i].type) {
                        case "quantity":
                            if (i == 0) {
                                if (tokenArray.length <= 1) {
                                    throw "no elements found";
                                } else if (tokenArray[i+1].type == "cdot") {
                                    throw "begins with " + tokenArray[i].value.toString() + " which refers to nothing";
                                }
                            } else if (i == (tokenArray.length - 1)) {
                                if (tokenArray[i-1].type == "cdot") {
                                    throw "ends with " + tokenArray[i].value.toString() + " which refers to nothing";
                                }
                            } else if (tokenArray[i-1].type == "leftBracket" && tokenArray[i+1].type == "rightBracket") {
                                throw tokenArray[i].value.toString() + " inside the brackets refers to nothing";
                            } else if (tokenArray[i-1].type == "quantity" || tokenArray[i+1].type == "quantity") {
                                throw "check the numeric quantities";
                            }
                            break;
                        case "cdot":
                            if (i == 0) {
                                throw "begins with \u00B7";
                            } else if (i == (tokenArray.length - 1)) {
                                throw "ends with \u00B7";
                            } else if (tokenArray[i-1].type == "cdot" || tokenArray[i+1].type == "cdot") {
                                throw "two adjoining \"\u00B7\"";
                            } else if (brackets != 0) {
                                throw "no \"\u00B7\" inside the brackets allowed";
                            }
                            break;
                        case "leftBracket":
                            brackets += 1;
                            break;
                        case "rightBracket":
                            brackets -= 1;
                            if (brackets < 0) {
                                //a closing bracket without a matching opening one
                                throw "bracket mismatch";
                            } else if (tokenArray[i-1].type == "leftBracket") {
                                throw "nothing inside the brackets";
                            }
                            break;
                        case "element":
                            //could be anywhere, I suppose
                            break;
                        case "unknown":
                        default:
                            throw "\"" + tokenArray[i].value + "\"" + " unrecognized";
                            break;
                    }
                }
                if (brackets != 0) {
                    //probably more opening than closing brackets
                    throw "bracket mismatch";
                }
            } catch(err) {
                errorMsg = "Invalid formula: " + err;
            }
            return errorMsg;
        }

        function makeHTMLformula(tokenArray) {
            //make "beautiful" representation of parsed formula from the token array
            var resultingHTML = "";
            for (var i = 0; i < tokenArray.length; i++) {
                switch (tokenArray[i].type) {
                    case "quantity":
                        //make the number subscript if it is not the first token
                        //and if it is not preceded by either cdot or leftBracket
                        if (i != 0 && tokenArray[i-1].type != "cdot" && tokenArray[i-1].type != "leftBracket") {
                            resultingHTML += "<sub>" + tokenArray[i].value.toString() + "</sub>";
                        } else {
                            resultingHTML += tokenArray[i].value.toString();
                        }
                        break;
                    case "cdot":
                        //make cdot always this one symbol
                        resultingHTML += "\u00B7";
                        break;
                    case "rightBracket":
                    case "leftBracket":
                    case "element":
                        resultingHTML += tokenArray[i].value;
                        break;
                    case "unknown":
                    default:
                        break;
                }
            }
            return resultingHTML;
        }

        function calculateMolarMass(elementsObject) {
            var mass = 0;
            for (var element in elementsObject) {
                mass += periodicTable[element] * elementsObject[element];
            }
            return mass;
        }

        //ACTION!
        //get rid of whitespaces & commas & split on dots (*)
        formula = formula.replace(/\s/g,"");
        formula = formula.replace(/,/g,".");
        //parse and calculate
        var tokens = tokenize(formula);
        var errorMessage = validateFormula(tokens);
        if (errorMessage.length <= 0) {
            this.valid = true;
            this.html = makeHTMLformula(tokens);
            this.elementMoles = countElements(tokens);
            this.molarMass = calculateMolarMass(this.elementMoles);
            if (tokens[0].type == "quantity") {
                this.startsWithNumber = true;
            }
        } else {
            this.html = errorMessage;
            this.valid = false;
        }
    }
    //do not forget to init when the constructor is called
    this.init(this.formula);
}

var LinearSolver = (function() {
    //an oversimplified version of Gauss elimination for solving linear equation systems only
    //inspired by the pseudocode from https://en.wikipedia.org/wiki/Gaussian_elimination
    //and based on an implementation of Ophir LOJKINE https://github.com/lovasoa/linear-solve.git

    function Mat(matrix) {
        //variables
        //mat (matrix) is an array of arrays where mat[i] is a row array
        //it is an augmented matrix with the last column representing the augmentation
        this.mat = [];
        this.invertible;
        this.singular;
        this.rows = matrix.length;
        this.cols = matrix[0].length;

        //initialization
        //creating deep mat array copies
        //can probably be replaced by JSON.parse(JSON.stringify())
        for (var row = 0; row < this.rows; row++) {
            this.mat.push([]);
            for (var col = 0; col < this.cols; col++) {
                this.mat[row].push(matrix[row][col]);
            }
        }

        //methods
        this.swapRows = function(row1, row2) {
            var temp = this.mat[row1];
            this.mat[row1] = this.mat[row2];
            this.mat[row2] = temp;
        }

        this.multiplyRow = function(row, multiplier) {
            for (var col = 0; col < this.cols; col++) {
                this.mat[row][col] *= multiplier;
            }
        }

        this.addRowMultiple = function(destRow, sourceRow, multiplier) {
            for (var col = 0; col < this.cols; col++) {
                this.mat[destRow][col] += this.mat[sourceRow][col] * multiplier;
            }
        }

        this.gauss = function() {
            var nullRows = [];
            //remember - the last column is the augmentation (an answer column)
            for (var col = 0, pivot = 0; col < this.cols - 1; col++, pivot++) {
                var maxValue = 0;
                var maxRow = 0;
                for (var row = pivot; row < this.rows; row++) {
                    //find the row with the maximum value in the current column
                    var val = this.mat[row][col];
                    if (Math.abs(val) > Math.abs(maxValue)) {
                        maxRow = row;
                        maxValue = val;
                    }
                }
                if (maxValue === 0) {
                    //no pivot in this column
                    nullRows.push(pivot);
                } else {
                    this.swapRows(maxRow, pivot);
                    this.multiplyRow(pivot, 1 / maxValue);
                    for (var row = 0; row < this.rows; row++) {
                        if (row !== pivot) {
                            this.addRowMultiple(row, pivot, -this.mat[row][col]);
                        }
                    }
                }
            }
            //if there are columns with no pivots, the matrix is not invertible
            this.invertible = (nullRows.length === 0);
            this.singular = false;
            if (!this.invertible) {
                //to be singular, needs to be noninvertible
                //with nonzero augmentation in zero row
                for (var row = 0; row < nullRows.length; row++) {
                    if (this.mat[row][this.cols - 1] !== 0) {
                        this.singular = true;
                        break;
                    }
                }
            }
        }
    }

    function pseudoGCD(numbers) {
        //floating-point kinda pseudo Greater Common Denominator
        var gcd = undefined;
        var isZero = function(x) { return x === 0; };
        var arr = numbers.map(Math.abs);
        //clear the zeroes
        while (arr.indexOf(0) > -1) {
            arr.splice(arr.indexOf(0), 1);
        }
        if (arr.length >= 2) {
            arr.sort(function(a, b){return a - b});
            gcd = arr[0];
            for (var i = 1; i < arr.length; i++) {
                var rem = gcd;
                while(rem > 1e-8) {
                    gcd = rem;
                    rem = arr[i] % gcd;
                }
            }
        }
        return gcd;
    }

    function solve(augmentedMatrix, needIntegerSolution) {
        //for compatibility with ancient browsers (probably extraneous)
        if (typeof Array.isArray === 'undefined') {
            Array.isArray = function(obj) {
                return Object.prototype.toString.call(obj) === '[object Array]';
            }
        }

        var result = undefined;
        var valid = false;
        //checking the matrix
        if (Array.isArray(augmentedMatrix) && Array.isArray(augmentedMatrix[0])) {
            //checking if the number of columns is the same
            var rows = augmentedMatrix.length;
            if (rows > 1) {
                var columns = augmentedMatrix[0].length;
                for (var row = 1; row < rows; row++) {
                    if (augmentedMatrix[row].length === columns) {
                        valid = true;
                    } else {
                        valid = false;
                        break;
                    }
                }
            } else {
                //a system of one equation can also be valid
                valid = true;
            }
        }

        if (valid) {
            var m = new Mat(augmentedMatrix);
            m.gauss();
            var solution = m.mat.map(function(x) { return x[x.length - 1]; });
            if (needIntegerSolution) {
                var gcd = pseudoGCD(solution);
                if (gcd >= (1/1000)) {
                    //because doesn't work really well with small numbers
                    solution = solution.map(function(x) { return x / gcd; });
                }
            }
            
            result = {
                reduced: m.mat,
                solution: solution,
                invertible: m.invertible,
                singular: m.singular
            };
        }
        
        return result;
    }

    return solve;
})();

function ChemicalEquation(equationText) {
    function Participant(substance, coefficient) {
        this.substance = substance;
        this.coefficient = coefficient;
        this.toString = function() {
            //returns "clear" representation w/o leading 1's and with () around
            //the substances starting with numbers
            var result = "";
            if (Math.abs(this.coefficient - 1) > 1e-8) {
                result += ftoa(this.coefficient);
                if (this.substance.startsWithNumber) {
                    result += "(" + this.substance.html + ")";
                } else {
                    result += this.substance.html;
                }
            } else {
                result += this.substance.html;
            }
            return result;
        }
    }

    this.reagents = [];//an array of participants
    this.products = [];//an array of participants
    this.valid = false;
    this.html = "";

    try {
        if (typeof(equationText) != "string" || equationText.length == 0) {
            throw "empty equation";
        }
        var textParts = equationText.match(chemRegExp("equation"));
        var equalSignIndex = textParts.indexOf("=");
        if (equalSignIndex < 0) {
            throw "No \"=\" sign found";
        }
        if (equalSignIndex == 0) {
            throw "Starts with \"=\" sign";
        }
        if (equalSignIndex == (textParts.length - 1)) {
            throw "Ends with \"=\" sign";
        }
        //equal sign is OK, continue
        textParts.splice(equalSignIndex, 1);
        var substances = [];
        for (var formula of textParts) {
            substances.push(new ChemicalSubstance(formula));
        }
        for (var subst of substances) {
            if (!subst.valid) {
                throw subst.html + " in \"" + subst.formula + "\"";
            }
        }
        //all the substances are OK, let's count our elements...
        var lhsElements = [];
        var rhsElements = [];
        for (var s = 0; s < substances.length; s++) {
            var arrPtr = (s < equalSignIndex) ? lhsElements : rhsElements;
            for (var element in substances[s].elementMoles) {
                if (arrPtr.indexOf(element) < 0) {
                    arrPtr.push(element);
                }
            }
        }
        //...and check if everything's all right with them
        if (lhsElements.length !== rhsElements.length) {
            throw "element mismatch";
        }
        for (var element of lhsElements) {
            if (rhsElements.indexOf(element) < 0) {
                throw "element mismatch";
            }
        }
        //all looks good up to this moment, let's build our matrix and solve
        var equationMatrix = [];
        for (var element of lhsElements) {
            var row = [];
            for (var s = 0; s < substances.length; s++) {
                var quantity = substances[s].elementMoles[element];
                if (typeof(quantity) != "undefined") {
                    quantity = (s < equalSignIndex) ? quantity : -quantity;
                    row.push(quantity);
                } else {
                    row.push(0);
                }
            }
            row.push(0); //do not forget an extra column...
            equationMatrix.push(row);
        }
        //...and an extra row
        var arbitraryRow = [];
        for (var s = 0; s < substances.length + 1; s++) {
            var num = (s === 0 || s === substances.length) ? 1 : 0;
            arbitraryRow.push(num);
        }
        equationMatrix.push(arbitraryRow);
        var solved = LinearSolver(equationMatrix, true);
        if (typeof(solved) == "undefined") {
            throw "cannot solve at all";
        }
        if (solved.singular) {
            throw "cannot solve, singular matrix";
        }
        //the solution seems to exist, filling the reagents and products
        //simultaneously, check for the special case where all the coefficients are zero
        var allCoeffsAreZero = true;
        for (var s = 0; s < substances.length; s++) {
            var coeff = solved.solution[s];
            allCoeffsAreZero &= (coeff === 0);
            var part = new Participant(substances[s], coeff);
            if (s < equalSignIndex) {
                this.reagents.push(part);
            } else {
                this.products.push(part);
            }
        }
        if (allCoeffsAreZero) {
            throw "cannot reach material balance: all coefficients are zero";
        }
        //checking the material balance
        for (var element of lhsElements) {
            var balance = 0; //and harmony
            for (var part of this.reagents) {
                var quantity = part.substance.elementMoles[element];
                if (typeof(quantity) != "undefined") {
                    balance += quantity * part.coefficient;
                }
            }
            for (var part of this.products) {
                var quantity = part.substance.elementMoles[element];
                if (typeof(quantity) != "undefined") {
                    balance -= quantity * part.coefficient;
                }
            }
            if (Math.abs(balance) > 1e-8) { //rounding error failsafe
                throw "cannot reach material balance";
            }
        }
        //constructing the html code for the equation with coefficients
        var textArrayOfReagents = [];
        var textArrayOfProducts = [];
        for (var part of this.reagents) {
            textArrayOfReagents.push(part.toString());
        }
        for (var part of this.products) {
            textArrayOfProducts.push(part.toString());
        }
        this.html += textArrayOfReagents.join(" + ") + " = " + textArrayOfProducts.join(" + ");

        //if no error has been thrown, the solution is valid
        this.valid = true;
    } catch (err) {
        this.html = "Invalid equation: " + err;
    }
}

function ftoa(num, precision) {
    //"beautiful" float-to-string conversion
    if (!precision) {
        precision = 6;
    }
    return num.toFixed(precision).replace(/\.?0+$/,"");
}

return {
    periodicTable: periodicTable,
    ChemicalSubstance: ChemicalSubstance,
    ChemicalEquation: ChemicalEquation,
    ftoa: ftoa
};

})();//module end