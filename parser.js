"use strict"
const fs = require('fs');


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    return this._people
  }

  csvHandler(){
    let tmp = fs.readFileSync(this._file)
    .toString()
    .split("\n")

    let jsonObj = [];
    let headers = tmp[0].split(',');
    for(let i = 1; i < tmp.length; i++) {
      let data = tmp[i].split(',');
      let obj = {};
      for(let j = 0; j < data.length; j++) {
         obj[headers[j]] = data[j].trim();
      }
      jsonObj.push(obj);
    }
    console.log(jsonObj);
    console.log(jsonObj.length);
  }

  addPerson() {
  }

}

let parser = new PersonParser('people.csv')
parser.csvHandler();
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
