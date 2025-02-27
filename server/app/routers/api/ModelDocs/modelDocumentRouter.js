const express = require("express");

const router = express.Router();

/* ************************************************************************* */
//  API Routes for translator
/* ************************************************************************* */

// Import translator-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/modelDocumentActions");

// Route to get a list of translators
router.get("/", browse);

// Route to get a specific translator by ID
router.get("/:id", read);

// Route to add a new translator
router.post("/", add);
// Route to modifier a  translator
router.put("/", edit);
// Route to delete a translator by Id
router.delete("/:id", destroy);
/* ************************************************************************* */

module.exports = router;