import React, {Component} from 'react';
import { Button, Image, Modal, Icon } from 'semantic-ui-react'
import ExperimentList from './ExperimentList';
import FilesList from '../../file/FilesList';
import * as d3 from 'd3';
import _ from 'lodash';
import NewBrowserView from '../../file/NewBrowserView';
import Header from '../../main/Header';
import Card from '../../main/Card';
import * as cn from 'classnames';
import {generateMetadataContent} from '../../helpers';
import AccessionHeading from '../../main/AccessionHeading';
const fileDownload = require('js-file-download')

const inlineStyle = {
    modal: {
        marginTop: '10px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

class ExperimentSet extends Component {
    constructor(props) {
        super(props);
        this.state = {mice_groups: [], viewGrid: false}
    }

    setMode = () => this.setState({ viewGrid: !this.state.viewGrid })

    componentDidMount() {
        var nested_data = d3.nest()
            .key(function(d) { return d.experiment_set; })
            .key(function(d) { return d.mouse; })
            .entries(this.props.results);
        
        const mice_groups = nested_data.map(mice_grp => {

            const { Age, Assay, Tissue, Exposure, Lab, Dose, Sex } = mice_grp.values[0].values[0];
            return { 
                _id: mice_grp.key,
                Count: mice_grp.values.length,
                Age, Assay, Tissue, Exposure, Lab, Dose, Sex
            }
        });

        this.setState({ mice_groups});
    }
    render() {
        if (this.props.results.length === 0) {
            return <p>Looking up ...</p>
        }
        return (

            <div>
                <Header/>
                <div className='three-columns flex'>
                    <div className={styles.leftSideBar}>
                        <ul className={styles.leftSideList}>
                            <div className={styles.leftSideListRow}>
                                <Modal
                                    trigger={<Button className="m-8" basic color='purple' icon='question' content='Replication Strategy'/>}
                                    style={inlineStyle.modal} size='large'>
                                    <Modal.Header>Replication Strategy</Modal.Header>
                                    <Modal.Content>
                                        <Image size='massive' src='/replication_strategy.png' />
                                    </Modal.Content>
                                </Modal>
                            </div>
                        </ul>
                        <ul className={styles.leftSideList}>
                            <div className={styles.leftSideListRow}>
                                <Modal
                                    trigger={<Button className="m-8" basic color='pink' icon='external' content='View in Browser'/>}
                                    style={inlineStyle.modal} size='large'>
                                    <Modal.Header>Open visualization browser</Modal.Header>
                                    <Modal.Content>
                                        <Modal.Description>
                                            {/* <BrowserView data={getAllFilesForThisSet(this.props.results)}/> */}
                                            <div className='flex justify-center text-lg m-8'>
                                                
                                            
                                            {/* <div className='container mx-auto bg-grey-lightest'>
                                            <h5>ATAC-seq</h5>
                                                <p>outDir/uuid.bigWig</p>
                                            <h5>RNA-seq</h5>
                                                <p>outDir/uuid.sbg.gz</p>
                                            <h5>RRBS-seq</h5>
                                                <p>outDir/uuid.Q10.methylCall.gz</p>
                                            </div> */}

                                            {/* <div className='mx-auto container'>
                                                Please note: Metadata heatmap can be used to visually classify the tracks. It does not open automatically at the moment.
                                                You can add metadata heatmap manually like below - 
                                                <img src="/metadata.png" alt="" height='400px' width='auto'/>
                                            </div> */}
                                                <a target='_blank' href="https://www.youtube.com/watch?v=MPREBr0klQ4">How to add tracks on WashU Browser?</a>
                                            </div>
                                            {/* <BrowserView data={this.props.results}/> */}
                                            <NewBrowserView data={this.props.results}/>
                                        </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                            </div>
                            <div className={styles.leftSideListRow}>
                                <Button size='tiny' color='purple' onClick={() => fileDownload(generateMetadataContent(this.props.results), `${Date.now()}-metadata.csv`)}>Download metadata
                                    <Icon name=''/><Icon name='download'/>
                                </Button>
                            </div>
                        </ul>
                    </div>
                    <div className="p-2 middle-column w-3/5 flex-1 border-b-2">
                            <div className='text-center mt-4'>
                                {(this.state.viewGrid) ? 
                                    <Button.Group icon basic>
                                        <Button onClick={this.setMode}>
                                            <Icon name='list'/>
                                        </Button>
                                        <Button active={this.state.viewGrid}>
                                            <Icon name='th'/>
                                        </Button>
                                    </Button.Group>
                                    :
                                    <Button.Group icon basic>
                                        <Button active={!this.state.viewGrid}>
                                            <Icon name='list'/>
                                        </Button>
                                        <Button onClick={this.setMode}>
                                            <Icon name='th'/>
                                        </Button>
                                    </Button.Group>
                                }
                            </div> 
                        <div className="px-8 container-resolute mx-auto">
                            {/* <AccessionHeading accession='something' status='Experiment Set' iconName='database'/> */}
                            {this.state.viewGrid ? <ExperimentList results={this.state.mice_groups} /> : <FilesList results={this.props.results}/>}
                        </div>
                    </div>
                    <div className="right-sidebar w-right bg-white shadow">
                        <div className="flex items-center justify-between p-4 mb-2">
                            <div className="font-semibold text-lg text-grey-darkest">Common attributes</div>
                        </div>
                        <Card 
                        content={this.props.results[0].mouse_strain}
                        id="Mouse Strain"
                        />
                        </div>
                    </div>
                </div>
                // <div className="flex">
                //     <div className="w-1/4">
                //             <div className="m-8">
                //                 <Modal
                //                     trigger={<Button className="m-8" basic color='purple' icon='question' content='Replication Strategy'/>}
                //                     style={inlineStyle.modal} size='large'>
                //                     <Modal.Header>Replication Strategy</Modal.Header>
                //                     <Modal.Content>
                //                         <Image size='massive' src='/replication_strategy.png' />
                //                     </Modal.Content>
                //                 </Modal>
                //             </div> 
                        
                //             <div className="m-8">
                //                 <Modal
                //                     trigger={<Button className="m-8" basic color='pink' icon='external' content='View in Browser'/>}
                //                     style={inlineStyle.modal} size='large'>
                //                     <Modal.Header>Open visualization browser</Modal.Header>
                //                     <Modal.Content>
                //                         <Modal.Description>
                //                             {/* <BrowserView data={getAllFilesForThisSet(this.props.results)}/> */}
                //                             <BrowserView data={this.props.results}/>
                //                         </Modal.Description>
                //                     </Modal.Content>
                //                 </Modal>
                //             </div> 
                //             <div className="m-8">
                //                 <Button size='tiny' color='purple' onClick={() => fileDownload(generateMetadataContent(this.props.results), `${Date.now()}-metadata.csv`)}>Download metadata
                //                     <Icon name=''/><Icon name='download'/>
                //                 </Button>
                //             </div>
                //     </div> 
                //     <div className="w-4/5">
                //         {/* <ExperimentList results={this.props.results} /> */}
                //         <ExperimentList results={this.state.mice_groups} />
                //     </div>
                // </div>
        );
    }
}

export default ExperimentSet;



function getAllFilesForThisSet (set) {
    const aoa = set.map(repl => {
        const { experiments, age_of_mice, assay_technique, exposure, mouse_gender, tissue, dose } = repl;
        return experiments.map(m => {
            const { biosamples, mouse } = m;
            return biosamples.map(b => {
                const { assays, biosample } = b;
                return assays.map(a => {
                    const { files } = a;
                    return files.filter(file => {
                        file.Assay = assay_technique;
                        file.Tissue = tissue;
                        file.Age = age_of_mice;
                        file.Sex = mouse_gender;
                        file.Exposure = exposure;
                        file.Dose = dose;
                        file.file_accession = file.accession;
                        file.Submission = file.submission;
                        return file;
                    })
                })
            })
        });
    })

    const flattenedList = _.flattenDeep(aoa);
    return flattenedList;
}



const styles = {
    page: cn(`bg-grey-lighter font-sans antialiased text-grey-darkest`),
    topBar: cn(`flex items-center py-4 bg-blue-resolute`),
    logo: cn(`pl-4 w-left`),
    topBarMiddle: cn(`w-full pr-4 flex-1 relative`),
    searchBar: cn(`w-full py-4 px-4 pl-10 text-sm bg-grey-lighter border border-solid border-blue-resolute-dark outline-0`),
    searchIcon: cn(`absolute pin-t flex items-center py-4 px-3 text-grey-darker`),
    container: cn(`bg-white container my-8 mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden font-sans`),
    leftSideBar: cn(`left-sidebar w-left border-r-2 border-solid border-grey-light min-h-screen pt-4`),
    leftSideList: cn(`list-reset text-sm border-b-2 border-solid border-grey-light my-8`),
    leftSideListRow: cn(`py-2 pl-4 my-8`),
    leftSideListIcon: cn(`pr-2 text-blue-resolute-icon`),
    leftSideListLink: cn(`text-grey-darker hover:text-black`),
    selectedItem: cn(`flex items-center py-1 pl-2 bg-white border-l-8 border-blue-resolute`),
    selectedItemIcon: cn(`pr-2 text-blue-resolute fix-negative-margin`),
    button: cn(`bg-white uppercase text-grey-darkest text-xs font-bold tracking-wide rounded border border-solid border-grey-light px-3 py-2 hover:text-white hover:bg-grey-darkest`)
}