import React from 'react';
import FacetTableUIWrapper from './FacetTableUIWrapper'

export default class App extends React.Component {
    componentWillMount() {
        this.setState({
            facetState: {
                data: this.props.data,
                rows: this.props.default.rows,
                cols: this.props.default.cols,
                hiddenFromDragDrop: this.props.hide
            }
        });
    }

    render() {
        return (
            <div>
                <div className="row text-center">
                    <FacetTableUIWrapper {...this.state.facetState} onDataSelect={this.props.onDataSelect} />
                </div>
            </div>
        );
    }
}


