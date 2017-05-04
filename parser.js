"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor (id, fName, lName, email, phone, createdAt=new Date()) {
    this.id = id
    this.firstName = fName;
    this.lastName = lName;
    this.email = email;
    this.phone = phone;
    this.createdAt = new Date(createdAt);
  }

}

// TEST


class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.personInfo();
  }

  get people() {
    return this._people;
  }

  addPerson(personObj) {
    this._people.push(personObj);
  }


  personInfo() {
    var fs = require("fs");
    let buf = fs.readFileSync(this._file, 'utf-8');
    let line = buf.split("\n")

    let infoArr = []
    for (let i = 1 ; i < line.length; i++) {
      infoArr.push(line[i].split(","))
    }

    let people = []
    for (let i = 0; i < infoArr.length - 1; i++) {
      let person = new Person(infoArr[i][0], infoArr[i][1], infoArr[i][2], infoArr[i][3], infoArr[i][4], infoArr[i][5], infoArr[i][6]);
      people.push(person);
    }
    return people;
  }

  objToStr () {
    let result = ["id,first_name,last_name,email,phone,created_at"];
    for (let i = 0; i < this._people.length; i++) {
      let arr = [];
      arr.push(this._people[i].id);
      arr.push(this._people[i].firstName);
      arr.push(this._people[i].lastName);
      arr.push(this._people[i].email);
      arr.push(this._people[i].phone);
      arr.push(this._people[i].createdAt);
      result.push(arr.join(","));
    }

    return result.join("\n");

  }

  save() {
    let fs = require('fs')
    fs.writeFile(this._file, this.objToStr(), 'utf-8', (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });
  }

}

let parser = new PersonParser("people.csv")
// console.log(parser);
parser.addPerson(new Person(201, "fajar", "karim", "fajar@karim.com", "089-9878-1800"));
// parser.addPerson(new Person(202, "fajar", "karim", "fajar@karim.com", "20:00:00"));
parser.save();

// console.log(parser.people[200]);
// console.log(parser.objToStr());
//
// let parser = new PersonParser('people.csv')
//
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
