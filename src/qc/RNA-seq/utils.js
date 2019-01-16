export function parseObjAndSplitBy_ (obj) {
    const updatedKeys = Object.keys(obj).map(key => {
        const val = obj[key];
        const terms = key.split('_');
        const firstTerm = terms[0];
        const remainingTerms = terms.splice(1);
        const firstTermCaps = [ capitalizeFirstLetter(firstTerm) ];
        const reassemble = firstTermCaps.concat(remainingTerms);
        return reassemble.join(' ');
    });

    return updatedKeys;
}

export function parseStringAndSplitBy_ (str) {
    const terms = str.split('_');
    const firstTerm = terms[0];
    const remainingTerms = terms.splice(1);
    const firstTermCaps = [ capitalizeFirstLetter(firstTerm) ];
    const reassemble = firstTermCaps.concat(remainingTerms);
    return reassemble.join(' ');
}

function capitalizeFirstLetter (str) {
    return str.charAt(0).toUpperCase() + str.substr(1)
}

export function parseObjAndSplitBy_WithVal (obj) {
    const updatedKeysWithVal = Object.keys(obj).map(key => {
        const val = obj[key];
        const terms = key.split('_');
        const firstTerm = terms[0];
        const remainingTerms = terms.splice(1);
        const firstTermCaps = [ capitalizeFirstLetter(firstTerm) ];
        const reassemble = firstTermCaps.concat(remainingTerms);
        const formattedKey =  reassemble.join(' ');

        return { [formattedKey]: val }
    });
    const arrayToObj = convertArrayToObj(updatedKeysWithVal);
    
    return arrayToObj;
}

export function getPercentage(str) {
    return (str*100).toFixed(1) + "%"
}

function convertArrayToObj(arr) {
    const result = { 'Dataset': '' };
    arr.forEach(res => {
        result[Object.keys(res)[0]] = Object.values(res)[0]
    })
    return result;
}