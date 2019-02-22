import React from 'react';
import moment from 'moment';

const Information = (props) => {
    const {
        file_name,
        pipe_version,
        genome,
        read_type,
        Docker_image_id,
        date,
        bash_script_MD5
    } = getInformation(props.data);
    console.log(props.data);
    return (
        <div className="">
            <div className="flex justify-between">
                <div className="w-1/5 bg-grey m-2 p-2">Report Id:
                </div>
                <div className="w-4/5 bg-grey-lightest m-2 p-2 font-mono">{file_name}</div>
            </div>
            <div className="flex justify-between">
                <div className="w-1/5 bg-grey m-2 p-2">Genome:
                </div>
                <div className="w-4/5 bg-grey-lightest m-2 p-2 font-mono">{genome}</div>
            </div>
            <div className="flex justify-between">
                <div className="w-1/5 bg-grey m-2 p-2">Read type:
                </div>
                <div className="w-4/5 bg-grey-lightest m-2 p-2 font-mono">{read_type}</div>
            </div>
            <div className="flex justify-between">
                <div className="w-1/5 bg-grey m-2 p-2">Pipeline version:
                </div>
                <div className="w-4/5 bg-grey-lightest m-2 p-2 font-mono">{pipe_version}</div>
            </div>
            <div className="flex justify-between">
                <div className="w-1/5 bg-grey m-2 p-2">Docker image id:
                </div>
                <div className="w-4/5 bg-grey-lightest m-2 p-2 font-mono text-xs">{Docker_image_id}</div>
            </div>
            <div className="flex justify-between">
                <div className="w-1/5 bg-grey m-2 p-2">Bash script MD5:
                </div>
                <div className="w-4/5 bg-grey-lightest m-2 p-2 font-mono text-xs">{bash_script_MD5}</div>
            </div>
            <div className="flex justify-between">
                <div className="w-1/5 bg-grey m-2 p-2">Processed on:
                </div>
                <div className="w-4/5 bg-grey-lightest m-2 p-2 font-mono text-xs">{date}</div>
            </div>
        </div>
    );
}

export default Information;
/**
 *
 * @param {this.props.data} data
 *
"file_name": "5b75b4d5dbb504d0a1b01768.PE.R1",
"pipe_version": "v4",
"genome": "mm10",
"bash_script_MD5": "cc1b70cf4efeaadd96568bbdfe99e486",
"read_type": "Paired-end data",
"Docker_image_id": "sha256:8896f8f11c355df12838687e195d59aa152c56ecbbc891cbd404da81abc758a3",
"running_time": "Thu_Sep_27_14:48:42_UTC_2018"
 */
function getInformation(data) {
    const {data_information} = data;
    data_information.date = sanitizeDate(data_information.running_time);

    return data_information;
}

function sanitizeDate(str) {
    const dateStr = str
        .split('_')
        .join(" ");

    const dateStrDate = new Date(dateStr)

    const date = moment(dateStrDate).format('LLL');
    return date;
}