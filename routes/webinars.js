'use strict'

const Boom = require('boom')
const uuid = require('node-uuid')
const Joi = require('joi')

exports.register = function(server, options, next) {

  const db = server.app.db

  server.route({
    method: 'GET',
    path: '/webinars',
    handler: function (request, reply) {

      db.webinars.find((err, docs) => {
        if (err) { return reply(Boom.wrap(err, 'Internal MongoDB error')) }

        reply(docs)
      })
    }
  })

  server.route({
    method: 'GET',
    path: '/webinars/{id}',
    handler: function (request, reply) {

      db.webinars.findOne({
          _id: request.params.id
      }, (err, doc) => {

        if (err) { return reply(Boom.wrap(err, 'Internal MongoDB error')) }
        if (!doc) { return reply(Boom.notFound()) }

        reply(doc).code(200)
      })
    },
    config: {
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/webinars',
    handler: function (request, reply) {

      const webinar = request.payload

      webinar._id = uuid.v1()

      db.webinars.save(webinar, (err, result) => {
        if (err) { return reply(Boom.wrap(err, 'Internal MongoDB error')) }
        reply(webinar)
      })
    },
    config: {
      validate: {
        payload: {
          title: Joi.string().min(5).max(100).required(),
          starts: Joi.date().required()
       }
      }
    }
  })

  server.route({
    method: 'PATCH',
    path: '/webinars/{id}',
    handler: function (request, reply) {

      db.webinars.update({
        _id: request.params.id
      }, {
        $set: request.payload
      }, function (err, result) {

        if (err) { return reply(Boom.wrap(err, 'Internal MongoDB error')) }
        if (result.n === 0) { return reply(Boom.notFound()) }

        reply().code(204)
      })
    },
    config: {
      validate: {
        payload: Joi.object({
          title: Joi.string().min(5).max(100).optional(),
          starts: Joi.date().optional()
        }).required().min(1)
      }
    }
  })

  server.route({
    method: 'DELETE',
    path: '/webinars/{id}',
    handler: function (request, reply) {

      db.webinars.remove({
          _id: request.params.id
      }, function (err, result) {

        if (err) { return reply(Boom.wrap(err, 'Internal MongoDB error')) }
        if (result.n === 0) { return reply(Boom.notFound()) }

        reply().code(204)
      })
    },
    config: {
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    }
  })

  return next()
}

exports.register.attributes = {
  name: 'routes-webinars'
}