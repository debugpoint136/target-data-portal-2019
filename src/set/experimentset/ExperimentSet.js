import React, {Component} from 'react';
import { Button, Image, Modal, Icon } from 'semantic-ui-react'
import ExperimentList from './ExperimentList';
import * as d3 from 'd3';
import _ from 'lodash';
import BrowserView from '../../file/BrowserView';
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
        this.state = {mice_groups: []}
    }
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
            <div className="m-4 p-8">                
                <div className="flex">
                    {/* <div className="w-1/4">
                            <div className="m-8">
                                <Modal
                                    trigger={<Button className="m-8" basic color='purple' icon='question' content='Replication Strategy'/>}
                                    style={inlineStyle.modal} size='large'>
                                    <Modal.Header>Replication Strategy</Modal.Header>
                                    <Modal.Content>
                                        <Image size='massive' src='/replication_strategy.png' />
                                    </Modal.Content>
                                </Modal>
                            </div> 
                        
                            <div className="m-8">
                                <Modal
                                    trigger={<Button className="m-8" basic color='pink' icon='external' content='View in Browser'/>}
                                    style={inlineStyle.modal} size='large'>
                                    <Modal.Header>Open visualization browser</Modal.Header>
                                    <Modal.Content>
                                        <Modal.Description>
                                            <BrowserView data={getAllFilesForThisSet(this.props.results)}/>
                                        </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                            </div> 
                            <div className="m-8">
                                <Button size='tiny' color='purple' onClick={() => fileDownload(generateMetadataContent(getAllFilesForThisSet(this.props.results)), `${Date.now()}-metadata.csv`)}>Download metadata
                                    <Icon name=''/><Icon name='download'/>
                                </Button>
                            </div>
                    </div> */}
                    <div className="w-4/5">
                        {/* <ExperimentList results={this.props.results} /> */}
                        <ExperimentList results={this.state.mice_groups} />
                    </div>
                </div>
            </div>
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

function generateMetadataContent(data) {
    const header = Object.keys(data[0]);
    let result = header + "\r\n";;

    data.forEach(rowArray => {
        let rowContent = cleanComma(Object.values(rowArray));
        let row = rowContent.join(",");
        result += row + "\r\n";
    });
    return result;
}

function cleanComma(row) {
    return row.map(r => {
        if (typeof(r) === 'string') {
            return r.replace(/,/g, "_")
        } else {
            return r;
        }
    });
}