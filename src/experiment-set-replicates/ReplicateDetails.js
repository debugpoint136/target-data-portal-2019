import React, {Component} from 'react';
import {Button, Image, Modal, Icon, Divider, Transition} from 'semantic-ui-react';
import InformationBanner from './InformationBanner';
import ExperimentTable from './ExperimentTable';
import ProcessedFiles from './processed/ProcessedFiles';
import ProcessedFilesScaffoldAll from './processed/ProcessedFilesScaffoldAll';
import * as cn from 'classnames';
import BrowserView from '../file/BrowserView';
import Header from '../main/Header';
import Card from '../main/Card';
import {generateMetadataContent} from '../helpers';
import AccessionHeading from '../main/AccessionHeading';

const fileDownload = require('js-file-download')

const inlineStyle = {
    modal: {
        marginTop: '10px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};
class ReplicateDetails extends Component {
    state = { visible: false }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })
    
    render() {
        const { visible } = this.state
        return (
            <div><Header/>
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
                            <div className={styles.leftSideListRow}>
                                <Button content={visible ? 'Hide Processed files' : 'Show Processed files'} onClick={this.toggleVisibility} />
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
                        <AccessionHeading accession={this.props.experiment_set_id} status='Experiment Set' iconName='database'/>
                        <div className="mb-4 p-4 w-auto"><InformationBanner result={this.props.result}/></div>
                        {/* <div className="m-4 bg-white w-auto"><DetailsContainer result={this.props.result}/></div> */}
                        <Transition visible={!visible} animation='scale' duration={500}>
                            <div className="m-4 bg-white w-auto"><ExperimentTable result={this.props.result} experiment_set_id={this.props.experiment_set_id}/></div>
                        </Transition>
                        {/* // Just rotate the below on result[0].experiments */}
                            <Transition visible={visible} animation='scale' duration={500}>
                                <div className='m-4 bg-white w-auto'>
                                <ProcessedFilesScaffoldAll>
                                {
                                    this.props.result.map((experiment, index) => {
                                        return <ProcessedFiles key={`experiment-${index}`} result={[experiment]} assay={this.props.result[0].Assay} bioRepIndex={index + 1}/>
                                    })
                                }
                                </ProcessedFilesScaffoldAll>
                                </div>
                            </Transition>
                        {/* <div className="footer"></div> */}
                    </div>
                    </div>
                    <div className="right-sidebar w-right bg-white shadow">
                        <div className="flex items-center justify-between p-4 mb-2">
                            <div className="font-semibold text-lg text-grey-darkest">Common attributes</div>
                        </div>
                        <Card 
                        content={this.props.result[0].mouse_strain}
                        id="Mouse Strain"
                        />
                        </div>
                    </div>                    
                </div>
        );
    }
}

export default ReplicateDetails;


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