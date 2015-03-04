import { Base } from 'yeoman-generator';

export default class GeneratorKudu extends Base {

  constructor( ...args ) {

    // Call the parent constructor
    super(...args);

    // The appname argument is optional. If not provided Yeoman infers it from
    // the name of the current working directory.
    this.argument('appname', {
      type: String,
      required: false,
    });
  }

  get prompting() {

    return {};
  }

  get configuring() {
    return {};
  }

  get writing() {

    return {

      // Copy templates into the new app directory
      templates() {

        this.copy('_package-json', 'package.json');
        this.copy('_bower-json', 'bower.json');
        this.copy('editorconfig', '.editorconfig');
        this.copy('gitignore', '.gitignore');
        this.copy('eslintrc', '.eslintrc');
      },
    };
  }
}
