const AbstractSeeder = require("./AbstractSeeder");

// Import seeders that must be executed before this one
// Follow your foreign keys to find the right order ;)
const ClientSeeder = require("./ClientSeeder");
const TranslatorSeeder = require("./TranslatorSeeder");

class UserConnectionSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "users_app", truncate: true, dependencies: [ClientSeeder,TranslatorSeeder] });
  }

  // The run method - Populate the 'user' table with fake data

  run() {
    // Generate and insert fake data into the 'user' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake user data
      const fakeUserForClient = {
        Email:"testCL"+i+"@test.com",
        Pass_word:"passCL"+i,
        RoleUser:'C',
        Id_User: this.getRef(`client_${i}`).insertId, // Create a reference name for the user
      };

      // Insert the fakeUser data into the 'users_App' table
      this.insert(fakeUserForClient); // insert into users_App(email, password) values (?, ?)
    }
       for (let i = 0; i < 5; i += 1) {
        // Generate fake user data
        const fakeUserForClient = {
          Email:"emailTR"+i+"@test.com",
          Pass_word:"passTr"+i,
          RoleUser:'T',
          Id_User: this.getRef(`translator_${i}`).insertId, // Create a reference name for the user
        };
  
        // Insert the fakeUser data into the 'user' table
        this.insert(fakeUserForClient); // insert into user(email, password) values (?, ?)
      }
  }
}

// Export the ItemSeeder class
module.exports = UserConnectionSeeder;
