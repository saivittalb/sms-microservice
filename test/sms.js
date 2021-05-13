let SMS = require('../api/models/model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Books', () => {
    beforeEach((done) => { //Before each test we empty the database
        SMS.remove({}, (err) => {
           done();
        });
    });

  /*
  * Test the /POST inboundSMS route
  */
  describe('/POST inboundSMS', () => {
    it('It should POST an inbound SMS', (done) => {
        let sms = {
            from: 1234567890,
            to: 1234567,
            text: "Hello World"
        }
      chai.request(server)
          .post('/inbound/sms')
          .set('app-secret', 'Bearer 1234567890')
          .send(sms)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
            done();
          });
        });
    });

  /*
  * Test the /POST outboundSMS route
  */
  describe('/POST outboundSMS', () => {
    it('It should POST an outbound SMS', (done) => {
        let sms = {
            from: 1234567890,
            to: 1234567,
            text: "Hello World"
        }
      chai.request(server)
          .post('/outbound/sms')
          .set('app-secret', 'Bearer 1234567890')
          .send(sms)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
            done();
          });
        });
    });

  /*
  * Test the default response
  */
  describe('Default Response', () => {
    it('It should return a response code 405', (done) => {
        let sms = {
            from: 1234567890,
            to: 1234567,
            text: "Hello World"
        }
      chai.request(server)
          .get('/outbound/sms')
          .set('app-secret', 'Bearer 1234567890')
          .send(sms)
          .end((err, res) => {
                res.should.have.status(405);
                res.body.should.be.a('object');
            done();
          });
        });
    });
});
