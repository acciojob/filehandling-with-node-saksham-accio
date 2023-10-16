const fs = require('fs');
const csvParser = require('csv-parser');

function sumCSVColumn(filePath, columnName, callback) {
  if (!filePath || !columnName) {
    callback('Usage: node main.js <path_to_csv_file> <column_name>', null);
    return;
  }

  let sum = 0;
    
  let stream = fs.createReadStream(filePath);

  stream.on('error', function(err) {
      callback(`Error reading the CSV file: ${err}`, null);
      return; // Ensure that the rest of the code doesn't execute
  })
  
  stream.pipe(csvParser())
    .on('data', (row) => {
        const value = parseFloat(row[columnName]);
        if (!isNaN(value)) {
          sum += value;
        }
    })
    .on('end', () => {
        if (sum == 0) {
            callback('Invalid column name', null);
            return;
          }
          callback(null, `The sum of ${columnName} is: ${sum}`);
    });

}

module.exports = sumCSVColumn;
