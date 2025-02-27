// Import required dependencies
const { app, request, database } = require("../config");

// Test suite for the GET /api/translators route
describe("GET /api/translators", () => {
  it("should fetch translators successfully", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/items endpoint
    const response = await request(app).get("/api/translators");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Test suite for the GET /api/translators/:id route
describe("GET /api/translators/:id", () => {
  it("should fetch a single translator successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/translators/:id endpoint
    const response = await request(app).get(`/api/translators/1`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should return 404 for non-existent translator", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/translators/:id endpoint with an invalid ID
    const response = await request(app).get("/api/translators/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/translators route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("POST /api/translators", () => {
  it("should add a new translator successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 2 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

   // Fake translator data (Email, Password,FirstName,LastName,NumberPhone,language)
   const faketranslator = { Email: "translator@gmail.com", Password: "passTrans1",FirstName:"first",LastName:"last",NumberPhone:"9999999",language:"Fr"  };
    // Send a POST request to the /api/translators endpoint with a test translator
    const response = await request(app).post("/api/translators").send(faketranslator);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });
});

// TODO: test PUT and DELETE routes
// Test suite for the POST /api/translators route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("PUT /api/translators", () => {
  it("should update a  translator successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake translator data (Email, Password,FirstName,LastName,NumberPhone,language)
    const faketranslator = { Email: "translator_01@gmail.com", Password: "passTrans1",FirstName:"first",LastName:"last",NumberPhone:"777777",language:"Fr",idTranslator:"1"};    
    // Send a PUT request to the /api/translators endpoint with a test translator
    const response = await request(app).put("/api/translators").send(faketranslator);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBe(result);
  });
});

// Test suite for the GET /api/translators/:id route
describe("DELETE /api/translators/:id", () => {
  it("should destroy a single translator successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/translators/:id endpoint
    const response = await request(app).get(`/api/translators/2`);

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBe(result);
  });
});
