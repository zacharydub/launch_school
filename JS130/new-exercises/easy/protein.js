"use strict"

function translate(str) {
    if (!str) return [];

    let arr = getTriples(str);

    let returnArr = [];
    let valid = ['AUG', 'UUU', 'UUC', 'UUA', 'UUG', 'UCU', 'UCC', 'UCA', 'UCG', 'UAU', 'UAC', 'UGU', 'UGC', 'UGG', 'UAA', 'UAG', 'UGA'];
    let stop = ['UAA', 'UAG', 'UGA'];

    for (let idx = 0; idx < arr.length; idx++) {
        if (!valid.includes(arr[idx])) throw new Error("Invalid codon")

        if (stop.includes(arr[idx])) {
            return returnArr;
        }
        switch (arr[idx]) {
            case 'AUG':
                returnArr.push('Methionine');
                break;
            case 'UUU':
                returnArr.push('Phenylalanine');
                break;
            case 'UUC':
                returnArr.push('Phenylalanine');
                break;
            case 'UUA':
                returnArr.push('Leucine');
                break;
            case 'UUG':
                returnArr.push('Leucine');
                break;
            case 'UCU':
                returnArr.push('Serine');
                break;
            case 'UCC':
                returnArr.push('Serine');
                break;
            case 'UCA':
                returnArr.push('Serine');
                break;
            case 'UCG':
                returnArr.push('Serine');
                break;
            case 'UAU':
                returnArr.push('Tyrosine');
                break;
            case 'UAC':
                returnArr.push('Tyrosine');
                break;
            case 'UGU':
                returnArr.push('Cysteine');
                break;
            case 'UGC':
                returnArr.push('Cysteine');
                break;
            case 'UGG':
                returnArr.push('Tryptophan');
                break;
        }
    }
    return returnArr;
}

function getTriples(str) {
    let arr = [];
    for (let idx = 0; idx < str.length; idx += 3) {
        let elm = str[idx] + str[idx + 1] + str[idx + 2];
        arr.push(elm);
    }
    return arr;
}



module.exports = translate


// const CODON_TO_POLYPEPTIDE = {
//     AUG: "Methionine",
//     UUU: "Phenylalanine",
//     UUC: "Phenylalanine",
//     UUA: "Leucine",
//     UUG: "Leucine",
//     UCU: "Serine",
//     UCC: "Serine",
//     UCA: "Serine",
//     UCG: "Serine",
//     UAU: "Tyrosine",
//     UAC: "Tyrosine",
//     UGU: "Cysteine",
//     UGC: "Cysteine",
//     UGG: "Tryptophan",
//     UAA: "STOP",
//     UAG: "STOP",
//     UGA: "STOP"
//   }

//   const translate = (rna) => {
//     const CODON_LENGTH = 3;
//     let protein = [];
//     if (!rna) {
//       return protein;
//     }

//     for (let beginningIdx = 0; beginningIdx < rna.length; beginningIdx += CODON_LENGTH) {
//       let codon = rna.substring(beginningIdx, beginningIdx + CODON_LENGTH);

//       let polypeptide = CODON_TO_POLYPEPTIDE[codon];

//       if (polypeptide === "STOP") {
//         return protein;
//       }

//       if (!polypeptide) {
//         throw new Error("Invalid codon");
//       }
//       protein.push(polypeptide);
//     }
//     return protein;
//   }

