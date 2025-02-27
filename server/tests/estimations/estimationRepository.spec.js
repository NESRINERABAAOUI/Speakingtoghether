// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const EstimationRepository = require("../../database/models/EstimationRepository");

// Test suite for EstimationRepository
describe("EstimationRepository", () => {
  // Test: Check if EstimationRepository extends AbstractRepository
  test("EstimationRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(EstimationRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.estimation is an instance of EstimationRepository
  test("tables.estimation = new EstimationRepository", async () => {
    // Assertions
    expect(tables.estimation instanceof EstimationRepository).toBe(true);
  });

  // Test: Check if create method inserts data into the 'estimation' table
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake estimation data (Email, Id_Translator,FirstClientName,LastClientName,Language_Doc)
    const fakeEstimation = { Email: "test@gmail.com", Id_Translator: "1",FirstClientName:"firstCl",LastClientName:"last",Language_Doc:"it"  };
    // Call the create method of the estimation repository
    const returned = await tables.estimation.create(fakeEstimation);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "insert into estimation (Email, Id_Translator,FirstClientName,LastClientName,Language_Doc) values (?, ?, ?, ?, ?)",
      [fakeEstimation.Email, fakeEstimation.Id_Translator,fakeEstimation.FirstClientName, fakeEstimation.LastClientName,fakeEstimation.Language_Doc]
    );
    expect(returned).toBe(result.insertId);
  });

  // Test: Check if readAll method selects all data from the 'estimation' table
  test("readAll => select", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the estimation repository
    const returned = await tables.estimation.readAll();

    // Assertions
    expect(database.query).toHaveBeenCalledWith("select * from estimation");
    expect(returned).toStrictEqual(rows);
  });

  // Test: Check if read method selects data from the 'estimation' table based on id
  test("read => select with Id_tarification", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the estimation repository
    const returned = await tables.estimation.read(1);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "select * from estimations where Id_tarification = ?",
      [0]
    );
    expect(returned).toStrictEqual(rows[0]);
  });
});
