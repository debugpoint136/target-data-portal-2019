import React, {Component} from 'react';
import {Button, Label, Form} from 'semantic-ui-react'
import axios from 'axios'
const POST_DATAHUB_URL = "https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/datahub"
const WEB_DIR = 'https://target.wustl.edu/files';

const uuid = require('uuid')
/**
 * const DatahubSchema = new Schema({
   _id: String,
   files: Array,
   hub: Object,
   compositegraphdata: Object,
   comments: String,
   registered: Date,
   username: String
});
 */
const DATAHUB_MONGO_API = "https://5dum6c4ytb.execute-api.us-east-1.amazonaws.com/dev/datahub"
const BROWSER_URL = "https://epigenomegateway.wustl.edu/browser/?genome=mm10&hub="
class NewBrowserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datahubID: null
        }
    }

    componentDidMount() {
        let generatedDatahub = createDatahub(this.props.data)
        const _id = uuid.v4()
        const toPost = {
            _id: _id,
            files: this.props.data || [],
            hub: { content: generatedDatahub },
            comments: 'TEST',
            compositegraphdata: {},
            registered: Date(),
            username: 'dpuru'
        }

        axios
            .post(POST_DATAHUB_URL, toPost)
            .then(res => {
                let resBody = JSON.parse(res.data.body)
                if (resBody.hasOwnProperty('id')) {
                    console.log(resBody.id)
                    this.setState({datahubID: resBody.id})
                }
            })
            .catch(err => console.log(err))
    }

    render() { 
        const link = `${BROWSER_URL}${DATAHUB_MONGO_API}/${this.state.datahubID}`
        return (
            <div className="test">
                {this.state.datahubID
                    ? 
                    <div className="">
                        <div className="text-center font-sans">Datahub</div>
                        <div className="flex justify-center m-8 p-4 bg-grey-darker text-white font-mono">{POST_DATAHUB_URL + '/' + this.state.datahubID}</div>
                        <div className='flex justify-center'>
                            <a href={link} target='_blank'>
                                    <Label>mm10</Label>
                                    <Button
                                        className="m-8"
                                        color='pink'
                                        icon='external'
                                        content='WashU Epigenome Browser'/>
                                </a>
                            </div>
                        </div>
                        
                    
                    : 
                    <div className="p-8 m-8 bg-orange-dark text-grey-lightest box-shadow">
                        {/* <FormMetadata/> */}
                        'Generating Datahub ..Please wait..'
                    </div>

                    
                }
                
            </div>
        );
    }
}

export default NewBrowserView;


function createDatahub(list) {
    return list.map((item, index) => {
        
        const {
            Assay,
            Dose,
            Exposure,
            Lab,
            Sex,
            Tissue,
            uuid
        } = item;
        let metadata = {};
        if (index < 5) {
            metadata.showOnHubLoad = true;
        } else {
            metadata.showOnHubLoad = false;
        }
        metadata.type = getDatahubType(item);
        metadata.url = getPipelineOutDir(item);
        metadata.name = `${Tissue}  ${Assay}  ${Sex}  ${Exposure}  `;
        metadata.metadata = {
            Assay,
            Dose,
            Exposure,
            Lab,
            Sex,
            Tissue
        }

        return  metadata;
    })
    
}
function getDatahubType(row) {
    const { Assay } = row;
    let datahubType = null;
    if (Assay === 'ATAC-seq') {
        datahubType = 'bigWig'
    } else if (Assay === 'RNA-seq') {
        datahubType = 'bedGraph'
    } else if (Assay === 'RRBS-Seq') {
        datahubType = 'bedGraph'
    } else {
        alert(Assay + " is not supported yet");
    }

    
    return datahubType;
}


const FormMetadata = () => (
    <Form>
        <h3>Select Metadata to include in datahub</h3>
        <Form.Group grouped>
            <label>Select</label>
            <Form.Field label='Tissue' control='input' type='checkbox'/>
            <Form.Field label='assay' control='input' type='checkbox'/>
        </Form.Group>
        <Button type='submit'>Submit</Button>
    </Form>
)

function getPipelineOutDir(obj) {
    const { Assay, submission, uuid } = obj;
    const assay = Assay.split(' ')[0]; // Just extract ATAC-seq or RNA-seq
    let outDir = `${WEB_DIR}/${assay}/${submission}/${uuid}`;

    if (assay === 'RRBS-Seq') {
        outDir = `${WEB_DIR}/RRBS-seq/${submission}/${uuid}`;
    }
    if (assay === 'ATAC-seq') {
        return `${outDir}/${uuid}.bigWig`;
    } else if (assay === 'RNA-seq') {
        return `${outDir}/${uuid}.sbg.gz`;
    } else if (assay === 'RRBS-Seq') {
        return `${outDir}/${uuid}.Q10.methylCall.gz`;
    } else {
        alert(assay + "is not supported yet");
    }
}


/**
 *  Age: "3 weeks"
    Assay: "RNA-seq"
    Dose: "NA"
    Exposure: "Filtered Air"
    Lab: "Biswal Lab"
    Sex: "Female"
    Tissue: "Blood"
    accession: "TGTFITCEHM6P"
    assay: "TGTASTNCE2XJ"
    assayRowSpan: 1
    assay_category: "Gene expression"
    assay_protocol_url: "http://targetepigenomics.org/wiki/images/b/be/Truseq-stranded-mrna-sample-prep-guide-15031047-e_ZhibinWang_Lab.pdf"
    assay_starting_nucleic_acid: 300
    assay_strand_specificity: "reverse"
    astr: "1"
    biosample: "TGTBSST428FW"
    biosampleRowSpan: 1
    biosample_collection_protocol_url: "http://targetepigenomics.org/wiki/images/4/46/SOP_-_Blood_Processing-v2-2017_02_02_%282%29.docx"
    biosample_specific_tissue: "Blood - whole"
    br: "4"
    bstr: "1"
    experiment: "TGTEXPAPW5B5D"
    experiment_set: "TGTES5H2TPAT"
    mouse: "TGTMSQ5GTL32"
    mouseRowSpan: 1
    mouse_age_precise: "3 weeks"
    mouse_animal_weight_sac: 8.9
    mouse_fasted: "Yes"
    mouse_fasted_hours: 4
    mouse_internal_id: "m16"
    mouse_life_stage_collection: "weanling (3 weeks)"
    mouse_liver_tumors: "FALSE"
    mouse_perfusion: "Yes"
    mouse_strain: "C57BL/6J"
    mouse_tumor_organs: "NA"
    paired_file_accession: "TGTFIS3T81QV"
    paired_file_uuid: "5bca51116e435d6c6ef98085"
    score: 3
    sr: "1"
    status: "PASS"
    submission: "49ec1f20-ea62-4933-adbd-2dec997c6c2e"
    treatment_exposure_age_first: "-5"
    treatment_exposure_age_last: "3"
    treatment_exposure_category: "Control"
    treatment_exposure_life_stage: "preconception to weaning (-5 weeks to 3 weeks)"
    treatment_exposure_paradigm: "Dams were exposed to treatments 2 weeks before breeding, through gestation and lactation. Offspring were exposed to treatment through the dam from conception to birth, then through nursing or food/water once pups begin to eat and drink on their own"
    treatment_exposure_specific: "Filtered Air"
    uuid: "5bca50d56e435d8b4cf98078"
    _id: "TGTEXPAPW5B5D"
 */