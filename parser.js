"use strict"
const fs = require('fs');

class Person {
  constructor(data){
    this.id = data[0];
    this.firstName = data[1];
    this.lastName = data[2];
    this.email = data[3];
    this.phone = data[4];
    this.createdAt = data[5];
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
    //console.log(temp);
    if(temp[temp.length-1]===''){
      for(let i=0;i<temp.length-1;i++){
        let personArr = temp[i].split(',');
        arr.push(new Person(personArr))
      }
    } else {
      for(let i=0;i<temp.length;i++){
        let personArr = temp[i].split(',');
        arr.push(new Person(personArr))
      }
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

  addPerson(data) {
    let person = new Person(data);
    this._people.push(person);
  }
  save(){
    //let temp = fs.writeFileSync(this._file,JSON.stringify(this._people));
    //let temp = fs.writeFileSync(this._file,this._people.stringified());
    let arr= [];
    for (var i = 0; i < this._people.length; i++) {
      let temp =`${this._people[i].id},${this._people[i].firstName},${this._people[i].lastName},${this._people[i].email},${this._people[i].phone},${this._people[i].createdAt}`
      arr.push(temp)
    }
    console.log(arr);
    let temp = fs.writeFileSync(this._file,arr.join('\n'));
  }
}

let parser = new PersonParser('people.csv');
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
//console.log(parser._people);
//console.log(parser.people);
let aldy = (['201','Aldy','Andika','aldy.andika@gmail.com','0809183742',new Date()])
parser.addPerson(aldy);
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
console.log(parser._people[parser._people.length-3],parser._people[parser._people.length-2],parser._people[parser._people.length-1])//,arr[arr.length-1]);
// console.log(`Now, There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.save();
