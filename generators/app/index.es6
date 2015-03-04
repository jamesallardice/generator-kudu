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

    // Configure Lodash templating so it ignores interpolation markers in ES6
    // template strings.
    this._.templateSettings.interpolate = /<%=([\s\S]+?)%>/g;
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

      // Prompt for Kudu database adapter. The only adapter currently available
      // is for CouchDB but since this is expected to grow it's a list prompt.
      databaseAdapter() {

        if ( this.options.dbAdapter ) {
          return true;
        }

        let done = this.async();
        let prompt = [
          {
            type: 'list',
            name: 'dbAdapter',
            message: 'Select a Kudu database adapter:',
            choices: [
              'None, I don\'t need database support this time',
              'CouchDB',
            ],
          },
        ];

        this.prompt(prompt, ( response ) => {
          if ( response.dbAdapter.match(/^None/) ) {
            this.options.dbAdapter = null;
          } else {
            this.options.dbAdapter = response.dbAdapter.toLowerCase();
          }
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
        this.copy('env-example', '.env.example');

        // Build system templates
        switch ( this.options.buildSystem ) {
        case 'grunt':
          this.copy('_gruntfile-js', 'gruntfile.js');
          break;
        case 'gulp':
          this.copy('_gulpfile-js', 'gulpfile.js');
          break;
        }

        this.template('server/server-es6', 'src/server/server.es6');
      },
    };
  }
}
