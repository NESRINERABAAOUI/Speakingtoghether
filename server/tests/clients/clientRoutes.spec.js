// Import required dependencies
const { app, request, database } = require("../config");

// Test suite for the GET /api/clients route
describe("GET /api/clients", () => {
  it("should fetch clients successfully", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/items endpoint
    const response = await request(app).get("/api/clients");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Test suite for the GET /api/clients/:id route
describe("GET /api/clients/:id", () => {
  it("should fetch a single client successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/clients/:id endpoint
    const response = await request(app).get(`/api/clients/1`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should return 404 for non-existent client", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/clients/:id endpoint with an invalid ID
    const response = await request(app).get("/api/clients/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/clients route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("POST /api/clients", () => {
  it("should add a new client successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 2 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake client data Email, Password,FirstName,LastName,NumberPhone
    const fakeClient = { Email: "test2@gmail.com", Password: "passCl2",FirstName:"first2",LastName:"last2",NumberPhone:"2222222"  };
    // Send a POST request to the /api/clients endpoint with a test client
    const response = await request(app).post("/api/clients").send(fakeClient);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });
});

// TODO: test PUT and DELETE routes
// Test suite for the POST /api/clients route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("PUT /api/clients", () => {
  it("should update a  client successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake client data Email, Password,FirstName,LastName,NumberPhone
    const fakeClient = { Email: "test1@gmail.com", Password: "passCl1",FirstName:"first",LastName:"last",NumberPhone:"333333",IdClient:"1" };
    // Send a PUT request to the /api/clients endpoint with a test client
    const response = await request(app).put("/api/clients").send(fakeClient);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBe(result);
  });
});

// Test suite for the GET /api/clients/:id route
describe("DELETE /api/clients/:id", () => {
  it("should destroy a single client successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/clients/:id endpoint
    const response = await request(app).get(`/api/clients/2`);

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBe(result);
  });
});
