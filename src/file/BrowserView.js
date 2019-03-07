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
const BROWSER_URL = "https://epigenomegateway.wustl.edu/browser/?genome=mm10&datahub="
class BrowserView extends Component {
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
            hub: generatedDatahub,
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
                    <div className="sdfsd">
                        <div className="text-center font-sans">Datahub</div>
                        <div className="m-4 p-4 bg-grey-darker font-mono">{POST_DATAHUB_URL + '/' + this.state.datahubID}</div>
                    <a href={link} target='_blank'>
                            <Label>mm10</Label>
                            <Button
                                className="m-8"
                                size='mini'
                                color='pink'
                                icon='external'
                                content='WashU Epigenome Browser'/>
                        </a>
                    </div>
                    
                    : 
                    <div className="test">
                        {/* <FormMetadata/> */}
                        'Generating Datahub ..'
                    </div>
}
            </div>
        );
    }
}

export default BrowserView;

function createDatahub(list) {

    let metadataList = {
        "Tissue": [],
        "Assay": [],
        "Exposure": [],
        "Dose": [],
        "Age": [],
        "Sex": []
    }

    const datahubBody = Object
        .keys(list)
        .map((file, index) => {
            metadataList.Tissue.push(list[file].Tissue)
            metadataList.Assay.push(list[file].Assay)
            metadataList.Exposure.push(list[file].Exposure)
            metadataList.Dose.push(list[file].Dose)
            metadataList.Age.push(list[file].Age)
            metadataList.Sex.push(list[file].Sex)
            if (index < 5) {
                return getDatahubBodyUnit(list[file], "show")  
            } else {
                return getDatahubBodyUnit(list[file], "hide")
            }
        });

    const assays = JSON.stringify(getUniqueElemInArray(metadataList.Assay))
    const tissues = JSON.stringify(getUniqueElemInArray(metadataList.Tissue))
    const exposures = JSON.stringify(getUniqueElemInArray(metadataList.Exposure))
    const doses = JSON.stringify(getUniqueElemInArray(metadataList.Dose))
    const ages = JSON.stringify(getUniqueElemInArray(metadataList.Age))
    const sexes = JSON.stringify(getUniqueElemInArray(metadataList.Sex))

    const datahubBottom = `
        {
            "list": [
            {
                "name": "refGene",
                "mode": "full"
            }
            ],
            "type": "native_track"
        }, {
            "type": "metadata",
            "vocabulary": {
            "Tissue": ${tissues},
            "Assay": ${assays},
            "Exposure": ${exposures},
            "Dose": ${doses},
            "Age": ${ages},
            "Sex": ${sexes},
            },
            "show": [
            "Tissue",
            "Assay",
            "Exposure",
            "Dose",
            "Age",
            "Sex"
            ]
        }
        `

    let units = datahubBody.join(',')
    const datahubBodyComplete = `[${units}, ${datahubBottom}]`
    return {content: datahubBodyComplete};
}

function getDatahubBodyUnit(file,mode) {
    const {uuid, file_accession, Assay, Tissue, Age, Exposure, Dose, Sex } = file;
    let url = getPipelineOutDir(file);
    let assayType = Assay.split(' ')[0]; 
    let datahubType = null;
    if (assayType === 'ATAC-seq') {
        datahubType = 'bigWig'
    } else if (assayType === 'RNA-seq') {
        datahubType = 'bedGraph'
    } else if (assayType === 'RRBS-Seq') {
        datahubType = 'bedGraph'
    } else {
        alert(assayType + " is not supported yet");
    }

    const datahubBodyUnit = `
    {
        "colorpositive": "#996c04",
        "url": "${url}",
        "height": 30,
        "mode": "${mode}",
        "metadata": [
        "${Tissue}",
        "${Assay}",
        "${Exposure}",
        "${Dose}",
        "${Age}",
        "${Sex}"
        ],
        "type": "${datahubType}",
        "name": "${uuid}"
    }`

    return datahubBodyUnit;
}

function getUniqueElemInArray(list) {
    return list.filter((value, index) => {
        return list.indexOf(value) === index;
    });
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