import React, {Component} from 'react';
import * as d3 from 'd3';
import ExperimentList from './experimentset/ExperimentList';

class SetCards extends Component {
    state = {
        mice_groups: []
    }

    componentDidMount() {
        var nested_data = d3.nest()
            .key(function(d) { return d.experiment_set; })
            .key(function(d) { return d.mouse; })
            .entries(this.props.data);
        
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
        if (this.state.mice_groups.length === 0) {
            return <p>Looking up ..</p>
        }

        return (
            <div className="sdfs">
                <ExperimentList results={this.state.mice_groups}/>
            </div>
        );
    }
}

export default SetCards;