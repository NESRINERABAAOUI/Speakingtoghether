// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const TranslatorRepository = require("../../database/models/TranslatorRepository");

// Test suite for TranslatorRepository
describe("TranslatorRepository", () => {
  // Test: Check if TranslatorRepository extends AbstractRepository
  test("TranslatorRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(TranslatorRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.translator is an instance of TranslatorRepository
  test("tables.translator = new TranslatorRepository", async () => {
    // Assertions
    expect(tables.translator instanceof TranslatorRepository).toBe(true);
  });

  // Test: Check if create method inserts data into the 'translator' table
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);
    // Fake translator data (Email, Password,FirstName,LastName,NumberPhone,language)
    const faketranslator = { Email: "translator@gmail.com", Password: "passTrans1",FirstName:"first",LastName:"last",NumberPhone:"565689",language:"Fr"  };

    // Call the create method of the translator repository
    const returned = await tables.translator.create(faketranslator);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "insert into translators (Email, Password,FirstName,LastName,NumberPhone,language) values (?, ?, ?, ?, ?, ?)",
      [faketranslator.Email, faketranslator.Password,faketranslator.FirstName, faketranslator.LastName,faketranslator.NumberPhone,faketranslator.language]
    );
    expect(returned).toBe(result.insertId);
  });

  // Test: Check if readAll method selects all data from the 'translator' table
  test("readAll => select", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the translator repository
    const returned = await tables.translator.readAll();

    // Assertions 
    expect(database.query).toHaveBeenCalledWith("select * from translators");
    expect(returned).toStrictEqual(rows);
  });

  // Test: Check if read method selects data from the 'translator' table based on id
  test("read => select with Id_translator", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the translator repository
    const returned = await tables.translator.read(1);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "select * from translators where Id_Translator = ?",
      [0]
    );
    expect(returned).toStrictEqual(rows[0]);
  });
});
