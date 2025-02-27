const AbstractSeeder = require('./AbstractSeeder');

class TranslatorSeeder extends AbstractSeeder {
  constructor() {
    super({ table: 'translators', truncate: true });
  }
  // The run method - Populate the 'translators' table with fake data

  run() {
    // Generate and insert fake data into the 'translators' table
    for (let i = 0; i < 5; i += 1) {
      // Generate fake item data
      const fakeTranslator = {
      FirstName: this.faker.lorem.word(), // Generate a fake FirstName using faker library
      LastName: this.faker.lorem.word(), // Generate a fake LastName using faker library
      NumberPhone : 1111220+i,
      Email:"emailTR"+i+"@test.com",
      Password:"passTr"+i,
      Language:"Language"+i,
      refName: `translator_${i}`,
      };

      // Insert the fakeTranslator data into the 'translators' table
      this.insert(fakeTranslator); //insert into translators (FirstName,LastName,NumberPhone, Email, Password,Language) values (?, ?, ?, ?, ?)
    }
  }
}

module.exports = TranslatorSeeder;
