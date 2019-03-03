import React from 'react';
import PivotTableUIWrapper from './PivotTableUIWrapper';
import { timingSafeEqual } from 'crypto';
import {Button, Icon} from 'semantic-ui-react'

export default class Wrapper extends React.Component {

    state = {
        pivotState: {
            data: this.props.data,
            rows: this.props.default.rows,
            cols: this.props.default.cols,
            hiddenFromDragDrop: this.props.hide
        }
    }

    handleTableReset = () => {
        localStorage.removeItem('facets');
        this.setState({
            pivotState: {
                data: this.props.data,
                rows: this.props.default.rows,
                cols: this.props.default.cols,
                hiddenFromDragDrop: this.props.hide
            }
        });
    }

    componentWillMount() {
        this.setState({
            pivotState: {
                data: this.props.data,
                rows: this.props.default.rows,
                cols: this.props.default.cols,
                hiddenFromDragDrop: this.props.hide
            }
        });
        const prevSavedFacetSettings = localStorage.getItem('facets');
        if (prevSavedFacetSettings) {
            const settingsFound = JSON.parse(prevSavedFacetSettings);
            let pivotStateState = {...this.state.pivotState};

            pivotStateState.rows = settingsFound.rows;
            pivotStateState.cols = settingsFound.cols;

            this.setState({ pivotState: pivotStateState });
        }
    }

    handleFacetReshape = (s) => {
        this.setState({ pivotState: s });
    }

    componentWillReceiveProps(nextProps) {
        let currentPivotState = {...this.state.pivotState};
        currentPivotState.data = nextProps.data;
        this.setState({pivotState: currentPivotState});
    }

    render() {
        return (
            <div>
                <div className='flex justify-center'>
                    <Button size='tiny' onClick={this.handleTableReset}><Icon name='refresh'/>Reset Axis Labels</Button>
                </div>
                <div className="h-screen flex justify-center">
                        <div className="row text-center">
                            <PivotTableUIWrapper {...this.state.pivotState} 
                                onDataSelect={this.props.onDataSelect}
                                handleFacetReshape={this.handleFacetReshape}
                                />
                        </div>
                    </div>
                </div>
        );
    }
}


