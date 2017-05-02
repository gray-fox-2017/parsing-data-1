"use strict"
const fs = require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone,createdAt){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.createdAt = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    let file = fs.readFileSync(this._file,"utf-8").split(`\n`)
    let splitdata;
    for (let i = 0; i < file.length; i++){
      splitdata = file[i].split(',')
      this._people.push(new Person(
      splitdata[0],
      splitdata[1],
      splitdata[2],
      splitdata[3],
      splitdata[4],
      splitdata[5]
    ))
    }
    return this._people.join('\n')
  }

  get size(){
    return this._people.length -2
  }

  get file(){
    return this._file
  }

  addPerson(ObjectPerson) {
    // let newPerson = new Person(ObjectPerson)
    this._people.push(ObjectPerson)
    console.log(`${ObjectPerson.first_name} Added!`)
    return this._people.join('\n')
  }

  save(){
    let newinput =[
    JSON.stringify(this._people[this._people.length-1].id),
    JSON.stringify(this._people[this._people.length-1].first_name),
    JSON.stringify(this._people[this._people.length-1].last_name),
    JSON.stringify(this._people[this._people.length-1].email),
    JSON.stringify(this._people[this._people.length-1].phone),
    JSON.stringify(this._people[this._people.length-1].createdAt)]

    fs.appendFileSync(this._file,newinput)
    console.log(`${this._people[this._people.length-1].first_name} Saved!`)
    return this._people
  }

}

// var inputPerson = {
//   'id': 201,
//   'first_name' : 'stedy',
//   'last_name'  : 'yulius',
//   'email' : 'stedyyulius@gmail.com',
//   'phone' : 087878559222,
//   'createdAt' : new Date().toISOString()
// }

let parser = new PersonParser('people.csv')
parser.people
parser.addPerson(new Person(201,'stedy','yulius','stedyyulius@gmail.com',087878559222,new Date().toISOString()))
parser.save()
// parser.addPerson(new Person(202,'recca','lie','recca_lie@gmail.com',08735842234,new Date().toISOString()))
// parser.save()
console.log(`There are ${parser.size} people in the file '${parser.file}'.`)
