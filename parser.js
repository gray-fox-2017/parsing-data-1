"use strict"

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt){
    this.id = id
    this.first_name = firstName
    this.last_name = lastName
    this.email = email
    this.phone = phone
    this.created_at = (new Date(createdAt)).toString()
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.peopleArr()
  }

  get people() {
    return this._people;
  }

  get file() {
    return this._file
  }

  peopleArr() {
    const fs = require('fs')
    let data = fs.readFileSync(this._file, 'utf8').split('\n') // read file in into array
    let peopleArr = []
    for (let i=0; i<data.length-1; i++){
      let fileArr = data[i].split(',') // split data in line by coma
      data[i] = fileArr // change data with array
      let obj = {}
      if(i!==0){
        for (let j=0; j<data[i].length; j++){
          if (j==5){ // date set
            obj[data[0][j]] = (new Date(data[i][j])).toString() // convert date
          } else {
            obj[data[0][j]] = data[i][j]
          }
        }
        peopleArr.push(obj) // push object into array
      }
    }
    return peopleArr
  }

  addPerson(object) {
    return this._people.push(object)
  }

  objToString(){
    let arr = ['id,first_name,last_name,email,phone,created_at']
    for(let i=0; i<this._people.length; i++){
      let row = [];
      row.push(this._people[i].id);
      row.push(this._people[i].first_name);
      row.push(this._people[i].last_name);
      row.push(this._people[i].email);
      row.push(this._people[i].phone);
      row.push(this._people[i].created_at);
      arr.push(row)
    }
    return arr.join('\n')
  }

  save() {
    const fs = require('fs')
    fs.writeFile('people.csv', this.objToString())
    return 'file has been saved!'
  }

}

let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.length} people in the file ${parser.file}.`)

// add person
parser.addPerson(new Person(201, 'Priambodo', 'Kurniawan', 'iam@gmail.com', '1-373-588-1689', '2013-11-01T06:08:44-07:00'))
console.log(parser.save())

// add person
parser.addPerson(new Person(202, 'Kurniawan', 'Priambodo', 'priambodo@gmail.com', '1-373-588-1689', '2013-11-01T06:08:44-07:00'))
console.log(parser.save())

console.log(`There are ${parser.people.length} people in the file ${parser.file}.`)
