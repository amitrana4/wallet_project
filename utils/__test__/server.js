process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
const service = require('../../api/service')
const constant = require('./constant')
var expect = chai.expect;
let server = require('../../index');

chai.use(chaiHttp);

describe('Sample', () => {

  /*
  * Test the /POST route
  */
  describe('/POST setup', () => {
    let walletId;
      it('setup', async () => {
        chai.request(server)
            .post('/setup')
            .send(constant.requestBody)
            .end((err, res) => {
              walletId = res.body.body.insertedId
              expect(res.body.status).to.equal(200);
            });
      })

      function delay(interval) 
      {
        return it('should delay', done => 
        {
            setTimeout(() => done(), interval)

        }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
      }
      delay(2000) // delay to be sure that record created in mongo

      it('transact', async () => {
        chai.request(server)
            .post(`/transact/${walletId}`)
            .send(constant.transactBody)
            .end((err, res) => {
              expect(res.body.status).to.equal(200);
            });
      })

      it('transactions', async () => {
        chai.request(server)
        .get('/transaction')
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
        });
      })

      it('Wallet', async () => {
        chai.request(server)
        .get(`/wallet/${walletId}`)
        .end((err, res) => {
          expect(res.body.status).to.equal(200);
        });
      })
  });
});