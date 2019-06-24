import React, {Component} from 'react';
import Header from '../main/Header';
import { Button, Image, Modal, Icon } from 'semantic-ui-react';
import * as cn from 'classnames';
import Card from '../main/Card';
import AccessionHeading from '../main/AccessionHeading';
import ProcessedFiles from '../experiment-set-replicates/processed/ProcessedFiles';
import ProcessedFilesScaffold from '../experiment-set-replicates/processed/ProcessedFilesScaffold';
import InformationBanner from '../experiment-set-replicates/InformationBanner';
import ExperimentTable from '../experiment-set-replicates/ExperimentTable';


const fileDownload = require('js-file-download')

const inlineStyle = {
  modal: {
      marginTop: '10px !important',
      marginLeft: 'auto',
      marginRight: 'auto'
  }
};

class ExperimentSingle extends Component {
  state = {}

  componentDidMount() {
    console.log(this.props.result)
  }

  render() {
    const {experiment, mouse_strain, status,
      Assay,
      treatment_exposure_age_last,
      treatment_exposure_category,
      treatment_exposure_life_stage,
      treatment_exposure_paradigm,
      treatment_exposure_specific,
      mouse_animal_weight_sac,
      mouse_fasted,
      mouse_fasted_hours,
      mouse_internal_id,
      mouse_life_stage_collection,
      mouse_liver_tumors,
      mouse_perfusion,
      assay_category,
      assay_protocol_url,
      biosample_collection_protocol_url
  } = this.props.result;

    return (
      <div>
      <Header/>
                <div className='three-columns flex'>
                    <div className={styles.leftSideBar}>
                        <ul className={styles.leftSideList}>
                            <div className={styles.leftSideListRow}>
                                {/* <Button size='tiny' color='purple' onClick={() => fileDownload(generateMetadataContent(this.props.results), `${Date.now()}-metadata.csv`)}>Download metadata
                                    <Icon name=''/><Icon name='download'/>
                                </Button> */}
                            </div>
                        </ul>
                    </div>
                    <div className="p-2 middle-column w-3/5 flex-1">
                            
                        <div className="px-8 container mx-auto">
                        <AccessionHeading accession={experiment} status='Experiment' iconName='dna'/>
                        <div className="mb-4 p-4 w-auto"><InformationBanner result={this.props.result}/></div>
                            <div className="m-4 bg-white w-auto">
                                <ExperimentTable result={this.props.result}/>
                            </div> 
                            <div className="text-xl text-uppercase font-extrabold font-sans p-4">Processed files :</div>
                            <ProcessedFilesScaffold>
                                {(this.props.result.length > 0) ? <ProcessedFiles result={this.props.result} assay={Assay}/> : 'Loading..'}
                            </ProcessedFilesScaffold>
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

export default ExperimentSingle;

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