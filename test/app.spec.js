const sinon = require('sinon');
const supertest = require('supertest');
const assert = require('assert');
const { HttpStatus } = require('@1onlinesolution/dws-http');
const { Logger } = require('@1onlinesolution/dws-log');
const app = require('../server');

describe('*** Unit Test *** GET /', function () {
  let request;
  beforeEach(function () {
    request = supertest(app);
  });

  it('responds with json', function (done) {
    request.get('/').set('Accept', 'application/json').expect('Content-Type', /json/).expect(HttpStatus.statusOk, done);
  });

  it('responds with message', function (done) {
    request
      .get('/')
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(function (res) {
        assert(res.body.status === HttpStatus.statusOk);
        assert(res.body.success);
        assert(res.body.value.message.includes('Herodotus Service'));
      })
      .end(done);
  });
});

describe('*** Unit Test *** GET /wrong-route', function () {
  let request;
  beforeEach(function () {
    request = supertest(app);
  });

  it('responds with not found', function (done) {
    request
      .get('/wrong-route')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        assert(res.body.status === HttpStatus.statusNotFound);
        assert(res.body.success === false);
        assert(res.body.value.message.includes('not found'));
      })
      .end(done);
  });
});

describe('*** Unit Test *** File/Error', function () {
  let sandbox = null;
  let request;
  beforeEach(function () {
    request = supertest(app);
    sandbox = sinon.createSandbox();
  });
  afterEach(function () {
    sandbox.restore();
  });

  it('GET /api/file/error responds with not found', function (done) {
    request
      .get('/api/file/error')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        assert(res.body.status === HttpStatus.statusNotFound);
        assert(res.body.success === false);
        assert(res.body.value.message.includes('not found'));
      })
      .end(done);
  });

  it('POST /api/file/error logs correctly', function (done) {
    const message = {
      value: 'ok',
    };
    const meta = {
      value: '1',
    };
    const send = sandbox.stub(Logger.prototype, 'error').resolves(true);
    request
      .post('/api/file/error')
      .send({ message: message, meta: meta })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        const { status, success, value } = res.body;
        const { message, meta } = value;
        assert(status === 201);
        assert(success);
        assert(message.value === 'ok');
        assert(meta.value === '1');
        sinon.assert.calledOnce(send);
        done();
      })
      .catch((err) => done(err));
  });
});

describe('*** Unit Test *** File/Warn', function () {
  let sandbox = null;
  let request;
  beforeEach(function () {
    request = supertest(app);
    sandbox = sinon.createSandbox();
  });
  afterEach(function () {
    sandbox.restore();
  });

  it('GET /api/file/warn responds with not found', function (done) {
    request
      .get('/api/file/warn')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        assert(res.body.status === HttpStatus.statusNotFound);
        assert(res.body.success === false);
        assert(res.body.value.message.includes('not found'));
      })
      .end(done);
  });

  it('POST /api/file/warn logs correctly', function (done) {
    const message = {
      value: 'ok',
    };
    const meta = {
      value: '1',
    };
    const send = sandbox.stub(Logger.prototype, 'warn').resolves(true);
    request
      .post('/api/file/warn')
      .send({ message: message, meta: meta })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        const { status, success, value } = res.body;
        const { message, meta } = value;
        assert(status === 201);
        assert(success);
        assert(message.value === 'ok');
        assert(meta.value === '1');
        sinon.assert.calledOnce(send);
        done();
      })
      .catch((err) => done(err));
  });
});

describe('*** Unit Test *** File/Info', function () {
  let sandbox = null;
  let request;
  beforeEach(function () {
    request = supertest(app);
    sandbox = sinon.createSandbox();
  });
  afterEach(function () {
    sandbox.restore();
  });

  it('GET /api/file/info responds with not found', function (done) {
    request
      .get('/api/file/info')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        assert(res.body.status === HttpStatus.statusNotFound);
        assert(res.body.success === false);
        assert(res.body.value.message.includes('not found'));
      })
      .end(done);
  });

  it('POST /api/file/info logs correctly', function (done) {
    const message = {
      value: 'ok',
    };
    const meta = {
      value: '1',
    };
    const send = sandbox.stub(Logger.prototype, 'info').resolves(true);
    request
      .post('/api/file/info')
      .send({ message: message, meta: meta })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        const { status, success, value } = res.body;
        const { message, meta } = value;
        assert(status === 201);
        assert(success);
        assert(message.value === 'ok');
        assert(meta.value === '1');
        sinon.assert.calledOnce(send);
        done();
      })
      .catch((err) => done(err));
  });
});

describe('*** Unit Test *** Db/Error', function () {
  let sandbox = null;
  let request;
  beforeEach(function () {
    request = supertest(app);
    sandbox = sinon.createSandbox();
  });
  afterEach(function () {
    sandbox.restore();
  });

  it('GET /api/db/error responds with not found', function (done) {
    request
      .get('/api/db/error')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        assert(res.body.status === HttpStatus.statusNotFound);
        assert(res.body.success === false);
        assert(res.body.value.message.includes('not found'));
      })
      .end(done);
  });

  it('POST /api/db/error logs correctly', function (done) {
    const message = {
      value: 'ok',
    };
    const meta = {
      value: '1',
    };
    const send = sandbox.stub(Logger.prototype, 'error').resolves(true);
    request
      .post('/api/db/error')
      .send({ message: message, meta: meta })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        const { status, success, value } = res.body;
        const { message, meta } = value;
        assert(status === 201);
        assert(success);
        assert(message.value === 'ok');
        assert(meta.value === '1');
        sinon.assert.calledOnce(send);
        done();
      })
      .catch((err) => done(err));
  });
});

describe('*** Unit Test *** Db/Warn', function () {
  let sandbox = null;
  let request;
  beforeEach(function () {
    request = supertest(app);
    sandbox = sinon.createSandbox();
  });
  afterEach(function () {
    sandbox.restore();
  });

  it('GET /api/db/warn responds with not found', function (done) {
    request
      .get('/api/db/warn')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        assert(res.body.status === HttpStatus.statusNotFound);
        assert(res.body.success === false);
        assert(res.body.value.message.includes('not found'));
      })
      .end(done);
  });

  it('POST /api/db/warn logs correctly', function (done) {
    const message = {
      value: 'ok',
    };
    const meta = {
      value: '1',
    };
    const send = sandbox.stub(Logger.prototype, 'warn').resolves(true);
    request
      .post('/api/db/warn')
      .send({ message: message, meta: meta })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        const { status, success, value } = res.body;
        const { message, meta } = value;
        assert(status === 201);
        assert(success);
        assert(message.value === 'ok');
        assert(meta.value === '1');
        sinon.assert.calledOnce(send);
        done();
      })
      .catch((err) => done(err));
  });
});

describe('*** Unit Test *** Db/Info', function () {
  let sandbox = null;
  let request;
  beforeEach(function () {
    request = supertest(app);
    sandbox = sinon.createSandbox();
  });
  afterEach(function () {
    sandbox.restore();
  });

  it('GET /api/db/info responds with not found', function (done) {
    request
      .get('/api/db/info')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res) {
        assert(res.body.status === HttpStatus.statusNotFound);
        assert(res.body.success === false);
        assert(res.body.value.message.includes('not found'));
      })
      .end(done);
  });

  it('POST /api/db/info logs correctly', function (done) {
    const message = {
      value: 'ok',
    };
    const meta = {
      value: '1',
    };
    const send = sandbox.stub(Logger.prototype, 'info').resolves(true);
    request
      .post('/api/db/info')
      .send({ message: message, meta: meta })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then((res) => {
        const { status, success, value } = res.body;
        const { message, meta } = value;
        assert(status === 201);
        assert(success);
        assert(message.value === 'ok');
        assert(meta.value === '1');
        sinon.assert.calledOnce(send);
        done();
      })
      .catch((err) => done(err));
  });
});
