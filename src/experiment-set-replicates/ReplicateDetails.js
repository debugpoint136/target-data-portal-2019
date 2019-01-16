import React, {Component} from 'react';
import {Container, Button, Divider, Transition} from 'semantic-ui-react'
import InformationBanner from './InformationBanner';
import ExperimentTable from './ExperimentTable';
import ProcessedFiles from './processed/ProcessedFiles';
import ProcessedFilesScaffoldAll from './processed/ProcessedFilesScaffoldAll';

class ReplicateDetails extends Component {
    state = { visible: false }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })
    
    render() {
        const { visible } = this.state
        return (
            <Container>
                <div className="p-4 h-screen">
                    <div className="flex">
                        <div className="text-3xl text-uppercase font-extrabold font-sans p-4">Experiment Set : </div>
                        <div className="text-3xl text-uppercase font-thin font-sans p-4">{this.props.experiment_set_id}</div>
                    </div>
                    <div className="mb-4 p-4 w-auto"><InformationBanner result={this.props.result}/></div>
                    {/* <div className="m-4 bg-white w-auto"><DetailsContainer result={this.props.result}/></div> */}
                    <div className="m-4 bg-white w-auto"><ExperimentTable result={this.props.result} experiment_set_id={this.props.experiment_set_id}/></div>
                    {/* // Just rotate the below on result[0].experiments */}
                    <Button content={visible ? 'Hide Processed files' : 'Show Processed files'} onClick={this.toggleVisibility} />
                    <Divider hidden />
                    <Transition visible={visible} animation='scale' duration={500}>
                        <div className="mt-8">
                        <ProcessedFilesScaffoldAll>
                        {
                            this.props.result.map((experiment, index) => {
                                return <ProcessedFiles key={`experiment-${index}`} result={[experiment]} assay={this.props.result[0].Assay} bioRepIndex={index + 1}/>
                            })
                        }
                        </ProcessedFilesScaffoldAll>
                        </div>
                    </Transition>
                    <div className="footer"></div>
                </div>
            </Container>
        );
    }
}

export default ReplicateDetails;

