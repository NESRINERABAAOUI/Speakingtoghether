// Import required dependencies
const { app, request, database } = require("../config");

// Test suite for the GET /api/estimations route
describe("GET /api/estimations", () => {
  it("should fetch estimations successfully", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/items endpoint
    const response = await request(app).get("/api/estimations");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Test suite for the GET /api/estimations/:id route
describe("GET /api/estimations/:id", () => {
  it("should fetch a single estimation successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/estimations/:id endpoint
    const response = await request(app).get(`/api/estimations/1`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should return 404 for non-existent estimation", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/estimations/:id endpoint with an invalid ID
    const response = await request(app).get("/api/estimations/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/estimations route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("POST /api/estimations", () => {
  it("should add a new estimation successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 2 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

     // Fake estimation data (Email, Id_Translator,FirstClientName,LastClientName,Language_Doc)
     const fakeEstimation = { Email: "test@gmail.com", Id_Translator: "1",FirstClientName:"firstCl",LastClientName:"last",Language_Doc:"Fr"  };
    // Send a POST request to the /api/estimations endpoint with a test estimation
    const response = await request(app).post("/api/estimations").send(fakeEstimation);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });
});

// TODO: test PUT and DELETE routes
// Test suite for the POST /api/estimations route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("PUT /api/estimations", () => {
  it("should update a  estimation successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake estimation data (Email, Id_Translator,FirstClientName,LastClientName,Language_Doc)
    const fakeEstimation = { Email: "estimation_Test@gmail.com", Id_Translator: "1",FirstClientName:"firstCl",LastClientName:"last",Language_Doc:"En",IdTarification:"2"};
    // Send a PUT request to the /api/estimations endpoint with a test estimation
    const response = await request(app).put("/api/estimations").send(fakeEstimation);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBe(result);
  });
});

// Test suite for the GET /api/estimations/:id route
describe("DELETE /api/estimations/:id", () => {
  it("should destroy a single estimation successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/estimations/:id endpoint
    const response = await request(app).get(`/api/estimations/2`);

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBe(result);
  });
});
