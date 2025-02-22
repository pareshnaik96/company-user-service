const express = require("express");

const companyRoutes = require("./companyRoutes");
const userRoutes = require("./userRoutes");
const searchRoutes = require("./searchRoutes");

const router = express.Router();

router.use("/companies", companyRoutes);
router.use("/users", userRoutes);
router.use("/search", searchRoutes);

module.exports = router;
