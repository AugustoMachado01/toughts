const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtsController");

//helpers
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/add", checkAuth, ToughtController.createTought);
router.post("/add", checkAuth, ToughtController.createToughtSave);
router.get("/dashboard", checkAuth, ToughtController.Dashboard);
router.get("/", ToughtController.showToughts);

module.exports = router;
