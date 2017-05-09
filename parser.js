"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
    constructor(id,firstname,lastname,email,phone,create_at){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.create_at = (new Date(create_at)).toUTCString();
    }

}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
  }
  get people(){
      return this.readfile;
  }

  get file(){

  }

  get readfile(){
      let fs = require("fs");
      let filename = "./people.csv";
      let csv = fs.readFileSync(filename,'utf-8');
      let line = csv.split("\n");
      let arrInfo = [];

      //di Array kan
      for(let i = 0; i < line.length; i++){
          arrInfo.push(line[i].split(","));
      }
      // di push ke object
      for(let j = 1; j <arrInfo.length; j++) {
          this._people.push(new Person(arrInfo[j][0], arrInfo[j][1], arrInfo[j][2], arrInfo[j][3], arrInfo[j][4], arrInfo[j][5]))
      }
      return this._people;
  }

  addPerson(newPersonObject) {
      this._people.push(newPersonObject);
      console.log("Test",newPersonObject);
      var temp = `\n${newPersonObject.id},${newPersonObject.firstname},${newPersonObject.lastname},${newPersonObject.email},${newPersonObject.phone},${newPersonObject.create_at}`;
      this.save(temp);
  }
  save(temp){
      let fs = require("fs");
      fs.appendFileSync(this._file,temp,"utf-8");
  }
}

let parser = new PersonParser('people.csv');
console.log(parser.people);

parser.addPerson(new Person(201,"Antoni","Angga","antoniangga14@gmail.com","081294373359","1995-04-15"));
//console.log(`There are ${parser.people} people in the file '${parser.file}'.`)
