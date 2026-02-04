const Joi = require('joi');
const { VALID_CURRENCIES } = require('./currencies');

const orderSchema = Joi.object({
    order_id: Joi.string().required(),
    customer_email: Joi.string().email().required(),
    total_amount: Joi.number().positive().required(),
    currency: Joi.string().valid(...VALID_CURRENCIES).required(),
    created_at: Joi.date().iso().required()
});

function validateOrder(orderData) {
    return orderSchema.validate(orderData);
}

module.exports = { validateOrder };