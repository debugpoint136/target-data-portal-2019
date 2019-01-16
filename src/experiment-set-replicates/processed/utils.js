// const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
const path = require('path');

const EXTENSIIONS = {
                    'ATAC-seq': ['.bam', '.bigWig', '.narrowPeak'],
                    'RNA-seq': [ '.sbg.gz', '.sbg.gz.tbi', '_Rsem.genes.fpkm.tsv', '_Rsem.isoforms.fpkm.tsv', '_Rsem.transcript.bam' ]
                    }   

export function fetchProcessedFileStats(URL, ASSAY, UUID) {
    return rp(URL)
        .then(function(html) {
            const $ = cheerio.load(html);
            cheerioTableparser($);
            const data = $("table").parsetable();
            const [filenames, dates, sizes] = data.splice(1,3);

            const result = filenames.map((filename, index) => {
                let res = filename.toString().match(/>(.)*</g);
                if (Array.isArray(res)) {
                    res = res.toString().slice(1, -1);
                }
                return { name: res, date: dates[index].trim(), size: sizes[index] }
            });

            const onlyValidFiles = result.filter(res => res.name)
            let filesValidExt = [];
            
            onlyValidFiles.forEach(fileEntry => {
                const filesValidExtTmp= EXTENSIIONS[ASSAY].filter(ext => fileEntry.name.includes(ext));

                if (filesValidExtTmp.length > 0) {
                    const extension = filesValidExtTmp[0];
                    const fileRoot = fileEntry.name.split(extension)[0];

                    if (fileRoot === UUID) {
                        let typeAdded = Object.assign(fileEntry, { type: extension });
                        const filesValidExtClone = filesValidExt.slice(0);
                        filesValidExt = filesValidExtClone.concat(typeAdded); 
                    }
                } 
            })
            return filesValidExt;
        })
        .catch(function(err) {
        //handle error
        });
}

const WEB_DIR = 'https://target.wustl.edu/files';

export function getPipelineOutDirOnly(fileObj, assay) {
    const { submission, uuid } = fileObj;
    const outDir = `${WEB_DIR}/${assay}/${submission}/${uuid}`;
    return outDir;
}