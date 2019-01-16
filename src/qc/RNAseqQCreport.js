import React, {Component} from 'react';
import {Container} from 'semantic-ui-react';
import GraphCard from './GraphCard';
import Information from './sections/Information';
import { getFinalScoreRNAseq } from './qcutils';
import YieldDistribution from './sections/YieldDistribution';
import FeatureCounting from './RNA-seq/FeatureCounting';
import KeyQCmetrics from './RNA-seq/KeyQCmetrics';
import SimpleTable from './RNA-seq/SimpleTable';
import LineChartSimple from './RNA-seq/LineChartSimple';
import { parseObjAndSplitBy_, parseObjAndSplitBy_WithVal } from './RNA-seq/utils';
import GroupedBarChartComponentSimple from './components/GroupedBarChartComponentSimple';
import GroupedBarChartComponentSimpleBottomLegend from './components/GroupedBarChartComponentSimpleBottomLegend';

class RNAseqQCreport extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if (Object.keys(this.props.data).length === 0) {
            return <p>Loading ... </p>  
        } 
        return (
            <div className="test">
                <h3>RNAseq QC report</h3>
                <Container>
                    <div className="m-2 p-2">
                        <div className="flex justify-center">
                            <h2
                                className="mt-2 mb-8 max-w-md bg-grey-darker border-2 rounded p-4 text-white text-center">RNA-seq QC Report</h2>
                        </div>
                        <div className="flex w-4/5">
                            <GraphCard header='Information' size='medium'>
                                <Information data={this.props.data}/>
                            </GraphCard>
                            <div className="flex-col justify-between w-full" style={{ width: '120px', height: '400px'}}>
                            <div className="font-sans text-grey text-center mt-4">Overall Score</div>
                            {(getFinalScoreRNAseq(this.props.data))?
                                <div className="m-4 p-8 border-b-2 text-5xl text-center font-sans font-extrabold">{getFinalScoreRNAseq(this.props.data).score}</div>
                                : <div className="text grey-dark font-hairline font-sans">Score not available</div>
                            }
                            <div className="flex justify-between p-4 m-2 text-3xl text-grey-dark text-center font-sans font-extrabold">
                                <div className="mr-4">STATUS</div>
                                <span role="img" aria-label="status">{getFinalScoreRNAseq(this.props.data).status}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gridAutoFlow: 'dense'
                    }}>
                    
                    <GraphCard header="Key QC metrics" subtitle='Final overall score is calculated by adding these numbers' size='small'>
                        <KeyQCmetrics data={this.props.data.Key_QC_metrics} />
                    </GraphCard>
                    <GraphCard header="Feature Counting" subtitle='Important Stats' size='small'>
                        <FeatureCounting data={this.props.data.feature_counting} />
                    </GraphCard>
                    <GraphCard header='CPM distribution' 
                            subtitle='in detected genes'
                            size='small'>
                            <GroupedBarChartComponentSimple 
                                data={[parseObjAndSplitBy_WithVal(this.props.data.feature_counting.detected_genes_cpm_distribution)]} 
                                keys={parseObjAndSplitBy_(this.props.data.feature_counting.detected_genes_cpm_distribution)} 
                                />
                    </GraphCard>
                    <GraphCard header='Library complexity' 
                            size='small'>
                            <GroupedBarChartComponentSimpleBottomLegend 
                                data={[parseObjAndSplitBy_WithVal(this.props.data.library_complexity)]} 
                                keys={parseObjAndSplitBy_(this.props.data.library_complexity)} 
                                />
                    </GraphCard>

                    <GraphCard header="Yield Distribution" subtitle='Expected Distinction' size='small'>
                        <YieldDistribution data={this.props.data} show={'Expected Distinction'}/>
                    </GraphCard>

                    <GraphCard header="Gene body coverage" size='small'>
                        <LineChartSimple 
                            xAxisLabel='Coverage' 
                            xAxisData={this.props.data.gene_body_covergae.percentile} 
                            yAxisLabel='Percentile'
                            yAxisData={this.props.data.gene_body_covergae.coverage}/>
                    </GraphCard>

                    <GraphCard header='Splice Junctions' 
                            size='small'>
                            <GroupedBarChartComponentSimple
                                data={[parseObjAndSplitBy_WithVal(this.props.data.RseQC_report.splice_junction)]} 
                                keys={parseObjAndSplitBy_(this.props.data.RseQC_report.splice_junction)} 
                                />
                    </GraphCard>
                    <GraphCard header='Splice Events' 
                            size='small'>
                            <GroupedBarChartComponentSimple
                                data={[parseObjAndSplitBy_WithVal(this.props.data.RseQC_report.splice_events)]} 
                                keys={parseObjAndSplitBy_(this.props.data.RseQC_report.splice_events)} 
                                />
                    </GraphCard>

                    <GraphCard header="Pre alignment stats" size='small'>
                        <SimpleTable data={this.props.data.pre_alignment_stats} type={'pre_alignment_stats'} />
                    </GraphCard>
                    <GraphCard header="Mapping stats" size='small'>
                        <SimpleTable data={removeProperties(this.props.data.mapping_stats, ['number_of_splice', 'alignment_program_parameters'])} type={'mapping_stats'} />
                    </GraphCard>
                    </div>
                    
                    <GraphCard header='Reads Distribution' subtitle='RseQC report'
                            size='medium'>
                            <GroupedBarChartComponentSimple 
                                data={[parseObjAndSplitBy_WithVal(this.props.data.RseQC_report.reads_distribution)]} 
                                keys={parseObjAndSplitBy_(this.props.data.RseQC_report.reads_distribution)} 
                                />
                    </GraphCard>
                </Container>
                {/* <div className="mt-4 mb-8 italic text-grey-dark">Full report not linked yet. Will be available shortly</div> */}
                <a href={this.props.fileUUID} target='_blank'>Raw JSON QC report</a>
            </div>
        );
    }
}

export default RNAseqQCreport;


function removeProperties (obj, propertiesToRemove) {
    const objClone = {...obj};
    propertiesToRemove.forEach(property => delete objClone[property]);

    return objClone;
}