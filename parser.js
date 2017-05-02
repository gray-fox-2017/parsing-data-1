"use strict"

let fs = require('fs');
let csv = require('fast-csv');

class Person {
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id         = id;
    this.first_name = first_name;
    this.last_name  = last_name;
    this.email      = email;
    this.phone      = phone;
    this.created_at = new Date(created_at);
  }
}

class PersonParser {
  constructor(file) { // parameter untuk file yang akan di parse
    this._file = file;
    this._people = null;
  }

  get file(){
    return this._file; // ambil file yang udah di update
  }

  get people() {
    // buat variable untuk menampung file yang akan kita baca
    let readData = fs.readFileSync(this._file, 'utf-8');

    // buat variable untuk menampung file yang sudah kita olah (split tiap ada ',' jadi line break) agar data jadi array
    let editData = readData.split(/[,\n]+/g);
    // console.log(editData);
    let fileData = []; // buat variable penampung array of object

    for(let i=0; i<editData.length; i+=6){
      let person = new Person(); // buat object baru
      person.id         = editData[i]; // isi
      person.first_name = editData[i+1];
      person.last_name  = editData[i+2];
      person.email      = editData[i+3];
      person.phone      = editData[i+4];
      person.created_at = new Date(editData[i+5]);
      fileData.push(person);
    }
    return this._people = fileData;
  }

  addPerson(add = {}) {
    this._people.push(add);
  }

  save() {
    let ws = fs.createWriteStream("people.csv");
    csv.write(this._people).pipe(ws);
  }

}

let parser = new PersonParser('people.csv');
let data  = parser.people;
let ade = new Person(201,'ade','anugerah','ade_anugerahtb@yahoo.com','1-633-389-7173','2012-05-10T03:53:40-07:00');
parser.addPerson(ade);
parser.save();
// console.log(data);


console.log(`There are ${data.length} people in the file '${parser.file}'.`)
