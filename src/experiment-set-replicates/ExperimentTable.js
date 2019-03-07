import React, {Component} from 'react';
import Mouse from './Mouse';
import {Icon, Table} from 'semantic-ui-react';
import { calcItemRows, getSum } from './utils';
import { Biosample, File, QCstatus, Assay } from './Common';
import _ from 'lodash';
// import uuid from 'uuid';
// const RESULT = require('./intact.example.json');
// console.log(RESULT);

class ExperimentTable extends Component {
    state = {}

    componentDidMount = () => {
        const resultID = this.props.experiment_set_id;
        this.setState({ resultId: resultID });
        localStorage.setItem(resultID, JSON.stringify(this.props.result));
    }
    

    // renderCols = (bioRep) => {
    //     const { mouse, biosamples } = bioRep;
    //     const assaysList = calcItemRows(biosamples, 'assays');
    //     const mouseRowSpan = assaysList.reduce(getSum);
    //     const allRows = [];
    //     biosamples.forEach((sam, samIndex) => {
    //         const { biosample, assays } = sam;
    //         assays.forEach((as, asIndex) => {
    //             const { assay, files } = as;
    //             if (samIndex === 0 && asIndex === 0) {
    //                 allRows.push(
    //                     <Table.Row key={`${mouse}:${biosample}:${assay}`}>
    //                         <Table.Cell rowSpan={mouseRowSpan} >
    //                             <Mouse id={this.state.resultId} mouse={mouse}/>
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <Biosample biosample={biosample}/>
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <Assay assay={assay}/>
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <File data={files[0]} />
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <QCstatus data={files[0]}/>
    //                         </Table.Cell>
    //                     </Table.Row>
    //                 )
    //             } else if (!biosampleRowNum && biosampleRowNum === samIndex) { // dont add this biosample for the 2nd time
    //                 allRows.push(
    //                     <Table.Row key={`${mouse}:${biosample}:${assay}`}>
    //                         <Table.Cell>
    //                             <Assay assay={assay}/>
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <File data={files[0]} />
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <QCstatus data={files[0]}/>
    //                         </Table.Cell>
    //                     </Table.Row>
    //                 )
    //             } else {
    //                 allRows.push(
    //                     <Table.Row key={`${mouse}:${biosample}:${assay}`}>
    //                         <Table.Cell>
    //                             <Biosample biosample={biosample}/>
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <Assay assay={assay}/>
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <File data={files[0]} />
    //                         </Table.Cell> 
    //                         <Table.Cell>
    //                             <QCstatus data={files[0]}/>
    //                         </Table.Cell>
    //                     </Table.Row>
    //                 )
    //             }
    //             const biosampleRowNum = samIndex; // this is to see if this biosample has already been added
    //         });
    //     });

    //     return allRows;
    // }

    renderFlatExps = (exp) => {
        const { mouseRowSpan, biosampleRowSpan, assayRowSpan,
            mouse, biosample, assay, uuid, accession, paired_file_accession, status, sr } = exp;

        const allRows = [];
            if (Number.parseInt(sr, 10) === 1) {
            allRows.push(
                
                <Table.Row key={`${mouse}:${biosample}:${assay}`}>
                    { (exp.hasOwnProperty('mouseRowSpan')) ?
                    <Table.Cell rowSpan={mouseRowSpan} >
                        <Mouse id={this.state.resultId} mouse={mouse}/>
                    </Table.Cell> : null }
                    { (exp.hasOwnProperty('biosampleRowSpan')) ?
                    <Table.Cell rowSpan={biosampleRowSpan}>
                        <Biosample biosample={biosample}/>
                    </Table.Cell> : null }
                    { (exp.hasOwnProperty('assayRowSpan')) ?
                    <Table.Cell rowSpan={assayRowSpan}>
                        <Assay assay={assay}/>
                    </Table.Cell> : null }
                    
                    <Table.Cell>
                        <File data={{uuid, accession, paired_file_accession}} />
                    </Table.Cell> 
                    <Table.Cell>
                        <QCstatus data={{uuid, status}}/>
                    </Table.Cell> 
                </Table.Row>
            )}

            if (Number.parseInt(sr, 10) > 1) {
                allRows.push(
                    <Table.Row key={`${mouse}:${biosample}:${assay}-${sr}`}>
                        <Table.Cell>
                            <File data={{uuid, accession, paired_file_accession}} />
                        </Table.Cell> 
                        <Table.Cell>
                            <QCstatus data={{uuid, status}}/>
                        </Table.Cell>
                    </Table.Row>
                )
            }

        return allRows;
    }

    render() {
        const {result} = this.props; // uncomment after test
        const experimentRows = getSorted(result);
        const resultsFixed = fixMouseSpans(experimentRows);
        console.log(resultsFixed);

        if (result.length === 0) { // uncomment after test
            return <h3>Not Found</h3> // uncomment after test
        }
        // const bioReplicates = result[0].experiments; // just one mouse // uncomment after test
        // const bioReplicates = RESULT.experiments; // TEST DATA
        return (
            <div className='border border-grey-light border-solid border-t-4 border-t-yellow rounded'>
            <Table structured>
                <Table.Header>
                    <Table.Row className="text-center text-blue font-semibold text-sm font-sans">
                        <Table.HeaderCell rowSpan='2'>Mouse</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2' textAlign='center'>Biosample</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2' textAlign='center'>Assay</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center' colSpan='2'>File</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row className="text-center text-blue font-semibold text-xs font-sans">
                        <Table.HeaderCell textAlign='center'>UUID</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Quality</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                {resultsFixed.map((exp, mouseIndex) => {
                        return this.renderFlatExps(exp)
                    })}
                </Table.Body>
            </Table>
        </div>
        );
    }
}


export default ExperimentTable

function getSorted(arr) {
    const cleanedUpArr = convertElemToNumbers(arr);
    return _.sortBy(cleanedUpArr, ['br','bstr','astr','sr'])
}

function convertElemToNumbers(arr) {
    return arr.map(elem => {
        const arrClone = {...elem};
        const { br, bstr, astr, sr } = elem;
        arrClone.br = Number.parseInt(br, 10);
        arrClone.bstr = Number.parseInt(bstr, 10);
        arrClone.astr = Number.parseInt(astr, 10);
        arrClone.sr = Number.parseInt(sr, 10);
    
        return arrClone;
    })
    
}

function fixMouseSpans(rows) {
    const rowsClone = [...rows];
    var i = 0;
    do {
        if (rows[i].mouseRowSpan > 1) {
            if (rows[i + 1]) {
                if (rows[i + 1].hasOwnProperty('mouseRowSpan')) {
                    for (let index = 1; index <= rows[i].mouseRowSpan; index++) {
                        if (rows[i + index]) {
                            if (rows[i + index].hasOwnProperty('mouseRowSpan')) {
                                if (rows[i + index].mouseRowSpan > 1) {
                                    delete rowsClone[i + index].mouseRowSpan;
                                }
                            }
                        }
                        i++;
                    }
                } else {
                    i++;
                }
            } else {
            i++;
        }
        } else {
            i++;
        }
    }
    while (i < rows.length);
    
    return rowsClone;
}