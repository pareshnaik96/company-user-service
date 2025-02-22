const express = require('express');
const { createCompany, getCompanyDetails } = require('../controllers/companyController');

const router = express.Router();

router.post('/', createCompany);
router.get('/:companyId', getCompanyDetails);

module.exports = router;
