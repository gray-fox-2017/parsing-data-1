"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(obj) { //id,first_name,last_name,email,phone,created_at
    this.id = obj['id'];
    this.first_name = obj['first_name'];
    this.last_name = obj['last_name'];
    this.email = obj['email'];
    this.phone =obj['phone'];
    this.created_at = obj['created_at'];
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
  }

  get people() {
    let file = fs.readFileSync(this._file, 'utf-8').split('\n');
    let data = []
    for (var i = 0; i < file.length; i++) {
      data[i]= file[i].split(',');
    }

    for (var i = 0; i < file.length; i++) {
      let date = new Date();
      let person = new Person({
        id : data[i][0],
        first_name : data[i][1],
        last_name : data[i][2],
        email : data[i][3],
        phone : data[i][4],
        created_at : data[i][5]
      });
      this._people.push(person);
    }
    return this._people
  }

  get size() {
    return this._people.length - 1;
  }

  addPerson(obj) {
    this._people.push(obj);
    //console.log(this._people[201]);
  }

  save () {
    let datapeople = this._people.length - 1;

    let saveperson = `${this._people[datapeople].id+1}, ${this._people[datapeople].first_name}, ${this._people[datapeople].last_name}, ${this._people[datapeople].email}, ${this._people[datapeople].phone}, ${this._people[datapeople].created_at} \n`;
    fs.appendFileSync('people.csv', saveperson);
  }

}


let parser = new PersonParser('people.csv')
parser.people;

let newperson = new Person({
  id : '201',
  first_name : 'Ambo',
  last_name : 'Dalle',
  email : 'ambo@gmail.com',
  phone : '1234567',
  created_at : new Date().toUTCString()
})

console.log(parser._people[parser._people.length-1]);
parser.addPerson(newperson)
console.log(parser._people[parser._people.length-1]);
console.log('-----------------------------------------------------------');
console.log(newperson);
parser.save();
console.log(`There are ${parser.size} people in the file '${parser._file}'.`)
