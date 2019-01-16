import React, {Component} from 'react'
// import Pagination from '../../common/Pagination';
// import ExperimentCardlet from './ExperimentCardlet'
import ExperimentGroup from './ExperimentGroup';
// to be used only with Pagination
/*
class ExperimentCard extends React.Component {
    render() {
        const data = this.props.data;
        return (
            <div className='example'>
                {(data.length > 0) ? data.map((item, index) => {
                    return (
                        <ExperimentCardlet key={index} result={item}/>
                    );
                }): null}
            </div>
        );
    }
}
*/

class ExperimentList extends Component {
    state = {
        results: []
    }

    render() {
        return (
            <div>
                <div className="flex justify-center">
                    {/* <div
                        className="px-8 py-4 w-1/5 bg-grey-lighter flex justify-center">
                        <div className="flex-col">
                            
                        </div>
                        
                    </div> */}
                    <div
                        className="mb-4 px-8 py-4 w-4/5 bg-grey-lighter items-center justify-center">
                        { (this.props.results.length > 0) ?  
                        <div className="flex-wrap flex">
                            {/* <div className="h-16 mb-4 w-full p-4 bg-grey-darker text-white text-center">
                                <h3>Set View</h3>
                            </div> */}
                            {/* <Pagination data={this.props.results}> */}
                            {/* {this.props.results.map((result, index) => <ExperimentCardlet key={index} result={result}/>)} */}
                            {this.props.results.map((result, index) => <ExperimentGroup key={index} result={result}/>)}
                            {/* </Pagination> */}
                        </div> 
                        : null }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default ExperimentList;