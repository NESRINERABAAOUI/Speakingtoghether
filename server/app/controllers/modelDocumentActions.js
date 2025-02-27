// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all model document from the database
    const models = await tables.modelDocs.readAll();

    // Respond with the model document in JSON format
    res.json(models);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific model document from the database based on the provided ID
    const modelDoc = await tables.modelDocs.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the model document in JSON format
    if (modelDoc == null) {
      res.sendStatus(404);
    } else {
      res.json(modelDoc);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the model document data from the request body
  const modelDocBody = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.modelDocs.create(modelDocBody);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted model_document
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the model document data from the request body
  const modelDocBody = req.body;

  try {
    // edit the model document into the database
    const modifiedId = await tables.modelDocs.update(modelDocBody);

    // Respond with HTTP 200 (updated) model document
    res.status(200).json({ modifiedId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  // Extract the model document id from the request params
  const modelDocId = req.params.id;

  try {
    // delete the model document from the database
    const deletedId = await tables.translator.delete(modelDocId);

    // Respond with HTTP 204 (deleted) translator
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
