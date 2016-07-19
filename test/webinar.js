'use strict'

const Code = require('code')
const Lab = require('lab')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const before = lab.before
const beforeEach = lab.beforeEach
const expect = Code.expect

const server = require('../server')
const db = server.app.db
const uuid = require('node-uuid')

const baseUrl = '/webinars'

describe('Webinars', () => {

  beforeEach((done) => {
    db.webinars.remove({}, (err) => {
      done()
    })
  })

  describe('/GET webinar', () => {
    it('should get all the webinars', (done) => {
      const options = {
        method: 'GET',
        url: baseUrl
      }

      server.inject(options, (response) => {
        const payload = JSON.parse(response.payload)
        expect(response.statusCode).to.equal(200)
        expect(payload).to.be.an.array();
        expect(payload.length).to.equal(0);
        done()
      })
    })
  })

  describe('/GET/:id webinar', () => {
    it('should get a webinar by ID', (done) => {
      const webinar = {
        title: 'Another sad panda discovered',
        starts: '7/23/2016 11:30',
        _id: uuid.v1()
      }

      const options = {
        method: 'GET',
        url: [baseUrl, webinar._id].join('/')
      }

      db.webinars.save(webinar, (err, result) => {
        server.inject(options, (response) => {
          const payload = JSON.parse(response.payload)
          expect(response.statusCode).to.equal(200)
          expect(payload).to.be.an.object()
          expect(payload).to.include(webinar)
          done()
        })
      })
    })
  })

  describe('/POST webinar', () => {
    it('should POST a webinar', (done) => {
      const webinar = {
        title: 'Another sad panda discovered',
        starts: '7/23/2016 11:30'
      }

      const options = {
        method: 'POST',
        url: baseUrl,
        payload: webinar
      }

      server.inject(options, (response) => {
        const payload = JSON.parse(response.payload)
        expect(response.statusCode).to.equal(200)
        expect(payload).to.be.an.object()

        expect(payload.title).to.equal(webinar.title)
        expect(payload.starts).to.equal(new Date(webinar.starts).toISOString())
        done()
      })
    })

    it('should not POST a webinar without a title', (done) => {
      const webinar = {
        starts: '7/23/2016 11:30'
      }

      const options = {
        method: 'POST',
        url: baseUrl,
        payload: webinar
      }

      server.inject(options, (response) => {
        const payload = JSON.parse(response.payload)
        expect(response.statusCode).to.equal(400)
        expect(payload.message).to.include('"title" is required')
        done()
      })
    })

    it('should not POST a webinar without a start', (done) => {
      const webinar = {
        title: 'Another sad panda discovered'
      }

      const options = {
        method: 'POST',
        url: baseUrl,
        payload: webinar
      }

      server.inject(options, (response) => {
        const payload = JSON.parse(response.payload)
        expect(response.statusCode).to.equal(400)
        expect(payload.message).to.include('"starts" is required')
        done()
      })
    })
  })

  describe('/PATCH/:id webinar', () => {
    it('should UPDATE a webinar', (done) => {
      const webinar = {
        title: 'Another sad panda discovered',
        starts: '7/23/2016 11:30',
        _id: uuid.v1()
      }

      const updatedWebinar = {
        title: 'Include disappointed pandas?',
        starts: '7/23/2016 12:00'
      }

      const options = {
        method: 'PATCH',
        url: [baseUrl, webinar._id].join('/'),
        payload: updatedWebinar
      }

      db.webinars.save(webinar, (err, result) => {
        server.inject(options, (response) => {
          expect(response.statusCode).to.equal(204)
          done()
        })
      })
    })

    it('should not UPDATE a webinar without a title or start', (done) => {
      const webinar = {
        title: 'Another sad panda discovered',
        starts: '7/23/2016 11:30',
        _id: uuid.v1()
      }

      const options = {
        method: 'PATCH',
        url: [baseUrl, webinar._id].join('/'),
        payload: {}
      }

      db.webinars.save(webinar, (err, result) => {
        server.inject(options, (response) => {
          expect(response.statusCode).to.equal(400)
          done()
        })
      })
    })
  })

  describe('/DELETE/:id webinar', () => {
    it('should DELETE a webinar by ID', (done) => {
      const webinar = {
        title: 'Another sad panda discovered',
        starts: '7/23/2016 11:30',
        _id: uuid.v1()
      }

      const options = {
        method: 'DELETE',
        url: [baseUrl, webinar._id].join('/')
      }

      db.webinars.save(webinar, (err, result) => {
        server.inject(options, (response) => {
          expect(response.statusCode).to.equal(204)
          done()
        })
      })
    })
  })
})