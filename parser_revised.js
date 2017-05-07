"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(){
    this.id = obj['id'];
    this.firstName = obj['firstName'];
    this.lastName = obj['lastName'];
    this.email = obj['email'];
    this.phone = obj['phone'];
    this.createdAt = obj['createdAt'];
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.fs = require('fs')
    this.papa = require('babyparse')
  }

  get people() {
    return this._people
  }

  parse(){
    let content = this.fs.readFileSync(this._file, { encoding: 'utf8' });
    this.papa.parse(content, {
    step: function(row){
            // console.log("Row: ", row.data[0]);
            this._people.push(row.data[0]);
          }
    });
  }

  addPerson() {}

}

let parser = new PersonParser('people.csv')
parser.
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// parser.people
