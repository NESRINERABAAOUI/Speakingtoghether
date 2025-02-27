// Import the repository modules responsible for handling data operations on the tables
const ClientRepository = require("./models/ClientRepository");
const AdminRepository = require("./models/AdminRepository");
const EstimationRepository = require("./models/EstimationRepository");
const TranslatorRepository = require("./models/TranslatorRepository");
const UserConnectionRepository = require("./models/UserConnectionRepository");
const ModelDocumentRepository = require("./models/ModelDocumentRepository");
// Create an empty object to hold data repositories for different tables
const tables = {};

/* ************************************************************************* */
// Register data repositories for tables
/* ************************************************************************* */

// Register each repository as data access point for its table
tables.client = new ClientRepository();
tables.admin = new AdminRepository();
tables.estimation = new EstimationRepository();
tables.translator = new TranslatorRepository();
tables.user = new UserConnectionRepository();
tables.modelDocs = new ModelDocumentRepository();

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
