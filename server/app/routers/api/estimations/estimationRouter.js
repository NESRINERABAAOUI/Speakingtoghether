const express = require("express");

const router = express.Router();

/* ************************************************************************* */
//  API Routes for estimation
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  edit,
  destroy,
  add,
} = require("../../../controllers/estimationActions");

// Route to get a list of estimations
router.get("/", browse);

// Route to get a specific estimation by ID
router.get("/:id", read);

// Route to add a new estimation
router.post("/", add);
// Route to modifier a estimation
router.put("/", edit);
// Route to delete a estimation
router.delete("/:id", destroy);
/* ************************************************************************* */

module.exports = router;