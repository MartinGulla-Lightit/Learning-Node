const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize')

class ProductsService {

  constructor(){
  }

  async create(data) {
    const response = await models.Product.create(data)
    return response
  }

  find() {
    return models.Product.findAll({
      include: ['category'],
    })
  }

  async findOne(id) {
    const response = await models.Product.findByPk(id, {
      include: ['category'],
    })
    if (!response) {
      throw boom.notFound('Customer not found')
    }
    return response
  }

  async update(id, changes) {
    const product = await this.findOne(id)
    const response = await product.update(changes)
    return response
  }

  async delete(id) {
    const product = await this.findOne(id)
    const response = await product.destroy()
    return response
  }

}

module.exports = ProductsService;
