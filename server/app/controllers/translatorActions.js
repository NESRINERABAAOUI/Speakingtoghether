// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all translators from the database
    const translators = await tables.translator.readAll();

    // Respond with the translators in JSON format
    res.json(translators);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific translator from the database based on the provided ID
    const translator = await tables.translator.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the translator in JSON format
    if (translator == null) {
      res.sendStatus(404);
    } else {
      res.json(translator);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the translator data from the request body
  const translatorBody = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.translator.create(translatorBody);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted translator
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the translator data from the request body
  const translatorBody = req.body;

  try {
    // Insert the item into the database
    const modifiedId = await tables.translator.update(translatorBody);

    // Respond with HTTP 200 (updated) translator
    res.status(200).json({ modifiedId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  // Extract the translator id from the request params
  const translatorId = req.params.id;

  try {
    // Insert the item into the database
    const deletedId = await tables.translator.delete(translatorId);

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
