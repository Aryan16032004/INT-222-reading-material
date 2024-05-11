// sumCalculator.js

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the value of n: ', (n) => {
    const sum = calculateSum(parseInt(n));
    fs.writeFile('output.txt', `The sum of first ${n} natural numbers is ${sum}`, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Result has been saved to result.txt');
        }
        rl.close();
    });
});

function calculateSum(n) {
    return (n * (n + 1)) / 2;
}
