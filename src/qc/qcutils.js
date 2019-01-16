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

export function getFinalScoreRNAseq(qcJSON) {
    if (qcJSON.hasOwnProperty('score_matrix')) {
        const score = qcJSON['score_matrix']['total_score'];
        return {
            score: score,
            status: getScoreStatusRNAseq(score)
        };
    } else {
        return null;
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