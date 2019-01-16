export function summarizeExperiment(result) {
    // make a flat table
    const { experiments } = result;
    let flatTable = [];
    experiments.forEach((exp, expIndex) => {
        let expConstituents = {
            mouse: 1,
            biosamples: 1,
            assays: 1
        };
        
        const assaysList = calcItemRows(exp.biosamples, 'assays');
        expConstituents.assays = assaysList;
        expConstituents.biosamples = assaysList;
        expConstituents.mouse = assaysList.reduce(getSum);

        flatTable.push(expConstituents);
    })
    console.log(flatTable);
    return flatTable;
}

export function calcItemRows(items, TYPE) {
    return items.reduce((acc, entry) => {
        const children = entry[TYPE];
        acc.push(children.length);
        return acc;
    }, [])
}

export function getSum(total, num) {
    return total + num;
}

