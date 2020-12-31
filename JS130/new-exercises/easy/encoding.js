let functions = {
    encode(str) {
        let returnStr = '';
        let counter = 1;
        for (let idx = 0; idx < str.length; idx++) {
            if (str[idx] === str[idx + 1]) {
                counter++;
            }
            else {
                if (counter > 1) {
                    returnStr += counter + str[idx];
                } else {
                    returnStr += str[idx];
                }
                counter = 1;
            }
        }
        return returnStr;
    },
    decode(str) {
        let returnStr = '';
        for (let idx = 0; idx < str.length; idx++) {
            if (str[idx].match(/\d+/)) {
                if (str[idx].match(/\d/) && str[idx + 1].match(/\d/)) {
                    let num = `${str[idx]}${str[idx + 1]}`
                    returnStr += str[idx + 2].repeat(num);
                    idx += 2;
                }
                else {
                    returnStr += str[idx + 1].repeat(str[idx]);
                    idx++;
                }
            } else {
                returnStr += str[idx];
            }
        }
        return returnStr;
    }
}
module.exports = functions
// console.log(functions.encode('aaadeeef'))
// console.log(functions.decode('3ad3ef'))
