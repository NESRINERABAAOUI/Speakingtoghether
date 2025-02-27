const AbstractSeeder = require("./AbstractSeeder");

class AdminSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "administrateur", truncate: true});
  }

  // The run method - Populate the 'client' table with fake data

  run() {
    // Generate and insert fake data into the 'client' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake item data
      const fakeAdmin = {
      FirstName: this.faker.lorem.word(), // Generate a fake FirstName using faker library
      LastName: this.faker.lorem.word(), // Generate a fake LastName using faker library
      NumberPhone : 778899330+i,
      Email:"testCL"+i+"@test.com",
      Password:"passCL"+i,
      refName: `admin_${i}`
      };

      // Insert the fakeClient data into the 'clients' table
      this.insert(fakeAdmin); //insert into clients (FirstName,LastName,NumberPhone, Email, Password) values (?, ?, ?, ?, ?)
    }
  }
}


// Export the ClientSeeder class
module.exports = AdminSeeder;
