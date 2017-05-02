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
    //=========CARA 1 KLO PAKE writeFileSync==============
    // let arr= [];
    // for (var i = 0; i < this._people.length; i++) {
    //   let temp =`${this._people[i].id},${this._people[i].firstName},${this._people[i].lastName},${this._people[i].email},${this._people[i].phone},${this._people[i].createdAt}`
    //   arr.push(temp)
    // }
    // console.log(arr);
    // let temp = fs.writeFileSync(this._file,arr.join('\n'));

    //=========CARA 2 KLO PAKE append==============
    let temp =`\n${this._people[this.size-1].id},${this._people[this.size-1].firstName},${this._people[this.size-1].lastName},${this._people[this.size-1].email},${this._people[this.size-1].phone},${this._people[this.size-1].createdAt}`
    let asd = fs.appendFileSync(this._file,temp)
  }
}

let parser = new PersonParser('people.csv');
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
let aldy = (['201','Aldy','Andika','aldy.andika@gmail.com','0809183742',new Date()])
parser.addPerson(aldy);
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.save();
