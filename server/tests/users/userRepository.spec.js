// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const UserConnectionRepository = require("../../database/models/UserConnectionRepository");

// Test suite for UserConnectionRepository
describe("UserConnectionRepository", () => {
  // Test: Check if UserConnectionRepository extends AbstractRepository
  test("UserConnectionRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(UserConnectionRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.user is an instance of UserConnectionRepository
  test("tables.user = new UserConnectionRepository", async () => {
    // Assertions
    expect(tables.user instanceof UserConnectionRepository).toBe(true);
  });

  // Test: Check if create method inserts data into the 'user' table
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake user data Email, Password
    const fakeuser = { Email: "admin@gmail.com", Password: "admin01"};

    // Call the create method of the user repository
    const returned = await tables.user.create(fakeuser);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "insert into admins_App (Email, Password) values (?, ?)",
      [fakeuser.Email, fakeuser.Password]
    );
    expect(returned).toBe(result.insertId);
  });

  // Test: Check if readAll method selects all data from the 'admins_App' table
  test("readAll => select", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the user repository
    const returned = await tables.user.readAll();

    // Assertions
    expect(database.query).toHaveBeenCalledWith("select * from admins_App");
    expect(returned).toStrictEqual(rows);
  });

  // Test: Check if read method selects data from the 'admins_App' table based on id
  test("read => select with Id_User", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the user repository
    const returned = await tables.user.read(1);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "select * from admins_App where Id_User = ?",
      [0]
    );
    expect(returned).toStrictEqual(rows[0]);
  });
});
