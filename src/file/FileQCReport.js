import React, {Component} from 'react';
import ResultTable from './ResultTable';
import {
    Grid,
    Container,
    Header,
    Image,
    Segment,
    // Menu
} from 'semantic-ui-react'
const IMAGE_URL = "https://s3.amazonaws.com/targetdcc-data";
class FileQCReport extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { source } = this.props;
        return (
            <div className="test">
                <Container>
                    {(this.state.loading)
                        ? 'Loading ... '
                        : (this.state.notFound)
                            ? <h4>QC Report not found</h4>
                            : <Grid celled='internally'>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Header>Data information</Header>
                                        <ResultTable data={source['data_information']}/>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Header>Mapping stats</Header>
                                        <ResultTable data={source['mapping_stats']}/>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Header>Mapping distribution</Header>
                                        <ResultTable data={source['mapping_stats']}/>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={10}>
                                        <Header>Peak analysis</Header>
                                        <ResultTable data={source['peak_analysis']}/>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <Header>Pre alignment stats</Header>
                                        <ResultTable data={source['pre_alignment_stats']}/>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Header>Saturation</Header>
                                        <Image src={`${IMAGE_URL}/plot4.5_saturation.png`}/>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Header>Enrichment</Header>
                                        <ResultTable data={source['enrichment']}/>
                                        <hr/>
                                        <Header>Library complexity</Header>
                                        <ResultTable data={source['library_complexity']}/>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Segment>
                                            <Header>Peaks Enrichment Ratio</Header>
                                            <Image src={`${IMAGE_URL}/plot4.2.2_peaks_enrichment_ratio.png`}/>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Segment>
                                            <Header>Insert size distribution</Header>
                                            <Image src={`${IMAGE_URL}/plot3.1_insertion_size.png`}/>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Segment>
                                            <Header>PCR duplicates</Header>
                                            <Image src={`${IMAGE_URL}/plot4.3_PCR_duplicates_percentage.png`}/>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Segment>
                                            <Header>RUP</Header>
                                            <Image src={`${IMAGE_URL}/plot4.1_RUP.png`}/>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Segment>
                                            <Header>Reads Percentage Per Chromosome</Header>
                                            <Image src={`${IMAGE_URL}/plot2.2_reads_distri_in_chrom.png`}/>
                                            <hr/>
                                            <Header>Reads Distribution</Header>
                                            <Image src={`${IMAGE_URL}/plot2.2_reads_distri_in_chrom.png`}/>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Segment>
                                            <Header>Promoter Peak Count</Header>
                                            <Image src={`${IMAGE_URL}/plot4.6_promoter-peak_count.png`}/>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={8}>
                                        <Segment>
                                            <Header>Yield Distribution</Header>
                                            <Image src={`${IMAGE_URL}/plot2.3_yield_distinction.png`}/>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Segment>
                                            <Header>Peak Length Distribution</Header>
                                            <Image src={`${IMAGE_URL}/plot3.3_peak_length.png`}/>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
}
                </Container>
            </div>
        );
    }
}

export default FileQCReport;