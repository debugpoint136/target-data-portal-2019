import React, {Component} from 'react';
// import BarChartGraph from './BarChartGraph';
import InsertionSizeDistribution from './sections/InsertionSizeDistribution';
import PeaksLengthDistribution from './sections/PeaksLengthDistribution';
import MappingDistributionAutosome from './sections/MappingDistributionAutosome';
import Saturation from './sections/Saturation';
import YieldDistribution from './sections/YieldDistribution';
import LibraryComplexity from './sections/LibraryComplexity';
import {Container} from 'semantic-ui-react';
import GraphCard from './GraphCard';
import MappingSummary from './sections/MappingSummary';
import PeakNumbers from './sections/PeakNumbers';
import ReadsUnderPeaksPerc from './sections/ReadsUnderPeaksPerc';
import GroupedBarChartComponentSimple from './components/GroupedBarChartComponentSimple';
// import EmbeddedBrowser from '../components/embeddedbrowser/EmbeddedBrowser';
import { getFinalScore } from './qcutils';
import Information from './sections/Information';

class ATACseqQCreport extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        if (this.props.data === undefined) {
            return <p>Loading ... </p>  
        }
        return (
            <Container>
                <div className="m-2 p-2">
                    <div className="flex justify-center">
                        <h2 className="mt-2 mb-8 max-w-md bg-grey-darker border-2 rounded p-4 text-white text-center">ATAC-seq QC Report</h2>
                    </div>
                    <div className="flex w-4/5">
                    <GraphCard header='Information' size='medium'>
                            <Information data={this.props.data} assay='ATAC-seq'/>
                            
                    </GraphCard>
                        <div className="flex-col justify-between w-full" style={{ width: '120px', height: '400px'}}>
                            <div className="font-sans text-grey text-center mt-4">Overall Score</div>
                            {(getFinalScore(this.props.data))?
                                <div className="m-4 p-8 border-b-2 text-5xl text-center font-sans font-extrabold">{getFinalScore(this.props.data).score}</div>
                                : <div className="text grey-dark font-hairline font-sans">Score not available</div>
                            }
                            <div className="flex justify-between p-4 m-2 text-3xl text-grey-dark text-center font-sans font-extrabold">
                                <div className="mr-4">STATUS</div>
                                <span role="img" aria-label="status">{getFinalScore(this.props.data).status}</span>
                            </div>
                        </div>
                    </div>
                    <GraphCard
                        header='Mapping Distribution'
                        subtitle='Standards based on useful single ends, Good: 40,000,000, Acceptable: 25,000,000'
                        size='medium'>
                        <MappingSummary data={this.props.data}/>
                    </GraphCard>
                    <GraphCard header='Mapping Distribution' subtitle='Autosome (percentage)' size='medium'>
                        <MappingDistributionAutosome data={this.props.data}/>
                    </GraphCard>

                    <div
                        style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gridAutoFlow: 'dense'
                    }}>
                        <GraphCard header='Non Autosome mapping' 
                            subtitle='  '
                            size='small'>
                            <GroupedBarChartComponentSimple 
                                data={[
                                    {"Dataset": "201712 5-FAM Lung ATAC-seq", 
                                        "% of uniquely mapped reads in chrM": this.props.data["mapping_distribution"]["percentage_of_uniquely_mapped_reads_in_chrM"],
                                        "% of uniquely mapped reads in chrX": this.props.data["mapping_distribution"]["percentage_of_non-redundant_uniquely_mapped_reads_in_chrX"],
                                        "% of uniquely mapped reads in chrY": this.props.data["mapping_distribution"]["percentage_of_non-redundant_uniquely_mapped_reads_in_chrY"]}
                                ]} 
                                keys={["% of uniquely mapped reads in chrM", "% of uniquely mapped reads in chrX", "% of uniquely mapped reads in chrY"]} 
                                />
                        </GraphCard>

                        <GraphCard header='Insert Size Distribution' size='small'>
                            <InsertionSizeDistribution data={this.props.data}/>
                        </GraphCard>

                        <GraphCard header='Peak Length Distribution' size='small'>
                            <PeaksLengthDistribution data={this.props.data}/>
                        </GraphCard>

                        <GraphCard header='Peak Numbers' 
                            subtitle={`Reads under peaks : ${this.props.data["peak_analysis"]["reads_number_under_peaks"]}`} 
                            size='small'>
                            <PeakNumbers data={this.props.data}/>
                        </GraphCard>


                        <GraphCard header='Reads under Peaks (%)' 
                            subtitle='Standards for reads percentage under peaks, Good: 0.2, Acceptable: 0.12'
                            size='small'>
                            <ReadsUnderPeaksPerc 
                                data={[
                                    {"Dataset": "201712 5-FAM Lung ATAC-seq", 
                                    "% of reads under peaks": this.props.data["peak_analysis"]["reads_percentage_under_peaks"]
                                    }
                                ]} 
                                keys={["% of reads under peaks"]} 
                                maxValue={0.3}
                                standards={READS_UNDER_PEAKS_STANDARDS}/>
                        </GraphCard>

                        <GraphCard header='Background' 
                            subtitle='Standards for background, Good: 0.1, Acceptable: 0.2'
                            size='small'>
                            <ReadsUnderPeaksPerc 
                                data={[
                                    {"Dataset": "201712 5-FAM Lung ATAC-seq", "% Background RPKM > 0.3777": this.props.data["enrichment"]["percentage_of_background_RPKM_larger_than_0.3777"]}
                                ]} 
                                keys={["% Background RPKM > 0.3777"]} 
                                maxValue={0.3}
                                standards={BACKGROUND_STANDARDS}/>
                        </GraphCard>

                        <GraphCard header='Enrichment Score' 
                            subtitle='  '
                            size='small'>
                            <ReadsUnderPeaksPerc 
                                data={[
                                    {"Dataset": "", "Coding Promoter region": this.props.data["enrichment"]["enrichment_score_in_coding_promoter_regions"]}
                                ]} 
                                keys={["Coding Promoter region"]} 
                                maxValue={20}
                                standards={ENRICHMENT_STANDARDS}/>
                        </GraphCard>

                        <GraphCard header='Enrichment Score' 
                            subtitle='  '
                            size='small'>
                            <ReadsUnderPeaksPerc 
                                data={[
                                    {"Dataset": "201712 5-FAM Lung ATAC-seq", "Subsampled 10M": this.props.data["enrichment"]["subsampled_10M_enrichment_score"]}
                                ]} 
                                keys={["Subsampled 10M"]} 
                                maxValue={20}
                                standards={ENRICHMENT_Subsampled_10M_STANDARDS}/>
                        </GraphCard>
                        
                        <GraphCard
                            header='Saturation'
                            subtitle='Saturation by Peaks Recaptured'
                            size='small'>
                            <Saturation data={this.props.data} show={'Number of Peaks Recaptured'}/>
                        </GraphCard>

                        <GraphCard
                            header='Saturation'
                            subtitle='Saturation by Peak Number'
                            size='small'>
                            <Saturation data={this.props.data} show={'Number of Peaks'}/>
                        </GraphCard>

                        <GraphCard header="Yield Distribution" subtitle='Expected Distinction' size='small'>
                            <YieldDistribution data={this.props.data} show={'Expected Distinction'}/>
                        </GraphCard>

                        <GraphCard header="Confidence Interval" subtitle='Lower 0.95' size='small'>
                            <YieldDistribution data={this.props.data} show={'CI: Lower 0.95'}/>
                        </GraphCard>

                        <GraphCard header="Confidence Interval" subtitle='Upper 0.95' size='small'>
                            <YieldDistribution data={this.props.data} show={'CI: Upper 0.95'}/>
                        </GraphCard>

                        <GraphCard
                            header='Library Complexity'
                            subtitle='Percentage of PCR duplicates'
                            size='small'>
                            <LibraryComplexity data={this.props.data}/>
                        </GraphCard>
                    </div>
                </div>
                {/* <EmbeddedBrowser/> */}
            </Container>
        );
    }
}

export default ATACseqQCreport;

const READS_UNDER_PEAKS_STANDARDS = {
    'acceptable': 0.12,
    'good': 0.2
};

const BACKGROUND_STANDARDS = {
    'acceptable': 0.2,
    'good': 0.1
};

const ENRICHMENT_STANDARDS = {
    'acceptable': 7,
    'good': 11
};

const ENRICHMENT_Subsampled_10M_STANDARDS = {
    'acceptable': 15,
    'good': 18
};