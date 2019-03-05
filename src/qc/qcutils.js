export function getFinalScore(qcJSON) {
        if (qcJSON.hasOwnProperty('score_matrix')) {
            const score = qcJSON['score_matrix']['total_score'];
            return {
                score: score,
                status: getScoreStatus(score)
            };
        } else {
            return null;
        }
}


export function getScoreGeneric(assay, qcJSON) {
    switch (assay) {
        case 'RNA-seq':
            return getFinalScoreRNAseq(qcJSON)
            break;
        case 'ATAC-seq':
            return getFinalScore(qcJSON)
            break;

        default:
            return {
                score: 'NA',
                status: 'NA'
            };
            break;
    }

}
export function getFinalScoreRNAseq(qcJSON) {
    if (qcJSON.hasOwnProperty('score_matrix')) {
        const score = qcJSON['score_matrix']['total_score'];
        return {
            score: score,
            status: getScoreStatusRNAseq(score)
        };
    } else if (qcJSON.hasOwnProperty('Key_QC_metrics')){
        /**
         * "uniq_ratio": 1,
            "assign_reads": 1,
            "genes_w_CPM_gt1": 1
         */
        const { uniq_ratio, assign_reads, genes_w_CPM_gt1 } = qcJSON['Key_QC_metrics'];
        let score = Number.parseInt(uniq_ratio) + Number.parseInt(assign_reads) + Number.parseInt(genes_w_CPM_gt1);
        if (score) {
            if (score === 3) {
                return {
                    score: score,
                    status: getScoreStatusRNAseq(score)
                };
            } else {
                return {
                    score: 'NA',
                    status: 'NA'
                };
            }
        }
    } else {
        return {
            score: 'NA',
            status: 'NA'
        };
    }
}

function getScoreStatus(score) {
    if (score >= 5) {
        return '✅';
    } else {
        return '🔴';
    }
}

function getScoreStatusRNAseq(score) {
    if (!score) {
        return 'NA'
    }
    if (score === 3) {
        return '✅';
    } else {
        return '🔴';
    }
}