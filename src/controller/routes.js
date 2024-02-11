const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/ethereum/price', controller.getEthereumPrice);
router.get('/ethereum/balance/:address', controller.getAddressBalance);
router.get('/ethereum/transactions/:address', controller.getTransactionDeatils);

module.exports = router;
