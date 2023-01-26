const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(3)
const lastName = Joi.string().min(3)
const phone = Joi.number().integer()
const email = Joi.string().email()
const password = Joi.string().min(6)

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }).required(),
})

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  user: Joi.object({
    email: email,
    password: password,
  }),
})

const getCustomerSchema = Joi.object({
  id: id.required(),
})

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
