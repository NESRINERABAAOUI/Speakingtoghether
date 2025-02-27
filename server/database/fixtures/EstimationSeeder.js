const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)
const ModelDocSeeder = require("./ModelDocumentSeeder");
const TranslatorSeeder = require("./TranslatorSeeder");
class EstimationSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "Estimation", truncate: true, dependencies: [ModelDocSeeder,TranslatorSeeder] });
  }
  // The run method - Populate the 'Estimation' table with fake data

  run() {
    // Generate and insert fake data into the 'Estimation' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake model doc data
      const fakeEstma = {
        Email:"Exemple"+i+"@gmail.com",
        idTranslator:this.getRef(`translator_${i}`).insertId,
        FirstClientName:this.faker.lorem.word(),
        LastClientName:this.faker.lorem.word(),
        Language_Doc:"langue"+i,
        IdDoc: this.getRef(`docs_${i}`).insertId,
        refName:`estimation_${i}`,
      };

      // Insert the fakeEstma data into the 'Estimation' table
      this.insert(fakeEstma); // insert into Estimation(Email, Id_Translator,FirstClientName,LastClientName,Language_Doc,Id_Doc) values (?, ?, ?, ?, ?)
    }
  }
}

// Export the EstimationSeeder class
module.exports = EstimationSeeder;
