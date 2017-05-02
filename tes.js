const fs = require('fs');
// const filename = "./people.csv";

class Person {
  constructor([id, fName, lName, email, phone, created_at]) {
    this.id = id;
    this.firstName = fName;
    this.lastName = lName;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }

  toString() {
    // id,first_name,last_name,email,phone,created_at
    return `${this.id},${this.firstName},${this.lastName},${this.email},${this.phone},${this.created_at}`;
  }

}

class PersonParser {
  constructor(filename) {
    this.file = filename;
    this._people = this.parse(filename);
  }
  parse(filename) {
    let peopleArr = [];
    let buf = fs.readFileSync(filename, 'utf-8');
    let data = buf.split('\n');
    for (let i = 1; i < data.length; i++) {
      let split = data[i].split(',');
      peopleArr.push(new Person([split[0],split[1],split[2],split[3],split[4],split[5]]));
    }
    return peopleArr;
  }

  get people() {
    return this._people;
  }

  addPerson([id, fName, lName, email, phone, created_at]) {
    this._people.push(new Person([id, fName, lName, email, phone, new Date().toISOString()]));
  }

  save() {
    let arrAkhir = [];
    for (var i = 0; i < this.people.length; i++) {
      arrAkhir.push(this.people[i].toString())
    }
      let sudah = arrAkhir.join('\n');
      fs.writeFileSync(this.file, sudah);
  }
}
let personParser = new PersonParser('./people.csv')
let orang = personParser.addPerson([201,"Andrew","Senewe","asd@gmail.com",081245678945])
console.log(personParser.people);
console.log(personParser.file);
console.log(`There are ${personParser.people.length} people in the file '${personParser.file}'.`)
