import { Base } from 'yeoman-generator';

export default class GeneratorKudu extends Base {

  constructor( ...args ) {
    super(...args);
  }

  get prompting() {

    return {};
  }

  get configuring() {
    return {};
  }

  get writing() {
    return {};
  }
}
