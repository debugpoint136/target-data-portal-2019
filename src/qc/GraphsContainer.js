import React, {Component} from 'react';
// import GraphCard from './GraphCard';
import './Graphs.css';
// import ToyGraph from './ToyGraph'; import SankeyGraph from './SankeyGraph';
import ReactToPrint from "react-to-print";
import {Label, Icon} from 'semantic-ui-react';
import ATACseqQCreport from './ATACseqQCreport';
import RNAseqQCreport from './RNAseqQCreport';
import RRBSseqQCreport from './RRBSseqQCreport';
import AccessionHeading from '../main/AccessionHeading';
import {styles} from '../main/styles';
import Card from '../main/Card';
import Header from '../main/Header';
// import ReactJson from 'react-json-view';


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
            <div>
                <Header/>
                <div className='three-columns flex'>
                <div className={styles.leftSideBar}>
                        <ul className={styles.leftSideList}>
                            <div className={styles.selectedItem}>
                                <div className='p-8 text-2xl font-sans font-bold'>
                                    {type}  
                                </div>
                                
                            </div>
                        </ul>
                        {/* <ul className={styles.leftSideList}> 
                            <div className={styles.leftSideListRow}>
                                <Modal
                                    trigger={<Button className="m-8" basic color='pink' icon='external' content='View in Browser'/>}
                                    style={inlineStyle.modal} size='large'>
                                    <Modal.Header>Open visualization browser</Modal.Header>
                                    <Modal.Content>
                                        <Modal.Description>
                                            //<BrowserView data={getAllFilesForThisSet(this.props.results)}/> 
                                            <BrowserView data={this.props.results}/>
                                        </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                            </div>
                            <div className={styles.leftSideListRow}>
                                <Button size='tiny' color='purple' onClick={() => fileDownload(generateMetadataContent(this.props.results), `${Date.now()}-metadata.csv`)}>Download metadata
                                    <Icon name=''/><Icon name='download'/>
                                </Button>
                            </div>
                        </ul>*/}
                    </div>
                    <div className="p-2 middle-column w-3/5 flex-1">
                    <div className="px-8 container mx-auto">
                        <AccessionHeading accession={this.props.id} status='QC Report' iconName='clipboard check'/>
                        {/* <div className="mb-4 p-4 w-auto"><InformationBanner result={this.state.data}/></div> */}
                        <div ref={el => (this.componentRef = el)}>
                            {(type === 'ATAC-seq')
                                ? <ATACseqQCreport data={data}/>
                                : (type === 'RNA-seq') ? <RNAseqQCreport data={data} fileUUID={this.props.fileUUID}/>
                                : (type === 'RRBS-seq') ? <RRBSseqQCreport data={data} fileUUID={this.props.fileUUID}/>: null}
                        </div>
                    </div>
                    </div>
                    <div className="right-sidebar w-right bg-white shadow">
                        <div className="flex items-center justify-between p-4 mb-2">
                            {/* <div className="font-semibold text-lg text-grey-darkest">Common attributes</div> */}
                        </div>
                        {/* <Card 
                        content='TEST'
                        id="Mouse Strain"
                        /> */}
                        
                        
                            <div className='flex items-center justify-around' style={{ height: '80px' }}>
                            <ReactToPrint
                                        trigger={() => <Label basic as='a'>
                                                            <Icon basic color='blue' name='print'/>
                                                        </Label>}
                                        content={() => this.componentRef}/> 
                                { (this.props.type === 'RRBS-seq') ? null :
                                <div className="flex px-4 mx-4" >
                                    <a className="mr-4" target="_blank" href={this.props.multiQC}>MultiQC Report</a>
                                    {"  "}
                                    <Icon name='external'/>                           
                                </div>}
                            </div> 
                            
                        

                        <div className={styles.selectedItem}>
                            <div className='m-4 p-4'>
                                <div className="flex-col justify-between w-full" style={{ width: '120px', height: '300px'}}>
                                <div className="font-sans text-grey text-center mt-4">Overall Score</div>
                                    <div className="m-4 p-8 border-b-2 text-5xl text-center font-sans font-extrabold">{this.props.qcStatus.score}</div>
                                
                                <div className="flex justify-between p-4 m-2 text-3xl text-grey-dark text-center font-sans font-extrabold">
                                    <div className="mr-4 mb-8">STATUS</div>
                                    <span role="img" aria-label="status">{this.props.qcStatus.status}</span>
                                </div>
                                { (type === 'RRBS-seq') ? <a className={styles.selectedIcon} href='https://github.com/Zhang-lab/WGBS_analysis' target="_blank">Pipeline documentation</a>
                                :
                                <a className={styles.selectedIcon} href={`https://github.com/Zhang-lab/${type}_QC_analysis/blob/master/README.md`} target="_blank">Pipeline documentation</a>
                                }
                            </div>
                        </div>
                        </div>
                        { /*
                        <div className="bg-green-lightest">
                        <h4>Raw QC report JSON</h4>
                            <ReactJson src={this.state.qcJson} />
                        </div>
                        */}
                        </div>
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
