const express = require('express');
const {getAllOrders, getOneOrder, updateOrder, deleteOrder, createOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.get('/',getAllOrders)
router.get('/:id',getOneOrder);
router.post('/',createOrder);
router.delete('/:id',deleteOrder);
router.patch('/:id',updateOrder)

module.exports = router;