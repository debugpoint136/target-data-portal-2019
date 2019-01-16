import React, {Component} from 'react';
// import GraphCard from './GraphCard';
import './Graphs.css';
// import ToyGraph from './ToyGraph'; import SankeyGraph from './SankeyGraph';
import ReactToPrint from "react-to-print";
import {Label, Icon} from 'semantic-ui-react';
import ATACseqQCreport from './ATACseqQCreport';
import RNAseqQCreport from './RNAseqQCreport';

class GraphsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {type, data} = this.props;
        if (type === undefined || data === undefined) {
            return <h3>Looking for passed data ..</h3>
        }
        return (
            <div className="test">
                <div className="mr-8 p-2">
                    <ReactToPrint
                        trigger={() => <Label as='a'>
                        <Icon name='print'/>
                    </Label>}
                        content={() => this.componentRef}/>
                </div>
                <div ref={el => (this.componentRef = el)}>
                    {(type === 'ATAC-seq')
                        ? <ATACseqQCreport data={data}/>
                        : (type === 'RNA-seq')
                            ? <RNAseqQCreport data={data} fileUUID={this.props.fileUUID}/>
                            : null}
                </div>
            </div>

        );
    }
}

export default GraphsContainer;

/**
 * <ReactToPrint
                    trigger={() => <Label as='a'>
                                        <Icon name='print' />
                                    </Label>}
                    content={() => this.componentRef}/>
                <ComponentToPrint ref={el => (this.componentRef = el)}/>

                ======
class ComponentToPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="graph-container p-4 m-4">
                <div
                    style={{
                    height: '400px',
                    width: '600px'
                }}>
                    <ToyGraph/>
                </div>
                <div
                    style={{
                    height: '400px',
                    width: '600px'
                }}>
                    <SankeyGraph/>
                </div>
            </div>
        );
    }
}
 */
