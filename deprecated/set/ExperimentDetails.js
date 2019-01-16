import React, {Component} from 'react'
// import Header from '../common/Header' import Layout from '../common/Layout';
import {Accordion, Icon, Segment} from 'semantic-ui-react'
// import CONFIG from '../../config.json'
class ExperimentList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <ExperimentAccordion experiments={this.props.experiments}/>
            </div>
        )
    }
}

export default ExperimentList;

class ExperimentAccordion extends Component {
    state = {
        activeIndex: 0
    }

    handleClick = (e, titleProps) => {
        const {index} = titleProps
        const {activeIndex} = this.state
        const newIndex = activeIndex === index
            ? -1
            : index

        this.setState({activeIndex: newIndex})
    }

    renderRows = () => {
        const {activeIndex} = this.state
        return this
            .props
            .experiments
            .map((exp, index) => {
                return <Accordion key={index} fluid styled>
                    <Accordion.Title
                        active={activeIndex === index}
                        index={index}
                        onClick={this.handleClick}>
                        <Icon name='dropdown'/> {exp.mouse}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === index}>
                        {(exp.biosamples.length > 1)
                            ? <h3>Technical Replicates</h3>
                            : null}
                        {exp
                            .biosamples
                            .map((entry, idx) => {
                                return <Segment key={idx}>
                                    {entry.biosample}
                                    {(entry.assays.length > 1)
                                        ? <h5>Technical Replicates</h5>
                                        : null}
                                    {entry
                                        .assays
                                        .map((item, index) => <Segment key={index}>
                                            {item.assay}
                                            <br/>
                                            Files:
                                            <br/> {item
                                                .files
                                                .map(f => <span key={f.uuid} className="m-2 text-xs">
                                                    <a target="_blank" href={'/file/' + f.uuid}>{f.uuid}<br/></a>
                                                </span>)}
                                        </Segment>)}
                                </Segment>
                            })}
                    </Accordion.Content>
                </Accordion>
            })
    }

    render() {

        return (
            <div>
                <p>Biological Replicates, grouped by mouse and assay</p>
                {this.renderRows()}
            </div>
        )
    }
}
