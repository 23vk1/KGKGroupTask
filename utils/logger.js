const libExpress = require('express');
const libChalk = require('chalk');
const libMoment = require('moment');
const libFs = require('fs');
const libPath = require('path');

const util = {}

util.logColorPicker = {
    0: libChalk.white,
    1: libChalk.green,
    2: libChalk.yellow,
    3: libChalk.red
}

util.logSignPicker = {
    0: "[*]",// for comman message
    1: "[+]",// for success message
    2: "[!]",// for warning messsage
    3: "[-]" // for error message
}



const logFilePath = `${libPath.join(process.cwd(), "logs", `${libMoment().format("DD-MM-YYYY")}.log`)}`

util.logger = (msg, escalation = 0) => {
    const log = `\n${util.logSignPicker[escalation]} ${libMoment().format("DD-MM-YYYY H:mm:ss")} ${msg}`;

    // to check for log file if existed
    libFs.access(logFilePath, libFs.constants.F_OK, (err) => {
        if (err) {
            // if log file does not existed then it will creat one
            libFs.writeFileSync(logFilePath, log);
        } else {
            // if log file existed then append data to the file or append log to the  file 
            libFs.appendFileSync(logFilePath, log);
        }
    });
    console.log(util.logColorPicker[escalation](log));
}


module.exports.libUtil = util