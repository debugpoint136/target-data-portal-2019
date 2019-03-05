import React, {Component} from 'react';
import { Button, Image, Modal, Icon } from 'semantic-ui-react'
import ExperimentList from './ExperimentList';
import * as d3 from 'd3';
import _ from 'lodash';
import BrowserView from '../../file/BrowserView';
import Header from '../../main/Header';
import Card from '../../main/Card';
import * as cn from 'classnames';
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
                        </ul>
                    </div>
                    <div className="p-2 middle-column w-3/5 flex-1 border-b-2">
                        <ExperimentList results={this.state.mice_groups} />
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

const greyListed = ['_id','_index', 'br', 'bstr', 'astr', 'sr', 'biosampleRowSpan', 'assayRowSpan', 'mouseRowSpan'];
function generateMetadataContent(data) {
    const headerRaw = Object.keys(data[0]);
    const headerGreyListedIndex = greyListed.map(item => headerRaw.findIndex(d => d === item));
    const header = headerRaw.filter(item => greyListed.indexOf(item) === -1);
    let result = header + "\r\n";

    data.forEach(rowArray => {
        greyListed.forEach(toDelete => delete rowArray[toDelete]);
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