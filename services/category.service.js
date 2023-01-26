const boom = require('@hapi/boom')

const { models } = require('../libs/sequelize')

class CategoryService {

  constructor(){
  }
  async create(data) {
    const response = await models.Category.create(data)
    return response
  }

  async find() {
    const response = await models.Category.findAll({
      include: ['products'],
    })
    return response
  }

  async findOne(id) {
    const response = await models.Category.findByPk(id)
    if (!response) {
      throw boom.notFound('Category not found')
    }
    return response
  }

  async update(id, changes) {
    const category = this.findOne(id)
    const response = await category.update(changes)
    return response
  }

  async delete(id) {
    const category = this.findOne(id)
    const response = await category.destroy()
    return response
  }

}

module.exports = CategoryService
