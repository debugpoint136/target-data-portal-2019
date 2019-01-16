import React, {Component} from 'react';
import ExperimentRow from './ExperimentRow';

class DetailsContainer extends Component {
    state = {}
    render() {
        const {result} = this.props;
        if (result.length === 0) {
            return <h3>Not Found</h3>
        }
        const bioReplicates = result[0].experiments; // just one mouse
        return (
            <div className="">
                <div
                    style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gridTemplateRows: '50px'
                }}>

                    <DetailsHeader>Mouse</DetailsHeader>
                    <DetailsHeader>Biosample</DetailsHeader>
                    <DetailsHeader>Assay</DetailsHeader>
                    <DetailsHeader>File</DetailsHeader>
                    <DetailsHeader>Quality</DetailsHeader>
                </div>
                {bioReplicates.map((bioRep, mouseCount) => {
                    const {mouse, biosamples} = bioRep;
                    return <div
                        style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr) 50px',
                        gridTemplateRows: 'auto'
                    }}
                        key={mouse}
                        className="mouse">
                        <div className="border-b-2 border-dotted border-grey-dark bg-white">
                            <DetailsBody>
                                <div className="sdfs">
                                    <div className="font-sm text-uppercase font-thin text-teal-darkest">Bio Replicate {mouseCount + 1}</div>
                                    {mouse}
                                </div>
                            </DetailsBody>
                        </div>
                        <div className="single-experiment-wrapper border-l-2">
                            {biosamples.map((techrep, i) => <ExperimentRow key={i} data={biosamples[i]} count={i + 1}/>)}
                        </div>
                    </div>
                })}
            </div>
        );
    }
}

export default DetailsContainer;

const DetailsHeader = ({children}) => {
    return (
        <div
            style={{
            display: 'grid'
        }}
            className="text-center font-semibold font-sans border-b-2 bg-teal-darker text-grey-lightest">
            <div style={{
                alignSelf: 'center'
            }}>
                {children}
            </div>
        </div>
    );
}

const DetailsBody = ({children}) => {
    return (
        <div
            style={{
            display: 'grid',
            minHeight: 0,
            height: '100%'
        }}
            className="text-center text-grey-dark font-semibold text-xs font-sans">
            <div style={{
                alignSelf: 'center'
            }}>
                {children}
            </div>
        </div>
    );
}
