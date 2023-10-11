const fs = require('fs');
const csvParser = require('csv-parser');

const args = process.argv.slice(2);
const filePath = args[0]; // CSV file path
const columnName = args[1]; // Column name to sum

if (!filePath || !columnName) {
  console.error('Usage: node sum_csv_column.js <path_to_csv_file> <column_name>');
  process.exit(1);
}

let sum = 0;

fs.createReadStream(filePath)
  .pipe(csvParser())
  .on('data', (row) => {
    const value = parseFloat(row[columnName]);
    if (!isNaN(value)) {
      sum += value;
    }
  })
  .on('end', () => {
    if (sum == 0) {
      console.log('Invalid column name');
      return;
    }
    console.log(`The sum of ${columnName} is: ${sum}`);
  })
  .on('error', (error) => {
    console.error('Error reading the CSV file:', error);
  });
