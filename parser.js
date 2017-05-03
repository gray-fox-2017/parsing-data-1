"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at = new Date().toUTCString()){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.data = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.people;
  }

  get people() {
    let fs = require('fs');
    let file =  fs.readFileSync(this._file).toString().split('\n')
    // console.log(JSON.stringify(file));
    let obj = [];
    for (var i = 1; i < file.length; i++) {
      let data = file[i].split(',');
      let person = new Person(data[0],data[1],data[2],data[3],data[4],data[5])
      obj.push(person);
    }
    return obj;
  }

  addPerson(first_name, last_name, email, phone) {
    let person = new Person((this.people.length-1)+1,first_name,last_name,email,phone,this.data);
    this._people.push(person);
    console.log(JSON.stringify(this._people));
  }

  savePerson(){
    let data = `\n${this._people[this._people.length-1].id},${this._people[this._people.length-1].first_name},${this._people[this._people.length-1].last_name},${this._people[this._people.length-1].email},${this._people[this._people.length-1].phone},${this._people[this._people.length-1].data}, `
    let fs =require('fs');
    fs.appendFileSync(this._file, data, 'utf-8');
  }
}


let parser = new PersonParser('people.csv')
console.log(JSON.stringify(parser._people));
parser.addPerson("nugraha", "hana", "nunua7a8@gmail.com", "085697062167");
parser.savePerson();
console.log(parser.people.length);

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
