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

    return {

      // Prompt for build system. For now we only support Grunt and Gulp. Each
      // build script is capable of compiling Babel code to ES5 and copying any
      // static assets from the source directory into the build directory.
      buildSystem() {

        if ( this.options.buildSystem ) {
          return true;
        }

        let done = this.async();
        let prompt = [
          {
            type: 'list',
            name: 'buildSystem',
            message: 'Select a build system:',
            choices: [
              'Grunt',
              'Gulp',
            ],
          },
        ];

        this.prompt(prompt, ( response ) => {
          this.options.buildSystem = response.buildSystem.toLowerCase();
          done();
        });
      },
    };
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

        // Build system templates
        switch ( this.options.buildSystem ) {
        case 'grunt':
          this.copy('_gruntfile-js', 'gruntfile.js');
          break;
        case 'gulp':
          this.copy('_gulpfile-js', 'gulpfile.js');
          break;
        }
      },
    };
  }
}
