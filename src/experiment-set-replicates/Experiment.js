import React, { Component } from 'react';
import {Container, Label} from 'semantic-ui-react'
import InformationBanner from './InformationBanner';
import ExperimentTable from './ExperimentTable';
import ExperimentDetails from './ExperimentDetails';
import ProcessedFiles from './processed/ProcessedFiles';
import ProcessedFilesScaffold from './processed/ProcessedFilesScaffold';
import * as cn from 'classnames';
import BrowserView from '../file/BrowserView';
import Header from '../main/Header';
import Card from '../main/Card';
import {generateMetadataContent} from '../helpers';
import AccessionHeading from '../main/AccessionHeading';
import {styles} from '../main/styles';

class Experiment extends Component {
    state = { replicateObj: null, data: [] }

    componentDidMount() {
        const mouseId = this.props.match.params.accession;
        const identifier = this.props.match.params.id;
        const pullData = localStorage.getItem(identifier);

        if (pullData) {
            const dataParsed = JSON.parse(pullData);
            if (dataParsed.length > 0) {
                const rowsToDisplay = dataParsed.filter(d => d.mouse === mouseId);

                if (rowsToDisplay.length > 0) {
                    this.setState({ data: rowsToDisplay });
                }
            }
        }
    }
    
    render() { 
        if (this.state.data.length === 0) {
            return <h3>Not found</h3>
        }

        const {experiment, mouse_strain, status,
            treatment_exposure_age_last,
            treatment_exposure_category,
            treatment_exposure_life_stage,
            treatment_exposure_paradigm,
            treatment_exposure_specific,
            mouse_animal_weight_sac,
            mouse_fasted,
            mouse_fasted_hours,
            mouse_internal_id,
            mouse_life_stage_collection,
            mouse_liver_tumors,
            mouse_perfusion,
            assay_category,
            assay_protocol_url,
            biosample_collection_protocol_url
        } = this.state.data[0];

        const toList = {treatment_exposure_age_last,
            treatment_exposure_category,
            treatment_exposure_life_stage,
            treatment_exposure_paradigm,
            treatment_exposure_specific,
            mouse_animal_weight_sac,
            mouse_fasted,
            mouse_fasted_hours,
            mouse_internal_id,
            mouse_life_stage_collection,
            mouse_liver_tumors,
            mouse_perfusion,
            assay_category,
            assay_protocol_url};
        return ( 
            <div><Header/>
                <div className='three-columns flex'>
                <div className={styles.leftSideBar}>
                        <ul className={styles.leftSideList}>
                            <div className={styles.leftSideListRow}>
                                {/* QC status: {status} */}
                            </div>
                            {/* <div className={styles.leftSideListRow}>
                                <Button content={visible ? 'Hide Processed files' : 'Show Processed files'} onClick={this.toggleVisibility} />
                            </div> */}
                            
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
                        <AccessionHeading accession={experiment} status='Experiment' iconName='dna'/>
                        <div className="mb-4 p-4 w-auto"><InformationBanner result={this.state.data}/></div>
                        {/* <div className="m-4 bg-white w-auto"><DetailsContainer result={this.props.result}/></div> */}
                        {(this.state.data.length > 0) ? 
                            <div className="m-4 bg-white w-auto">
                                {/* <ExperimentDetails result={this.state.data}/> */}
                                <ExperimentTable result={this.state.data}/>
                            </div> 
                            : 'Loading..'}
                            <div className="text-xl text-uppercase font-extrabold font-sans p-4">Processed files :</div>
                            <ProcessedFilesScaffold>
                                {(this.state.data.length > 0) ? <ProcessedFiles result={this.state.data} assay={this.state.data[0].Assay}/> : 'Loading..'}
                            </ProcessedFilesScaffold>
                        {/* <div className="footer"></div> */}
                    </div>
                    </div>
                    <div className="right-sidebar w-right bg-white shadow">
                        <div className="flex items-center justify-between p-4 mb-2">
                            <div className="font-semibold text-lg text-grey-darkest">Notes</div>
                        </div>
                        {(this.state.data.length > 1 && (this.state.data[0].assayRowSpan > 1 && this.state.data[0].biosampleRowSpan > 1))?
                        <Card 
                        content='Sequencing Replicates'
                        date={`This experiment has ${this.state.data.length} sequencing replicates`}
                        />: null }
                        {(this.state.data.length > 1 && (this.state.data[0].assayRowSpan === 1 && this.state.data[0].biosampleRowSpan === 1))?
                        <Card 
                        content='Technical Replicates'
                        date={`This experiment has ${this.state.data.length} technical replicates`}
                        />: null }
                        <Card 
                        content='Treatment Paradigm'
                        date={`${this.state.data[0].treatment_exposure_paradigm}`}
                        />
                        <div className='border-t-2 pt-4'>
                            {Object.keys(toList).map(key => 
                                <Card 
                                content={key}
                                date={toList[key]}
                                />
                            )}
                            
                            {(biosample_collection_protocol_url) ?
                                <div className='pb-8'>
                                    <a className='p-8 mb-4 no-underline' href={biosample_collection_protocol_url}>Biosample collection Protocol </a> 
                                </div>: null}
                        </div>                        
                        </div>
                    </div>                    
                </div>
            
            
        );
    }
}

export default Experiment;

/**
 * 
Age: "5 months"
Assay: "ATAC-seq"
Dose: "NA"
Exposure: "Control Diet"
Lab: "Bartolomei Lab"
Sex: "Male"
Tissue: "Blood"
accession: "TGTFIJBHT8G5"
assay: "TGTASLIC1PKJ"
assayRowSpan: 1
assay_category: "Open chromatin"
assay_protocol_url: "UPenn ATAC-seq FAST"
assay_starting_nucleic_acid: null
assay_strand_specificity: "none"
astr: "1"
biosample: "TGTBSKHSPNZR"
biosampleRowSpan: 1
biosample_collection_protocol_url: "https://www.dropbox.com/sh/z1grodgdlx3hei4/AABqQYxY4gQy8zRdm5zDIOmaa/Exposure_and_Collection%20Protocols/Protocols/Tissue%20and%20Surrogate%20SOPs?dl=0&preview=SOP+-+Mouse+liver+collection+protocol+8.4.16.docx"
biosample_specific_tissue: null
br: "1"
bstr: "1"
experiment: "TGTEXPSL2MOPN"
experiment_set: "TGTES6B8PEIT"
mouse: "TGTMSTK9GZQC"
mouseRowSpan: 1
mouse_age_precise: "5 months"
mouse_animal_weight_sac: 33.1
mouse_fasted: "Yes"
mouse_fasted_hours: 6
mouse_internal_id: "TGT031"
mouse_life_stage_collection: "adult (15 to 30 weeks)"
mouse_liver_tumors: "FALSE"
mouse_perfusion: "Yes"
mouse_strain: "C57BL/6J"
mouse_tumor_organs: "NA"
paired_file_accession: "TGTFIWFS2A0G"
paired_file_uuid: "5c6363a1adb96776f0ad3963"
score: 3
sr: "1"
status: "FAIL"
submission: "0baf0fb4-2410-4d46-a1dd-e47fdfba091c"
treatment_exposure_age_first: "-3"
treatment_exposure_age_last: "3"
treatment_exposure_category: "Control"
treatment_exposure_life_stage: "preconception to weaning (-5 weeks to 3 weeks)"
treatment_exposure_paradigm: "Control"
treatment_exposure_specific: "Control Diet"
uuid: "5c636366adb967062bad395d"
_id: "TGTEXPSL2MOPN"
_index: "experimentset"
 */