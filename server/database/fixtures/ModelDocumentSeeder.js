const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)
const ClientSeeder = require("./ClientSeeder");
const TranslatorSeeder = require("./TranslatorSeeder");

class ModelDocumentSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "Model_docs", truncate: true, dependencies: [ClientSeeder,TranslatorSeeder] });
  }

  // The run method - Populate the 'Model_docs' table with fake data

  run() {
    // Generate and insert fake data into the 'Model_docs' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake model doc data
      const fakeDoc = {
        Type_Doc:"typeDoc"+i,
        Languages_source:"lang"+i,
         Status:'V',
         Real_Path_Emplacement:"c://fakedossier"+i,
         Id_Client: this.getRef(`clients_${i}`).insertId,
         Id_Translator:this.getRef(`translators_${i}`).insertId,
         refName:`docs_${i}`,
      
      };

      // Insert the fakeDoc data into the 'Model_docs' table
      this.insert(fakeDoc); // insert into Model_docs(Type_Doc,Languages_source,Status,Real_Path_Emplacement,Id_Client,Id_Translator) values (?, ?, ?, ?, ?, ?)
    }
  }
}

// Export the ModelDocumentSeeder class
module.exports = ModelDocumentSeeder;
