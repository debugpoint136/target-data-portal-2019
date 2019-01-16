import React, {Component} from 'react';
// import './App.css';
// import {Button, Icon, Label, Container, Modal} from 'semantic-ui-react'
import Matrix from '../components/matrix';
import ModalContainer from '../common/ModalContainer';
import FilesList from './FilesList';
import { Button, Popup, Modal, Header, Icon } from 'semantic-ui-react';
import BrowserView from './BrowserView';

// import axios from 'axios';

// import ExperimentSet from './components/experiment';
const CONFIG = require('./config.json')
const DATA_PHASE = CONFIG.DATA_PHASE
// const DATA_EXPERIMENTS = require(`${CONFIG[DATA_PHASE].EXPERIMENTS.DATA_FILE_LOCATION}`)
const DATA_FILES = require(`${CONFIG[DATA_PHASE].FILES.DATA_FILE_LOCATION}`)
// import Table from '../components/pivottable';

// const neo4jUrl = process.env.REACT_APP_NEO4J_API;
// const AUTHORIZATION = process.env.REACT_APP_NEO4J_PASSWORD;
// const inlineStyle = {
//     modal: {
//         marginTop: '0px !important',
//         marginLeft: 'auto',
//         marginRight: 'auto'
//     }
// };

class FileMain extends Component {

    state = {
        modalOpen: false,
        experiments: [],
        files: [],
        fileSelected: false,
        experimentSelected: false,
        bigTableOpen: false,
        modalDatahubAllOpen: false
    }

    handleModalClose = () => {
        this.setState({modalOpen: false})
    }

    toggleSelection = () => {
        this.setState({
            fileSelected: !this.state.fileSelected
        })
    }

    toggleBigTable = () => {
        this.setState({
            bigTableOpen: !this.state.bigTableOpen
        })
    }
    handleOpen = () => this.setState({ modalDatahubAllOpen: true })

    handleClose = () => this.setState({ modalDatahubAllOpen: false })


    handleBigTableModalClose = () => {
        this.setState({bigTableOpen: false})
    }

    handleDataSelection = (list) => {
        // console.log(list);
        // if (this.state.fileSelected) {
            this.setState({files: list, modalOpen: true})
        // } else {
        //     this.setState({experimentSelected: true, experiments: list, modalOpen: true})
        // }
    
       

        /**
    if (list.length > 0) {
      let _data = [...this.state.data]

      let afterUpdates = updateSelectFlag(_data, list)
      let datasetsAdded = afterUpdates[1]
      let datasetsRemoved = afterUpdates[2]
      this.setState({data: afterUpdates[0]})

      if (datasetsAdded > 0) {
        notify.show(`${datasetsAdded} datasets added 🛒`, "custom", 1000, addColor)
      }
      if (datasetsRemoved > 0) {
        notify.show(`${datasetsRemoved} datasets removed 🛒`, "custom", 1000, removeColor)
      }
    }*/
    }

    componentDidMount() {
        // console.log(DATA_FILES.length);
        this.setState({ files: DATA_FILES });
        // axios.post(neo4jUrl, {
        //     statements: [
        //         {
        //             statement: QUERY
        //         }
        //     ]
        // }, {
        //         headers: {
        //             Authorization: AUTHORIZATION
        //         }
        //     })
        //     .then(res => this.setState({ files: formatResults(res)}))
        //     .catch(err => console.log(err))
    
    }

    render() {
        if (this.state.files.length === 0) {
            return <p>Loading ...</p>
        }
        return (
            <div>
                <div className="flex">
                    <div className="w-1/6 bg-grey-lighter h-screen flex justify-center">
                        {/* Aside */}
                        <Modal
                        trigger={<Button className="h-12" color='green' onClick={this.handleOpen}>Generate datahub for all data</Button>}
                        open={this.state.modalDatahubAllOpen}
                        onClose={this.handleClose}
                        basic
                        size='large'
                        >
                            <Header icon='browser' content='All Data' />
                            <Modal.Content>
                                <div className="m-8">
                                    <BrowserView data={DATA_FILES}/>
                                </div>
                            </Modal.Content>
                            <Modal.Actions>
                            <Button color='green' onClick={this.handleClose} inverted>
                                <Icon name='checkmark' />
                            </Button>
                            </Modal.Actions>
                        </Modal>
                    </div>
                    <div className="w-5/6 ">
                        {/* <div className="mt-4 mb-8" onClick={this.toggleBigTable}>
                            <Button color='green' size='mini'>Release 1 Big Table</Button>
                        </div> */}
                        <div className="mt-4 mb-8 italic text-grey-dark">Uploaded Files: As of Dec 07, 2018 04:49pm</div>
                        {/* Main */}
                        <div className="border-red border-solid ml-24 p-8 overflow-scroll">
                        <div className="text-left">
                        <Popup
                            trigger={<Button circular basic icon='question' size='tiny'/>}
                            content={
                            <div>
                            <div className="mt-4 italic text-grey-darker text-xs">Drag and drop items between x and y pane, and from top pane, to change layout</div>
                            <div className="mt-4 italic text-grey-darker text-xs">For example, drag <strong>Tissue</strong> from top and drop it under Exposure on left pane</div>
                            <div className="mb-8 mt-8 italic text-grey-darker text-xs">Click on cell to see files</div>
                            </div>
                            }
                            basic
                            />
                        </div>
                        
                            <Matrix
                                data={this.state.files}
                                default={CONFIG[DATA_PHASE].FILES.DEFAULT}
                                hide={CONFIG[DATA_PHASE].FILES.HIDDEN_KEYS}
                                onDataSelect={this.handleDataSelection}/>

                        </div>

                        <ModalContainer open={this.state.modalOpen} onClose={this.handleModalClose}>
                            <FilesList results={this.state.files}/>
                        </ModalContainer>
                    </div>
                </div>
            </div>

        );
    }
}

export default FileMain;

// function formatResults(res) {
//     const entry = res.data.results;
//     let result = [];
//     if (entry.length > 0) {
//         const { columns, data } = entry[0];
        
//         if (data.length > 0) {
//             result = data.map(d => {
//                 let tmp = {};
//                 d.row.forEach((elem, i) => {
//                     tmp[columns[i]] = elem;
//                 });
//                 return tmp;
//             })
//         } 
//     }

// return result;
// }

// const QUERY = `

// MATCH (f1:file)-[:paired_file]->(f:file { pair: "forward"})-->(a:assay)-->(b:biosample)-->(m:mouse)-->(t:treatment) 
// MATCH (f)-[:tagged]->(tag:filetag)
// WHERE f.submission_id IN [
//     "007f371c-3116-4ee5-8e9e-8b032129024e",
//     "d82dc948-1a4c-4f3e-8329-344c6a474bf8",
//     "d4d54244-a224-4c82-a642-df4bf45f5e84",
//     "8bf70ca5-ae54-4441-986e-6aa12e9e2ffd",
//     "86c50778-90d5-44ff-b324-a8213ed87b21",
//     "e0bb714a-9c6f-4297-a9f7-064e053fec3f",
//     "9a73640d-b091-4b89-ad38-0f18d8769485",
//     "e48fac0e-12bb-41f0-91bd-cd17593a80d4",
//     "6399bf65-e07b-442d-b09a-81e335c120d8",
//     "0f054512-fa97-4ec0-bbc8-bda551196aa1",
//     "28f7dcae-f38f-4720-9da3-65ace25f8851",
//     "4fa9e6ec-c5e9-4860-b782-371e9ace9291",
//     "da82bab5-4b5d-4a29-bb69-8f3c35b713a1",
//     "ad0e23bf-0c4c-4935-9446-d99216727d17",
//     "89442fdb-5359-4a3d-9e68-edb6345e4585",
//     "94deddb3-27f6-46af-9a0a-9a0f4fdc3a21",
//     "7f61c50e-b651-4f76-9e46-d10e769e39b0",
//     "d2a6e786-4e33-4b9c-80e9-800f409d3f6b",
//     "c30cd939-8cdb-47a8-88ad-23a18271a18d",
//     "bf1e6670-9c60-470b-b53d-c6e969c69a42",
//     "f483ac7b-5f62-4c36-aa25-1bf902344aab",
//     "89bc1617-8080-49ad-a7f5-7cd86cd4f581",
//     "17204d84-f2e3-4b31-bcdf-84d98a216f7b",
//     "4c506276-028c-4f38-832f-aa5d49f7e34a",
//     "d19714ea-0b62-4ba8-ac8b-54b11d503b00",
//     "65346a2d-0323-4b3a-a3c2-2e08c448ca5b",
//     "67c24b79-1b15-4d5d-8b9b-1d0078b0d555",
//     "4b40a1e3-51e6-4832-96e2-d50666287851",
//     "2e7e0c19-40d8-4a80-905b-25cb24442544",
//     "b3bd19ff-8fee-4d6d-9056-d8d1f7e9c4b6",
//     "2197fd11-eb9f-4fb1-9bd9-6c7f7b669a7c",
//     "f512c046-8beb-4777-9eeb-9cb7aa1868af",
//     "fdc6fa60-e46f-43c0-a705-eb06fdb89484",
//     "b3de1af1-359d-4b52-ade7-36c0d49dc9c6",
//     "4df68b0e-7016-4bbd-9c02-147b6e290842",
//     "717539c5-b0ba-4c68-bc69-64242d25b4f3",
//     "36b3026c-e015-4578-956d-6dd6f158b4da",
//     "aae4c01f-0d06-4378-9941-d5329b082a6a",
//     "4cc06ee8-0234-4d75-a2fa-626fcffae7fb",
//     "b73da9e0-70b6-4778-aed3-5b2600b305e1",
//     "92da38f4-3166-41ac-b1f1-94053444b493",
//     "01a5e53f-f0f9-4e8f-8204-9f9d90189d75",
//     "55ff80f5-da39-4794-831b-ef40e089c112",
//     "1993d7a2-c795-49ae-ac5e-09bb04136d22",
//     "192f8755-eb21-4525-bc32-b2bc1dd4dac0",
//     "02d0d9a5-5f08-41e4-ad38-a3f6422b1d24",
//     "81a54e79-82dc-44f9-8cd7-3acf1042c616",
//     "805c8583-73e7-415e-882d-d075907d1cf9",
//     "581cfd4f-0d8e-4011-8204-f3f32274642d",
//     "fc066b44-9b0c-43aa-8114-f5c2c7066554",
//     "2f5663de-021a-4909-8321-94a154807d03",
//     "49ec1f20-ea62-4933-adbd-2dec997c6c2e",
//     "520f2e68-d522-4b0a-b01a-2dbf9bc5c1c9",
//     "d7ad5527-eb4c-49c0-a302-9959074d641a",
//     "06b7d517-ca5e-4df9-8247-379d408d7e81" 
//  ] 
//  RETURN a.accession as assay,
//  m.accession as Mouse,
//  m.life_stage_collection as Age,
//  m.sex as Sex,
//  b.tissue as Tissue,
//  a.technique as Assay,
//  t.exposure_specific as Exposure,
//  t.exposure_dose as Dose,
//  f.submission_id as Submission,
//  f.accession as file_accession,
//  f.file_uuid as uuid,
//  f.pair as Read,
//  f.lab as Lab,
//  f1.accession as paired_file_accession,
//  f1.file_uuid as paired_file_uuid,
//  tag.score as QCScore
// `;