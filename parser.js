"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(rawData){
    this._rawData = rawData.split(',');
    this.attributes = {};
    this.attributes['id'] = this._rawData[0];
    this.attributes['first_name'] = this._rawData[1];
    this.attributes['last_name'] = this._rawData[2];
    this.attributes['email'] = this._rawData[3];
    this.attributes['phone'] = this._rawData[4];
    this.attributes['created_at'] = new Date(this._rawData[5]);
  }
}

class PersonParser {

  constructor(file) {
    this.file = file;
    this._people = [];
    this._rawData = this.readFile();
    this.personAttributes();
  }

  readFile() {
    var fs = require('fs');
    var rawData = fs.readFileSync('people.csv')
      .toString()
      .split("\n");
    return rawData;
  }

  personAttributes(){
    //for (let i=1;i<this._rawData.length;i++) {
    for (let i=1;i<this._rawData.length;i++) {
      let person = new Person(this._rawData[i]);
      //this._people.push(person.assignAttribute());
      this._people.push(person.attributes);
    }
  }

  addPerson(peopleObj) {
    // add person to the people database
    this._people.push(peopleObj.attributes);
    this.save(peopleObj);
  }

  save (peopleObj){
    // write new person to the csv
    let addToFile = "\n";
    for (var key in peopleObj.attributes){
      if (key=='created_at')addToFile += peopleObj.attributes[key];
      else addToFile += peopleObj.attributes[key] + ',';
    }
    var fs = require('fs');
    fs.appendFileSync('people.csv',addToFile);
  }

  get people() {
    return this._people;
  }
}

let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

parser.addPerson(new Person('201,Shabrina,V. I,email@shabrina.com,1-168-17-17,2013-05-10T03:53:10-07:00'));

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
