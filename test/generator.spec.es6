import { test } from 'yeoman-generator';
import chai from 'chai';
import path from 'path';

const PATH_APP_GENERATOR = path.join(__dirname, '..', 'generators', 'app');

let expect = chai.expect;

describe('Kudu generator', () => {

  it('can be instantiated', ( done ) => {
    test.run(PATH_APP_GENERATOR)
    .on('end', done);
  });
});
