// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const ModelDocumentRepository = require("../../database/models/ModelDocumentRepository");

// Test suite for ModelDocumentRepository
describe("ModelDocumentRepository", () => {
  // Test: Check if ModelDocumentRepository extends AbstractRepository
  test("ModelDocumentRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(ModelDocumentRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.ModelDocs is an instance of ModelDocumentRepository
  test("tables.translator = new ModelDocumentRepository", async () => {
    // Assertions
    expect(tables.ModelDocs instanceof ModelDocumentRepository).toBe(true);
  });

  // Test: Check if create method inserts data into the 'ModelDocs' table
  test("create => insert into", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);
    // Fake model data (Type_Doc,Languages_source,Status,Real_Path_Emplacement,Id_Client,Id_Translator) values (?, ?, ?, ?, ?, ?)`,
     const fakeModel = { TypeDoc: "CIN", LanguageSource: "Italien",Status:"1",PathUploadFile:"D:/fake_path/doc001",IdClient:"2",IdTranslator:"1"};

    // Call the create method of the translator repository
    const returned = await tables.translator.create(faketranslator);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "insert into Model_Docs (Type_Doc,Languages_source,Status,Real_Path_Emplacement,Id_Client,Id_Translator) values (?, ?, ?, ?, ?, ?)",
      [fakeModel.TypeDoc, fakeModel.LanguageSource,fakeModel.Status, fakeModel.PathUploadFile,fakeModel.IdClient,fakeModel.IdTranslator]
    );
    expect(returned).toBe(result.insertId);
  });

  // Test: Check if readAll method selects all data from the 'ModelDocs' table
  test("readAll => select", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the readAll method of the translator repository
    const returned = await tables.translator.readAll();

    // Assertions 
    expect(database.query).toHaveBeenCalledWith("select * from Model_Docs");
    expect(returned).toStrictEqual(rows);
  });

  // Test: Check if read method selects data from the 'Model_Docs' table based on id
  test("read => select with Id_Doc", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Call the read method of the modelDocs repository
    const returned = await tables.modelDocs.read(1);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "select * from Model_Docs where Id_Doc = ?",
      [0]
    );
    expect(returned).toStrictEqual(rows[0]);
  });
});
