
let fs = require("fs");
let filename = "./people.csv";
let buf = fs.readFileSync(filename, 'utf-8');
let line = buf.split("\n")

let infoArr = []
for (let i = 1 ; i < line.length; i++) {
  infoArr.push(line[i].split(","))
}

console.log(infoArr);
