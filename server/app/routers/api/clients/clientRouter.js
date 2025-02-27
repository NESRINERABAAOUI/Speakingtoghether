const express = require("express");

const router = express.Router();

/* ************************************************************************* */
//  API Routes for Client
/* ************************************************************************* */

const { browse, read, add ,edit,destroy } = require("../../../controllers/clientActions");

// Route to get a list of clients
router.get("/", browse);

// Route to get a specific client by ID
router.get("/:id", read);

// Route to add a new client
router.post("/", add);
// Route to modifier a client
router.put("/", edit);
// Route to delete a client
router.delete("/:id", destroy);
/* ************************************************************************* */

module.exports = router;
