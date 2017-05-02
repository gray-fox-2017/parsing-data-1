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
    let file = fs.readFileSync(this._file,"utf-8").toString().split(`\n`)
    let splitdata;
    for (let i = 0; i < file.length; i++){
      splitdata = file[i].split(',')
      this._people.push(new Person(splitdata[0],splitdata[1],splitdata[2],splitdata[3],splitdata[4],splitdata[5]))
    }
    return this._people
  }

  get size(){
    return this._people.length -1
  }

  get file(){
    return this._file
  }

  addPerson(ObjectPerson) {
    // let newPerson = new Person(ObjectPerson)
    this._people.push(ObjectPerson)
    console.log(`${ObjectPerson.first_name} Added!`)
    return this._people
  }

  save(){
    let temp = []
    // for(let i = 0; i < this._people.length; i++){
    let newinput =
    `${this._people[this._people.length-1].id},${this._people[this._people.length-1].first_name},${this._people[this._people.length-1].last_name},${this._people[this._people.length-1].email},${this._people[this._people.length-1].phone},${this._people[this._people.length-1].createdAt}`
    // `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].createdAt}`
    temp.push("\n" + newinput)
  //}

    fs.appendFileSync(this._file,temp)
    console.log(`${this._people[this._people.length-1].first_name} Saved!`)
  }

  reset(){
    this._people = []
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
// parser.addPerson(new Person(201,'stedy','yulius','stedyyulius@gmail.com',087878559222,new Date().toISOString()))
// parser.save()
// // parser.reset()
// // parser.people
parser.addPerson(new Person(202,'recca','lie','recca_lie@gmail.com',08735842234,new Date().toISOString()))
parser.save()
// parser.addPerson(new Person(203,'james','sraun','james_sraun@gmail.com',08623472174,new Date().toISOString()))
// parser.save()
console.log(`There are ${parser.size} people in the file '${parser.file}'.`)
