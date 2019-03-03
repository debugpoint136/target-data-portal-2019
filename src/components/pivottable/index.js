import React, {Component} from 'react';
import Wrapper from './Wrapper';
// import '../../App.css'; // include the contents - last 2 lines
import Notifications, {notify} from 'react-notify-toast';
// import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
// let addColor = { background: '#61D19E', text: "#FFFFFF" }; let removeColor =
// { background: '#b2346d', text: "#FFFFFF" };
const DEFAULT = {
  rows: ['Exposure','Assay'],
  cols: ['Tissue', 'Age'],
  data: []
}
const HIDDEN_KEYS = [
  '_id',
  '_index',
  'count',
  'Dose',
  'experiments',
  'project',
  'title',
  'selected',
  'exposure_type',
  '_type',
  'experiment',
  'experiment_set',
  'br',
  'bstr',
  'astr',
  'sr',
  'uuid', 'score', 'accession', 'paired_file_uuid', 'paired_file_accession', 'submission', 'status',
  'biosampleRowSpan', 'assayRowSpan', 'mouseRowSpan', 'biosample', 'mouse', 'assay'
]

// "experiment": "TGTEXP0JLOO0K",
//     "experiment_set": "TGTESCNI8XAI",
//     "br": "1",
//     "bstr": "1",
//     "astr": "1",
//     "sr": "1",
//     "mouse": "TGTMSW8P6ZJN",
//     "biosample": "TGTBSCM91DWS",
//     "assay": "TGTASO2EVCSD",
//     "uuid": "5baa69924ba3fc849507cbb7",
//     "score": 2,
//     "accession": "TGTFITOHRA6E",
//     "paired_file_uuid": "5baa69cee69ce57e1a21bfa3",
//     "paired_file_accession": "TGTFI1ZRLTHV",
//     "submission": "81a54e79-82dc-44f9-8cd7-3acf1042c616",
//     "status": "FAIL",
//     "Lab": "Aylor Lab",
//     "Exposure": "Control Oral Gavage",
//     "Dose": "10 microliters per kilogram",
//     "Tissue": "Blood",
//     "Age": "3 weeks",
//     "Assay": "RNA-seq",
//     "Sex": "Male",
//     "biosampleRowSpan": 2,
//     "assayRowSpan": 2,
//     "mouseRowSpan": 2
class TableMain extends Component {

  state = {
    data: this.props.data,
    setViewRedirectLink: null
  }

  show = () => notify.createShowQueue()

  handleDataSelection = (list) => {
    const redirectLink = constructCellRedirectLink(list);
    this.props.history.push(redirectLink);
    // this.setState({ setViewRedirectLink: redirectLink });
    // var win = window.open(redirectLink);
    // win.focus();
    // if (list.length > 0) {   let _data = [...this.state.data]   let afterUpdates
    // = updateSelectFlag(_data, list)   let datasetsAdded = afterUpdates[1]   let
    // datasetsRemoved = afterUpdates[2]   this.setState({data: afterUpdates[0]}) if
    // (datasetsAdded > 0) {     notify.show(`${datasetsAdded} datasets added 🛒`,
    // "custom", 1000, addColor)   }   if (datasetsRemoved > 0) {
    // notify.show(`${datasetsRemoved} datasets removed 🛒`, "custom", 1000,
    // removeColor)   } }
  }
  // TODO: upgrade componentWillReceiveProps to getDerivedStateFromProps, will be
  // deprecated in React 17 static getDerivedStateFromProps(props, current_state)
  // {   if (current_state.data.length !== props.data.length) {     return {
  // data: props.data };   } else {     return null;   } }

  componentWillReceiveProps(nextProps) {
    this.setState({data: nextProps.data});
  }

  render() {
    // if (this.state.setViewRedirectLink) {
    //   return <Redirect to={this.state.setViewRedirectLink} />
    // }
    if (this.state.data.length === 0) {
      return <div>Loading ...
      </div>
    }
    return (
      <div className="">
        <Notifications/>
        {/* <div id="wrapper_1">
          <div id="container_1"> */}
              <div className="mt-48 mb-4 container-resolute">
              </div>
              {/* <div className="ml-48 overflow-scroll h-screen border-2 border-dashed border-teal rounded p-4 flex justify-center"> */}
              <Wrapper
                data={this.state.data}
                default={DEFAULT}
                hide={HIDDEN_KEYS}
                onDataSelect={this.handleDataSelection}/>
                {/* </div> */}
              </div>
      //   </div>
      // </div>
    );
  }
}

export default withRouter(TableMain);
/*
function updateSelectFlag (_data, list) {
  let trueToFalse = 0
  let falseToTrue = 0
  _data.forEach(d => {
    if (list.includes(d.name) || list.includes(d)) {
      d.selected ? trueToFalse++ : falseToTrue++
      d.selected = !d.selected
    }
  })
  return [_data, falseToTrue, trueToFalse]
}

function addSelectedFlag(data) {

    data.forEach(d => {
      if (DEFAULT.data.includes(d.id)){
        d['selected'] = true
      } else {
        d['selected'] = false
      }
    })

    return data
  }
*/
// count=1&tissue=Liver&age_of_mice=5%20months&assay_technique=RNA-seq&lab=Chery
// l%20Walker&exposure_type=Control&mouse_gender=Male
function constructCellRedirectLink(list) {
  const correctNAMES = {
    "tissue": "tissue_list",
    "assay_technique": "assay_list",
    "lab": "lab_list",
    "exposure": "exposure_list",
    "age_of_mice": "age_list"
  };
  let tmp = [];
  Object
    .keys(list)
    .forEach(item => {
      if ([item] === "age_list") {
        tmp.push(`${[item]}=[${list[item]},${list[item]}]`);
      } else if ([item]) {
        tmp.push(`${[item]}=["${list[item]}"]`);
      }
    });
    // .forEach(item => {
    //   if (correctNAMES[item] === "age_list") {
    //     tmp.push(`${correctNAMES[item]}=[${list[item]},${list[item]}]`);
    //   } else if (correctNAMES[item]) {
    //     tmp.push(`${correctNAMES[item]}=["${list[item]}"]`);
    //   }
    // });
  let listSpreadConcat = "/set/?" + tmp.join('&');
  const params = getSearchStringFromURL();
  // if (params['search']) {
  if (Object.keys(params).length > 0) {
    Object.keys(params).forEach(additionalParam => {
      listSpreadConcat = listSpreadConcat + '&' + additionalParam + '=' + params[additionalParam] ;
    })
  }
  // console.log(listSpreadConcat);
  return listSpreadConcat;
}

function getSearchStringFromURL() {

  var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url= window.location.href,
        params = {},
        match;
    // eslint-disable-next-line
    while(match = regex.exec(url)) {
        params[match[1]] = match[2];
    }

    return params;
}