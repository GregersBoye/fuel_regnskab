var fs = require('fs');
path = require('path');

const sets = require('./data/sets.json')

var moment = require('moment');

sets.forEach(convertCar)


function convertCar(set) {
    console.log('Handling car ' + set.car);
    let {month, year}  = set.start;
    console.log(`Opening file ${set.file}`);
    const filePath = path.join(__dirname, 'data', set.file);
    console.log(`Starting at ${month}/${year}`);
    const contents = fs.readFileSync(filePath, 'utf-8');
    const lines = contents.split('\n');
    const newFile = lines.reduce((accumulator, line) => {
        if (line.length === 0) {
            [month, year] = increase_date(month, year);
            console.log(`Moving to ${month}/${year}`);
            return accumulator;
        }
        const lineItems = line.split('\t');
        const date = moment([year, month - 1, lineItems[0]]);
        lineItems[0] = date.format('DD-MM-YYYY');
        lineItems.unshift(set.car);

        accumulator.push(lineItems.join('\t'));

        return accumulator;
    }, []);
  console.log(`Handled ${set.car}, ${newFile.length} added`);
    console.log('Writing to file');
    fs.appendFileSync('output.csv', newFile.join('\n') + '\n');
}

function increase_date(month, year) {
    month++;
    if (month === 13) {
        month = 1;
        year++;
    }

    return [month, year];
}
