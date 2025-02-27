// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all clients from the database
    const clientObjects = await tables.client.readAll();

    // Respond with the items in JSON format
    res.json(clientObjects);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const clientObject = await tables.client.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the client in JSON format
    if (clientObject == null) {
      res.sendStatus(404);
    } else {
      res.json(clientObject);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the client data from the request body
  const clientBody = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.client.create(clientBody);

    // Respond with HTTP 201 (Created) client
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

/// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the client data from the request body
  const clientBody = req.body;

  try {
    // Insert the item into the database
    const modifiedId = await tables.client.update(clientBody);

    // Respond with HTTP 200 (updated) client
    res.status(200).json({ modifiedId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  // Extract the client id from the request params
  const clientId = req.params.id;

  try {
    // Insert the client into the database
    const deletedId = await tables.client.delete(clientId);

    // Respond with HTTP 204 (deleted) client
    res.status(204).json({ deletedId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
