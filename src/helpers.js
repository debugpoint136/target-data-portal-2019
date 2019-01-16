const string_length = 7;
const prefix = 'ES';
export const generateAccession = function() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    const accession = "TGT" + prefix + randomstring;
    return accession;
}

export function flatterArrayOfArrays(incoming) {
    const flattened = incoming.reduce(function (accumulator, currentValue) {
        return accumulator.concat(currentValue);
    }, []);

    return flattened;
}
