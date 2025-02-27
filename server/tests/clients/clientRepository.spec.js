// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const ClientRepository = require("../../database/models/ClientRepository");

// Test suite for ClientRepository
describe("ClientRepository", () => {
  // Test: Check if ClientRepository extends AbstractRepository
  test("ClientRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(ClientRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.client is an instance of ClientRepository
  test("tables.client = new ClientRepository", async () => {
    // Assertions
    expect(tables.client instanceof ClientRepository).toBe(true);
  });

  // Test: Check if create method inserts data into the 'client' table
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake client data Email, Password,FirstName,LastName,NumberPhone
    const fakeClient = { Email: "test@gmail.com", Password: "passCl1",FirstName:"first",LastName:"last",NumberPhone:"565689"  };

    // Call the create method of the client repository
    const returned = await tables.client.create(fakeClient);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "insert into clients (Email, Password,FirstName,LastName,NumberPhone) values (?, ?, ?, ?, ?)",
      [fakeClient.Email, fakeClient.Password,fakeClient.FirstName, fakeClient.LastName,fakeClient.NumberPhone]
    );
    expect(returned).toBe(result.insertId);
  });

  // Test: Check if readAll method selects all data from the 'client' table
  test("readAll => select", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the client repository
    const returned = await tables.client.readAll();

    // Assertions
    expect(database.query).toHaveBeenCalledWith("select * from clients");
    expect(returned).toStrictEqual(rows);
  });

  // Test: Check if read method selects data from the 'client' table based on id
  test("read => select with Id_Client", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the client repository
    const returned = await tables.client.read(1);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "select * from clients where Id_Client = ?",
      [0]
    );
    expect(returned).toStrictEqual(rows[0]);
  });
});
