const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')

class OrderService {

  constructor(){
  }
  async create(data) {
    const response = await models.Order.create(data)
    return response
  }

  async find() {
    const response = await models.Order.findAll({
      include: ['products'],
    })
    return response
  }

  async findOne(id) {
    const response = await models.Order.findByPk(id, {
      include: [{ association: 'customer', include: ['user'] }, 'products'],
    })
    if (!response) {
      throw boom.notFound('Order not found')
    }
    return response
  }

  async update(id, changes) {
    const order = this.findOne(id)
    const response = await order.update(changes)
    return response
  }

  async delete(id) {
    const order = this.findOne(id)
    const response = await order.destroy()
    return response
  }

  async addProduct(data) {
    const newProduct = await models.OrderProduct.create(data)
    return newProduct
  }
}

module.exports = OrderService
