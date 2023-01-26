const boom = require('@hapi/boom')

const { models } = require('./../libs/sequelize')

class UserService {
  constructor() {}

  async create(data) {
    const response = await models.User.create(data)
    return response
  }

  async find() {
    const response = await models.User.findAll()
    return response
  }

  async findOne(id) {
    const response = await models.User.findByPk(id)
    if (!response) {
      throw boom.notFound('User not found')
    }
    return response
  }

  async update(id, changes) {
    const user = this.findOne(id)
    const response = await user.update(changes)
    return response
  }

  async delete(id) {
    const user = this.findOne(id)
    const response = await user.destroy()
    return response
  }
}

module.exports = UserService
