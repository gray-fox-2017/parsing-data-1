"use strict"
const fs = require('fs');
class Person {
  //id,first_name,last_name,email,phone,created_at
  constructor(str) {
    let datas = str.split(',');
    this.id = datas[0];
    this.fullname = datas[1]+' '+datas[2];
    this.email = datas[3];
    this.phone = datas[4];
    this.created_at = datas[5];
  }

}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
    this.readPeople();
  }

  get file() {
    return this._file;
  }

  get people() {
    return this._people;
  }

  readPeople() {
    this._people = [];
    this._allData = fs.readFileSync(this._file,'utf8').toString().split('\n');
    let len = this._allData.length;
    for (let i = 1; i < len; i++) {
      this._people.push(new Person(this._allData[i]));
    }

  }

  addPerson(datas) {
    let len = this._allData.length-1;
    let createdate= new Date().toISOString();

    let baris = `${len},${datas.firstName},${datas.lastName},${datas.email},${datas.phone},${createdate}`+'\n';
    this._people.push(new Person(baris));


    fs.appendFile(this._file, baris, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    // fs.appendFileSync(this._file, person);
  }

}

let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.length} people in the file '${parser.file}'`);

parser.addPerson({firstName:'Lycaa', lastName: 'Tjan', email: 'ltjan@gmail.com', phone :'12345678901'});
console.log(`There are ${parser.people.length} people in the file '${parser.file}'`);
parser.addPerson({firstName:'Poppy', lastName: 'Sari', email: 'poppymighty@gmail.com', phone :'085813372797'});
console.log(`There are ${parser.people.length} people in the file '${parser.file}'`);
