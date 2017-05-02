"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, createAt) {
    this._id = id;
    this._fName = firstName;
    this._lName = lastName;
    this._email = email;
    this._phone = phone;
    this._createAt = createAt;
  }
  get tambah() {
    //let tes = `${this._id},${this._fName},${this._lName},${this._email},${this._phone},${this._createAt}`;
    //console.log("tes ini : "+tes);
    return  `${this._id},${this._fName},${this._lName},${this._email},${this._phone},${this._createAt}`;
     //console.log("tes ini adalah id "+`${this._id}`);
  }
}
class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    var fs = require('fs')
    let data = fs.readFileSync(this._file , 'utf-8')
    data = data.split("\n")
    //console.log(data);

    for (let i = 0; i < data.length; i++) {
      data[i] = data[i].split(',')
      //let tes = new Date(year, month, day, hours, minutes, seconds, milliseconds)
      let date;
      let data_to_object = new Person(data[i][0],
                                      data[i][1],
                                      data[i][2],
                                      data[i][3],
                                      data[i][4],
                                      date = new Date(data[i][5]))
      this._people.push(data_to_object)
    }
    return this._people
  }


  addPerson(obj) {
    //let tes = new Person('201','Erwin','Ramadhan','erwinwahyuramadhan@gmail.com','0-822-423-61317', new Date())
    //console.log("ini coba tes : "+tes);
    //console.log(tes);
    this._people.push(obj.tambah)
    return this._people
  }

  save_Object() {
    const fs = require("fs");
    fs.appendFileSync(this._file, this._people + "\n", "utf-8");
  }
}
let parser = new PersonParser('people.csv')
let add = new Person('201','Erwin','Ramadhan','erwinwahyuramadhan@gmail.com','0-822-423-61317', new Date())
parser.addPerson(add)
parser.save_Object()
console.log(parser.people.length - 1);

  //console.log(parser.addPerson);
//parser.addPerson(new Person('201','Erwin','Ramadhan','erwinwahyuramadhan@gmail.com','082242361317',new Date()))
//let addData = new addPerson('201','Erwin','Ramadhan','erwinwahyuramadhan@gmail.com','082242361317',new Date())
//parser.addPerson('201','Erwin','Ramadhan','erwinwahyuramadhan@gmail.com','082242361317',new Date())


console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)
//parser.save()
//console.log(parser.addPerson());
