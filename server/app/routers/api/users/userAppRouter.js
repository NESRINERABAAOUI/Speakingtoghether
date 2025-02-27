const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// API Routes for user
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
  login, signup,
  updateClient
} = require("../../../controllers/userActions");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

// Route to add a new item
router.post("/", add);

// Route to modifier a user
router.put("/", edit);
// Route to delete a user
router.delete("/:id", destroy);

// Route to modifier a user
router.post("/login", login);
// Route to delete a user
router.post("/register", signup);
router.put("/updateClient", updateClient);
/* ************************************************************************* */

module.exports = router;