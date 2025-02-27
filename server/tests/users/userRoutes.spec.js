// Import required dependencies
const { app, request, database } = require("../config");

// Test suite for the GET /api/users route
describe("GET /api/users", () => {
  it("should fetch users successfully", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/items endpoint
    const response = await request(app).get("/api/users");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Test suite for the GET /api/users/:id route
describe("GET /api/users/:id", () => {
  it("should fetch a single user successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/users/:id endpoint
    const response = await request(app).get(`/api/users/1`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should return 404 for non-existent user", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).get("/api/users/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

// Test suite for the POST /api/users route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("POST /api/users", () => {
  it("should add a new user successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 2 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake user data Email, Password
    const fakeuser = { Email: "test2@gmail.com", Password: "pass"};
    // Send a POST request to the /api/users endpoint with a test user
    const response = await request(app).post("/api/users").send(fakeuser);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });
});

// TODO: test PUT and DELETE routes
// Test suite for the POST /api/users route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("PUT /api/users", () => {
  it("should update a  user successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);
    // Fake user data Email, Password
    const fakeuser = { Email: "client01@gmail.com", Password: "passCl2",Id_User:"1"};
    // Send a PUT request to the /api/users endpoint with a test user
    const response = await request(app).put("/api/users").send(fakeuser);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBe(result);
  });
});

// Test suite for the GET /api/users/:id route
describe("DELETE /api/users/:id", () => {
  it("should destroy a single user successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Send a GET request to the /api/users/:id endpoint
    const response = await request(app).get(`/api/users/2`);

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toBe(result);
  });
});
