import React from 'react'
import Pagination from '../common/Pagination'
import FileCardlet from './FileCardlet'
import {Button, Modal, Icon} from 'semantic-ui-react'
import DownloadWidget from './Download'
import BrowserView from './BrowserView';
const fileDownload = require('js-file-download')
const FASTQ_URL = "https://target.wustl.edu/processed/fromHTCF"

// reference: https://target.wustl.edu/processed/fromHTCF/5aa81c6ac6876662625fb32b/Processed_5aa81c6ac6876662625fb32b.PE.R1/5aa81c6ac6876662625fb32b.PE.R1.fastq.gz

// import './pagination.css'

class FileCard extends React.Component {
    render() {
        const data = this.props.data;
        return (
            <div className='example'>
                {data.map((item, index) => {
                    return (<FileCardlet key={index} result={item}/>);
                })}
            </div>
        );
    }
}

const inlineStyle = {
    modal: {
        marginTop: '10px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

class FilesList extends React.Component {
    state = {
        results: []
    }
/*
    componentDidMount() {
        let results = localStorage.getItem('results')

        if (results !== '') {
            this.setState({
                results: JSON.parse(results)
            })
        }
    }
*/

    render() {

        return (
            <div>
                <div className="flex">
                    <div
                        className="px-8 py-4 w-1/5 bg-grey-lighter flex justify-center text-center">
                        <div className="flex-col">
                            {/* <div className="h-16 w-full p-4 mb-8 bg-white text-white text-center">
                            <a href="/" ><h3>Home</h3></a>
                            </div> */}
                            <div className="m-8">
                                <a href="/"><Button basic color='orange' icon='home' content='Back'/></a>
                            </div>

                            <div className="m-8">
                                <Button size='tiny' color='teal' onClick={() => fileDownload(createQcscoresManifest(this.props.results), 'qc-scores.txt')}>Download all QC scores
                                    <Icon name=''/><Icon name='clipboard'/>
                                </Button>
                            </div>
                            <div className="m-8">
                                <Button size='tiny' color='purple' onClick={() => fileDownload(generateMetadataContent(this.props.results), `${Date.now()}-metadata.csv`)}>Download metadata
                                    <Icon name=''/><Icon name='download'/>
                                </Button>
                            </div>
                            {/* <Modal
                                trigger={<Button className="m-8" basic color='teal' size='large' icon='download' content='Download'/>}
                                style={inlineStyle.modal} size='large'>
                                <Modal.Header>Batch Download instructions</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <p className='m-4 font-hairline text-grey-dark'>Click the “Download” button below to download a “files.txt”
                                        file that contains a list of URLs to a file containing all the experimental metadata and links to download the file.
                                        The “files.txt” file can be copied to any server.
                                        </p>
                                        <p>The following command using cURL can be used to download all the files in the list: 
                                        <pre className='m-4 bg-grey-lighter text-pink text-center'>xargs -n 1 curl -O -L &lt; files.txt</pre>
                                        </p>
                                        <DownloadWidget data={this.props.results}/>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button positive icon='checkmark' labelPosition='right' content='Download' onClick={() => fileDownload(createDownloadManifest(this.state.results), "files.txt")}/>
                                </Modal.Actions>
                            </Modal> */}
                            <div className="m-8">
                                <Modal
                                    trigger={<Button className="m-8" basic color='pink' icon='external' content='View in Browser'/>}
                                    style={inlineStyle.modal} size='large'>
                                    <Modal.Header>Open visualization browser</Modal.Header>
                                    <Modal.Content>
                                        <Modal.Description>
                                            <BrowserView data={this.props.results}/>
                                        </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                            </div> 
                        </div>

                    </div>
                    <div className="mb-4 px-8 py-4 w-4/5 bg-grey-light items-center justify-center">
                        {(this.props.results)
                            ? <div className="flex flex-col">
                                    <div className="h-16 mb-4 w-full p-4 bg-grey-darker text-white text-center">
                                        <h3>
                                            Files List</h3>
                                    </div>
                                    <Pagination data={this.props.results}>
                                        <FileCard/>
                                    </Pagination>
                                </div>
                            : null}

                    </div>
                </div>
            </div>
        )
    }
}

export default FilesList;


function createDownloadManifest(data) {
    let files = []
    data.forEach(({run_type, fileUUID}) => {
        if (run_type === 'paired-end') {
            files.push(`${FASTQ_URL}/${fileUUID}/Processed_${fileUUID}.PE.R1/${fileUUID}.PE.R1.fastq.gz`)
            files.push(`${FASTQ_URL}/${fileUUID}/Processed_${fileUUID}.PE.R2/${fileUUID}.PE.R2.fastq.gz`)
        }
        else {
            files.push(`${FASTQ_URL}/${fileUUID}/Processed_${fileUUID}.SE/${fileUUID}.SE.fastq.gz`)
        }
    })

    return files.join('\n')
} 


function createQcscoresManifest(data) {
    const result = [];
    // const header = Object.keys(data[0]);
    result.push(["Submission","File UUID", "QC score"].join('\t\t'));
    result.push("-----------------------------------------------------------");
    data.forEach(d => (result.push([d.Submission,d.uuid, (d.QCScore === null)? 'NA': d.QCScore ].join('\t'))));
    result.push(
`
`);
    return result.join('\n');
}

function generateMetadataContent(data) {
    const header = Object.keys(data[0]);
    let result = header + "\r\n";;

    data.forEach(rowArray => {
        let rowContent = cleanComma(Object.values(rowArray));
        let row = rowContent.join(",");
        result += row + "\r\n";
    });
    return result;
}

function cleanComma(row) {
    return row.map(r => {
        if (typeof(r) === 'string') {
            return r.replace(/,/g, "_")
        } else {
            return r;
        }
    });
}