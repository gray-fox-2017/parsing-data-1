"use strict"
const fs = require('fs');

class Person {
  constructor(obj){
    this.id = obj.id;
    this.firstName = obj.first_name;
    this.lastName = obj.last_name;
    this.email = obj.email;
    this.phone = obj.phone;
    this.createdAt = obj.created_at
  }
  stringified(){
    return `${this.id},${this.firstName},${this.lastName},${this.email},${this.phone},${this.createdAt},`;
  }
}

class PersonParser {
  constructor(file) {
    this._file = file;
    this._people = this.readPeople()
  }
  readPeople() {
    let arr = [];
    let temp = fs.readFileSync(this._file).toString().split('\n');
    for(let i=0;i<temp.length;i++){
      arr.push(temp[i])
    }
    return arr
  }
  get people() {
    return this
  }
  get size() {
    return this._people.length
  }
  get file() {
    return this._file
  }

  addPerson(obj) {
    let person = new Person(obj);
    this._people.push(person.stringified());
  }
  save(){
    let temp = fs.writeFileSync(this._file,this._people.join('\n'));
  }
}

let parser = new PersonParser('people.csv');
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

let aldy = {
  id : 201,
  first_name : 'Aldy',
  last_name : 'Andika',
  email : 'aldy.andika@gmail.com',
  phone : '0809183742',
  created_at : new Date()
}
parser.addPerson(aldy);
console.log(`Now, There are ${parser.people.size} people in the file '${parser.file}'.`)
console.log(parser._people[parser.people.size-1]+'\n'+parser._people[parser.people.size-2]);
parser.save();
