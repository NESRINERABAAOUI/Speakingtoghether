const express = require("express");

const router = express.Router();
const auth = require('../../Middlewares/IsAuth');
/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersAppRouter = require("./users/userAppRouter");
const clientsRouter = require("./clients/clientRouter");

const adminRouter = require("./admin/adminRouter");
const translatorsRouter = require("./translators/translatorRouter");
const estimationsRouter = require("./estimations/estimationRouter");
const modelDocumentRouter = require("./ModelDocs/modelDocumentRouter");

router.use("/connection/", usersAppRouter);
router.use("/clients", clientsRouter);
router.use("/translators", translatorsRouter);
router.use("/estimations", estimationsRouter);
router.use("/documents", modelDocumentRouter);
router.use("/admins", adminRouter);

/* ************************************************************************* */

module.exports = router;
