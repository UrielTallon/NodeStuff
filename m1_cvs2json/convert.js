const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

const loc = process.argv[2];
const dest = path.join(__dirname, 'data.json');

var arr = [];

csv()
    .fromFile(loc)
    .on('json', (jsonObj) => {
        arr.push(jsonObj);
    })
    .on('done', (error) => {
        if (error) return process.exit(1);
        console.log(arr);
        fs.writeFile(dest, JSON.stringify(arr, null, 2), (error) => {
            if (error) return process.exit(1);
            console.log('done');
            return process.exit(0);
        })
    })
    