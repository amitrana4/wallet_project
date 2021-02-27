process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index');
var should = require('chai').should();
const path = require("path");


chai.use(chaiHttp);

describe('images', () => {
    

  /*
  * Test the /POST route
  */
  describe('/POST saveImage', () => {
      it('saving image', (done) => {
        chai.request(server)
            .post('/image')
            .field('customKey', 'customValue')
            .attach('files', './utils/__test__/testImage/test1.png', 'test1.png')
            .end((err, resp) => {
              resp.should.have.status(200);
              resp.body.should.be.a('object');
              
              describe('/GET image', () => {
                it('getting image with change extenson', (done) => {
                  chai.request(server)
                      .get(`/image/id=${resp.body.imageId}.png`)
                      .end((err, res) => {
                        res.should.have.status(200);
                        done();
                      });
                });
              });

          done();
        });
      });

  });
});