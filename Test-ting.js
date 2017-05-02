//Converter Class
var Converter = require("csvtojson").Converter;

var fs=require("fs");
//CSV File Path or CSV String or Readable Stream Object
var csvFileName="people.csv";

//new converter instance
var csvConverter=new Converter({});

var database = []

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
  console.log(jsonObj);//here is your result json object
});

//read from file
database.push(fs.createReadStream(csvFileName).pipe(csvConverter));
