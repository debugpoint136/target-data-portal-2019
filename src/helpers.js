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


const greyListed = ['_id','_index', 'br', 'bstr', 'astr', 'sr', 'biosampleRowSpan', 'assayRowSpan', 'mouseRowSpan'];
export function generateMetadataContent(data) {
    const headerRaw = Object.keys(data[0]);
    const headerGreyListedIndex = greyListed.map(item => headerRaw.findIndex(d => d === item));
    const header = headerRaw.filter(item => greyListed.indexOf(item) === -1);
    let result = header + "\r\n";

    data.forEach(rowArray => {
        greyListed.forEach(toDelete => delete rowArray[toDelete]);
        let rowContent = cleanComma(Object.values(rowArray));
        let row = rowContent.join(",");
        result += row + "\r\n";
    });
    return result;
}



function cleanComma(row) {
    return row.map(r => {
        if (typeof(r) === 'string') {
            return r.replace(/,/g, "_")
        } else {
            return r;
        }
    });
}