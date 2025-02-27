// Import required dependencies
const { app, request, database } = require("../config");

// Test suite for the GET /api/documents route
describe("GET /api/documents", () => {
  it("should fetch model_documents successfully", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/documents endpoint
    const response = await request(app).get("/api/documents");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Test suite for the GET /api/documents/:id route
describe("GET /api/documents/:id", () => {
  it("should fetch a single model document successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/documents/:id endpoint
    const response = await request(app).get(`/api/documents/1`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should return 404 for non-existent model document", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/documents/:id endpoint with an invalid ID
    const response = await request(app).get("/api/documents/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/documents route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("POST /api/documents", () => {
  it("should add a new model document successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 2 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

   // Fake model data (Type_Doc,Languages_source,Status,Real_Path_Emplacement,Id_Client,Id_Translator)`,
   const fakeModel = { TypeDoc: "CIN", LanguageSource: "Italien",Status:"1",PathUploadFile:"D:/fake_path/doc001",IdClient:"2",IdTranslator:"1"};
   // Send a POST request to the /api/documents endpoint with a test model document
    const response = await request(app).post("/api/documents").send(fakeModel);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });
});

// TODO: test PUT and DELETE routes
// Test suite for the POST /api/documents route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("PUT /api/documents", () => {
  it("should update a  model document successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

   // Fake model data (Type_Doc,Languages_source,Status,Real_Path_Emplacement,Id_Client,Id_Translator)`,
   const fakeModel = { TypeDoc: "CIN", LanguageSource: "Francais",Status:"1",PathUploadFile:"D:/fake_path/doc001",IdClient:"2",IdTranslator:"1",IdDoc:"2"};    
   // Send a PUT request to the /api/documents endpoint with a test model doc
    const response = await request(app).put("/api/documents").send(fakeModel);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBe(result);
  });
});

// Test suite for the GET /api/documents/:id route
describe("DELETE /api/documents/:id", () => {
  it("should destroy a single model successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/documents/:id endpoint
    const response = await request(app).get(`/api/documents/2`);

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBe(result);
  });
});
