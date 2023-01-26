const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')

class CustomerService {
  constructor() {}

  async create(data) {
    const response = await models.Customer.create(data, {
      include: ['user'],
    })
    return response
  }

  async find() {
    const response = await models.Customer.findAll({
      include: ['user'],
    })
    return response
  }

  async findOne(id) {
    const response = await models.Customer.findByPk(id)
    if (!response) {
      throw boom.notFound('Customer not found')
    }
    return response
  }

  async update(id, changes) {
    const customer = this.findOne(id)
    const response = await customer.update(changes)
    return response
  }

  async delete(id) {
    const customer = this.findOne(id)
    const response = await customer.destroy()
    return response
  }
}

module.exports = CustomerService
