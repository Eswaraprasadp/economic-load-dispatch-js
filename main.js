function getInitialLambda() {
    let denominator = 0;
    for (let i=0; i<D; ++i) {
        let a = coeffs[i][0], b = coeffs[i][1], c = coeffs[i][2];
        denominator += 1 / (2.0*c);
    }
    let numerator = powerDemand;
    for (let i=0; i<D; ++i) {
        let a = coeffs[i][0], b = coeffs[i][1], c = coeffs[i][2];
        numerator += b / (2.0*c);
    }
    return numerator/denominator;
}

function economicLoadDispatch(powerDemand, D, coeffs, limits) {
    let lambda = getInitialLambda(powerDemand, D, coeffs, limits);
    let eps = 0.01;
    let dP = Infinity;
    let optimalUnits = Array(D).fill(0);

    console.log(`Initial Lambda = ${lambda}`)
    let itrCount = 0;

    while(dP > eps) {
        // Lambda iteration
        dP = powerDemand;
        for (let i=0; i<D; ++i) {
            let a = coeffs[i][0], b = coeffs[i][1], c = coeffs[i][2];
            let Pg = (lambda - b) / (2.0*c);
            let minLimit = limits[i][0], maxLimit = limits[i][1];
            Pg = Math.max(Pg, minLimit);
            Pg = Math.min(Pg, maxLimit);
            dP -= Pg;
            optimalUnits[i] = Pg;
        }
        let denominator = 0;
        for (let i=0; i<D; ++i) {
            let a = coeffs[i][0], b = coeffs[i][1], c = coeffs[i][2];
            denominator += 1 / (2.0*c);
        }
        let dLambda = dP / denominator;
        lambda += dLambda;
        console.log(`Iteration ${itrCount}: ${optimalUnits}`);
        ++itrCount;
    }

    return optimalUnits;
}

function getInput() {
    return;
}

function validateInput(input) {
    return true;
}

function showOutput(output) {
    ;
}

function resetJSVariables() {
    powerDemand = 220;
    D = 2;
    coeffs = [[0, 40, 0.2/2], [0, 30, 0.25/2]];
    limits = [[0, Infinity], [0, Infinity]];
}

function submit() {
    input = getInput();
    if (validateInput(input)) {
        let powerDemand = input['powerDemand'];
        let D = input['D'];
        let coeffs = input['coeffs'];
        let limits = input['limits'];
        res = economicLoadDispatch(powerDemand, D, coeffs, limits);
    }
}