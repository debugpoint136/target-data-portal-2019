import React, {Component} from 'react';
import {Container} from 'semantic-ui-react';
import GraphCard from './GraphCard';
import Information from './sections/Information';
import GroupedBarChartComponentSimpleBottomLegend from './components/GroupedBarChartComponentSimpleBottomLegend';
import { parseObjAndSplitBy_, parseObjAndSplitBy_WithVal } from './RNA-seq/utils';
import SimpleTable from './RNA-seq/SimpleTable';

const RRBSseqQCReport = (props) => {
    return (
        <div className='test'>
            <Container>
                <div className="m-2 p-2">
                    <div className="flex justify-center">
                        <h2
                            className="mt-2 mb-8 max-w-md bg-grey-darker border-2 rounded p-4 text-white text-center">RRBS-seq QC Report</h2>
                    </div>
                    <div className="flex w-4/5">
                        <GraphCard header='Information' size='medium'>
                            <Information data={props.data}/>
                        </GraphCard>
                        <div className='flex-col justify-between'>
                            <div className="font-sans text-grey text-center mt-4">Overall Score not available for RRBS-seq</div>
                            <a className="p-8" href="https://github.com/Zhang-lab/WGBS_analysis" target="_blank">Pipeline documentation</a> 
                        </div>
                    </div>
                </div>
                

                
                <div style={{
                        display: 'grid',
                        gridTemplateColumns: '5fr 3fr',
                        gridAutoFlow: 'dense'
                    }}>
                <GraphCard header="Mapping stats" size='medium'>
                        <SimpleTable data={props.data.mapping_stats} type={'mapping_stats'} />
                </GraphCard>
                <GraphCard header="Bisulfite stats" size='small'>
                        <SimpleTable data={props.data.bisulfite} type={'mapping_stats'} />
                </GraphCard>
                
                </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gridAutoFlow: 'dense'
                    }}>
                    <GraphCard header='Library complexity' 
                            size='small'>
                            <GroupedBarChartComponentSimpleBottomLegend 
                                data={[parseObjAndSplitBy_WithVal(props.data.library_complexity)]} 
                                keys={parseObjAndSplitBy_(props.data.library_complexity)} 
                                />
                    </GraphCard>
                    
                    <GraphCard header="Pre-alignment stats" size='small'>
                            <SimpleTable data={props.data.pre_alignment_stats} type={'pre_alignment_stats'} />
                    </GraphCard>
                    
                </div>

                <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gridAutoFlow: 'dense'
                    }}>
                    {
                        getPDFdocumentURL(props.data.data_information.file_name, props.fileUUID).map(entry =>
                            <object key={props.fileUUID} data={`${entry.name}.pdf`} type="application/x-pdf" title="Coverage" width="550" height="172">
                                <a target="_blank" href={entry.url}>
                                    <div className='w-64 h-16 p-8 m-8 rounded shadow-lg bg-white text-xl font-sans flex justify-center items-center'>
                                        {entry.name}
                                    </div>
                                </a> 
                            </object>
                        )
                    }
                </div>
            </Container>
        </div>
    );
}

export default RRBSseqQCReport;

function getPDFdocumentURL(uuidStr, path) {

    /**
     *  fileUUID: "https://target.wustl.edu/files/RRBS-seq/4bca171d-afc2-4c31-84b0-1e99c4c3e3d4/5aa7376d978593341975e3e5/5aa7376d978593341975e3e5.json"
        "5aa7376d978593341975e3e5.SE"
     */

    const uuid = uuidStr.split('.')[0];
    const pathBase = path.split(uuid)[0];

    // http://target.wustl.edu/files/RRBS-seq/4bca171d-afc2-4c31-84b0-1e99c4c3e3d4/5aa73a02c07a340d9d7223d4/QC_WGBS_data_collection_5aa73a02c07a340d9d7223d4.SE/step3.4_trimed_5aa73a02c07a340d9d7223d4.SE_C_in_CpG_coverage.pdf

    const linksToReturn = [];
    const constructedPath1 = `${pathBase}${uuid}/QC_WGBS_data_collection_${uuidStr}/step3.4_trimed_${uuidStr}_C_in_CpG_coverage.pdf`;
    linksToReturn.push({ name: "CPG_Coverage", url: constructedPath1 });

    // const constructedPath2 = `${pathBase}${uuid}/QC_WGBS_data_collection_${uuidStr}/step3.1_GC_Percentage_vs_coverage_rho_${uuidStr}_0.179895841634228_plot.pdf`;
    // linksToReturn.push({ name: "GC_%age_vs_Coverage", url: constructedPath2 });

    const constructedPath3 = `${pathBase}${uuid}/QC_WGBS_data_collection_${uuidStr}/step3.3_trimed_${uuidStr}_complexity_lc_extrap.pdf`;
    linksToReturn.push({ name: "Complexity_lc_extrap", url: constructedPath3 });

    const constructedPath4 = `${pathBase}${uuid}/QC_WGBS_data_collection_${uuidStr}/step3.2.1_methylation_percentage_plot_notrim_${uuidStr}.jpeg`;
    linksToReturn.push({ name: "Methylation percentage - No trim", url: constructedPath4 });

    const constructedPath5 = `${pathBase}${uuid}/QC_WGBS_data_collection_${uuidStr}/step3.2.2_methylation_percentage_plot_trim5_${uuidStr}.jpeg`;
    linksToReturn.push({ name: "Methylation percentage - Trimmed", url: constructedPath5 });

    return linksToReturn;

}