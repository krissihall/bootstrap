/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var fs = require('fs');
  var path = require('path');
  var generateCustomiconsData = require('./grunt/bs-customicons-data-generator.js');
  var BsLessdocParser = require('./grunt/bs-lessdoc-parser.js');
  var getLessVarsData = function () {
    var filePath = path.join(__dirname, 'less/variables.less');
    var fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    var parser = new BsLessdocParser(fileContent);
    return { sections: parser.parseFile() };
  };
  var generateRawFiles = require('./grunt/bs-raw-files-generator.js');
  var generateCommonJSModule = require('./grunt/bs-commonjs-generator.js');
  var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' });

  Object.keys(configBridge.paths).forEach(function (key) {
    configBridge.paths[key].forEach(function (val, i, arr) {
      arr[i] = path.join('./docs/assets', val);
    });
  });

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',
    jqueryCheck: configBridge.config.jqueryCheck.join('\n'),
    jqueryVersionCheck: configBridge.config.jqueryVersionCheck.join('\n'),

    // Task configuration.
    clean: {
      dist: 'dist',
      docs: 'docs/dist'
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      grunt: {
        options: {
          jshintrc: 'grunt/.jshintrc'
        },
        src: ['Gruntfile.js', 'package.js', 'grunt/*.js']
      },
      core: {
        src: [
          'js/*.js',
          '!js/_custom-detect-breakpoint.js'
        ]

      },
      test: {
        options: {
          jshintrc: 'js/tests/unit/.jshintrc'
        },
        src: 'js/tests/unit/*.js'
      },
      assets: {
        src: ['docs/assets/js/src/*.js', 'docs/assets/js/*.js', '!docs/assets/js/*.min.js']
      }
    },

    jscs: {
      options: {
        config: 'js/.jscsrc'
      },
      grunt: {
        src: '<%= jshint.grunt.src %>'
      },
      core: {
        src: '<%= jshint.core.src %>'
      },
      test: {
        src: '<%= jshint.test.src %>'
      },
      assets: {
        options: {
          requireCamelCaseOrUpperCaseIdentifiers: null
        },
        src: '<%= jshint.assets.src %>'
      }
    },

    webfont: {
      icon: {
        src: 'svg/iconfonts/*.svg',
        dest: 'fonts/',
        destCss: 'less/',
        options: {
          codepoints: {
            'address-book': 0xf101,
            airplane: 0xf102,
            android: 0xf103,
            apple: 0xf104,
            bin: 0xf105,
            bin2: 0x106,
            blocked: 0xf107,
            books: 0xf108,
            bubble: 0xf109,
            bubble2: 0xf10a,
            bubbles2: 0xf10b,
            bubbles4: 0xf10c,
            bullhorn: 0xf10d,
            camera: 0xf10e,
            'cancel-circle': 0xf10f,
            cart: 0xf110,
            'checkbox-checked': 0xf111,
            'checkbox-unchecked': 0xf112,
            checkmark: 0xf113,
            chrome: 0xf114,
            'circle-down': 0xf115,
            'circle-left': 0xf116,
            'circle-right': 0xf117,
            'circle-up': 0xf118,
            clock: 0xf119,
            clock2: 0xf11a,
            'cloud-check': 0xf11b,
            'cloud-download': 0xf11c,
            'cloud-upload': 0xf11d,
            cloud: 0xf11e,
            cog: 0xf11f,
            cogs: 0xf120,
            compass: 0xf121,
            connection: 0xf122,
            cross: 0xf123,
            deviantart: 0xf124,
            deviantart2: 0xf125,
            display: 0xf126,
            dribbble: 0xf127,
            dribbble2: 0xf128,
            dropbox: 0xf129,
            droplet: 0xe90b,
            enlarge: 0xf12a,
            enlarge2: 0xf12b,
            'eye-blocked': 0xf12c,
            eye: 0xf12d,
            eyedropper: 0xf12e,
            facebook: 0xf12f,
            facebook2: 0xf130,
            feed2: 0xf131,
            feed3: 0xf132,
            'file-pdf': 0xf133,
            'file-picture': 0xf134,
            'file-play': 0xf135,
            'file-text': 0xf136,
            'file-word': 0xf137,
            'files-empty': 0xf138,
            film: 0xf139,
            firefox: 0xf13a,
            flag: 0xf13b,
            flickr2: 0xf13c,
            flickr3: 0xf13d,
            'folder-open': 0xf13e,
            forward: 0xf13f,
            foursquare: 0xf140,
            gift: 0xf141,
            github: 0xf142,
            github5: 0xf143,
            'google-drive': 0xf144,
            'google-plus': 0xf145,
            'google-plus2': 0xf146,
            headphones: 0xf147,
            heart: 0xf148,
            home: 0xe900,
            html5: 0xf149,
            html52: 0xf14a,
            IE: 0xf14b,
            images: 0xf14c,
            info: 0xf14d,
            instagram: 0xf14e,
            keyboard: 0xf14f,
            link: 0xf150,
            linkedin: 0xf151,
            linkedin2: 0xf152,
            list: 0xf153,
            location: 0xf154,
            lock: 0xf155,
            menu: 0xf156,
            mic: 0xf157,
            minus: 0xf158,
            mobile: 0xf159,
            notification: 0xf15a,
            opera: 0xf15b,
            packman: 0xf15c,
            pause: 0xf15d,
            pause2: 0xf15e,
            paypal: 0xf15f,
            pencil: 0xf905,
            phone: 0xf160,
            picassa: 0xf161,
            picassa2: 0xf162,
            pinterest: 0xf163,
            pinterest2: 0xf164,
            play: 0xf165,
            play2: 0xf166,
            play3: 0xf167,
            plus: 0xf168,
            'price-tag': 0xf169,
            printer: 0xf16a,
            pushpin: 0xf16b,
            question: 0xf16c,
            'quotes-left': 0xf16d,
            'quotes-right': 0xf16e,
            'radio-checked': 0xf16f,
            'radio-checked2': 0xf170,
            'radio-unchecked': 0xf171,
            redo2: 0xf172,
            reply: 0xf173,
            search: 0xf174,
            share2: 0xf175,
            shrink: 0xf176,
            shrink2: 0xf177,
            skype: 0xf178,
            spinner: 0xf179,
            spinner2: 0xf17a,
            spinner8: 0xf17b,
            stack: 0xf17c,
            'star-empty': 0xf17d,
            'star-full': 0x17e,
            'star-half': 0x17f,
            stop: 0xf180,
            stop2: 0xf181,
            switch: 0xf182,
            tablet: 0xf183,
            target: 0xf184,
            truck: 0xf185,
            tumblr: 0xf186,
            tumblr2: 0xf187,
            twitter: 0xf188,
            twitter2: 0xf189,
            undo2: 0xf18a,
            unlocked: 0xf18b,
            'user-check': 0xf18c,
            'user-minus': 0xf18d,
            'user-plus': 0xf18e,
            user: 0xf18f,
            vimeo: 0xf190,
            vimeo2: 0xf191,
            'volume-high': 0xf192,
            'volume-low': 0xf193,
            'volume-medium': 0xf194,
            'volume-mute': 0xf195,
            'volume-mute2': 0xf196,
            warning: 0xf197,
            windows: 0xf198,
            windows8: 0xf199,
            wrench: 0xf19a,
            youtube: 0xf19b,
            youtube2: 0xf19c,
            youtube3: 0xf19d,
            youtube4: 0xf19e,
            'zoom-in': 0xf19f,
            'zoom-out': 0xf1a0
          },
          destHtml: 'fonts/',
          font: 'custom-icons',
          stylesheet: 'less',
          templateOptions: {
            baseClass: 'customicon',
            classPrefix: 'customicon-'
          },
          types: 'eot,woff,ttf,svg'
        }
      }
    },

    concat: {
      options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
        stripBanners: false
      },
      bootstrap: {
        src: [
          'js/_custom-detect-breakpoint.js',
          'js/transition.js',
          'js/alert.js',
          'js/button.js',
          'js/carousel.js',
          'js/collapse.js',
          'js/dropdown.js',
          'js/selectable-dropdown.js',
          'js/modal.js',
          'js/_custom-sidetray.js',
          'js/tooltip.js',
          'js/popover.js',
          'js/scrollspy.js',
          'js/tab.js',
          'js/affix.js',
          'js/_custom-affix.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        compress: {
          warnings: false
        },
        mangle: true,
        preserveComments: /^!|@preserve|@license|@cc_on/i
      },
      core: {
        src: '<%= concat.bootstrap.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      },
      customize: {
        src: configBridge.paths.customizerJs,
        dest: 'docs/assets/js/customize.min.js'
      },
      docsJs: {
        src: configBridge.paths.docsJs,
        dest: 'docs/assets/js/docs.min.js'
      }
    },

    qunit: {
      options: {
        inject: 'js/tests/unit/phantom.js'
      },
      files: 'js/tests/index.html'
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: 'less/bootstrap.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      },
      compileTheme: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>-theme.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>-theme.css.map'
        },
        src: 'less/theme.less',
        dest: 'dist/css/<%= pkg.name %>-theme.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: configBridge.config.autoprefixerBrowsers
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>.css'
      },
      theme: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>-theme.css'
      },
      docs: {
        src: ['docs/assets/css/src/docs.css']
      },
      examples: {
        expand: true,
        cwd: 'docs/examples/',
        src: ['**/*.css'],
        dest: 'docs/examples/'
      }
    },

    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      dist: [
        'dist/css/bootstrap.css',
        'dist/css/bootstrap-theme.css'
      ],
      examples: [
        'docs/examples/**/*.css'
      ],
      docs: {
        options: {
          ids: false,
          'overqualified-elements': false
        },
        src: 'docs/assets/css/src/docs.css'
      }
    },

    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        // compatibility: 'ie8',
        compatibility: true,
        keepSpecialComments: '*',
        sourceMap: true,
        sourceMapInlineSources: true,
        advanced: false
      },
      minifyCore: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      },
      minifyTheme: {
        src: 'dist/css/<%= pkg.name %>-theme.css',
        dest: 'dist/css/<%= pkg.name %>-theme.min.css'
      },
      docs: {
        src: [
          'docs/assets/css/ie10-viewport-bug-workaround.css',
          'docs/assets/css/src/pygments-manni.css',
          'docs/assets/css/src/docs.css'
        ],
        dest: 'docs/assets/css/docs.min.css'
      },
      minifyDist: {
        options: {
          advanced: true
        },
        files: [
          {
            expand: true,
            cwd: 'dist/css',
            src: ['**/*.min.css'],
            dest: 'dist/css',
            ext: '.min.css'
          }
        ]
      }
    },

    cssmetrics: {
      options: {
        maxSelectors: 4096
      },
      dist: {
        src: [
          'dist/css/<%= pkg.name %>.min.css'
        ]
      }
    },

    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      },
      examples: {
        expand: true,
        cwd: 'docs/examples/',
        src: '**/*.css',
        dest: 'docs/examples/'
      },
      docs: {
        src: 'docs/assets/css/src/docs.css',
        dest: 'docs/assets/css/src/docs.css'
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: 'fonts/**',
        dest: 'dist/'
      },
      docs: {
        expand: true,
        cwd: 'dist/',
        src: [
          '**/*'
        ],
        dest: 'docs/dist/'
      },
      images: {
        expand: true,
        src: ['images/*', 'images/*/*'],
        dest: 'dist/'
      }
    },

    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        incremental: false
      },
      docs: {},
      github: {
        options: {
          raw: 'github: true'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          decodeEntities: false,
          minifyCSS: {
            compatibility: 'ie8',
            keepSpecialComments: 0
          },
          minifyJS: true,
          minifyURLs: false,
          processConditionalComments: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeOptionalAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeTagWhitespace: false,
          sortAttributes: true,
          sortClassName: true
        },
        expand: true,
        cwd: '_gh_pages',
        dest: '_gh_pages',
        src: [
          '**/*.html',
          '!examples/**/*.html'
        ]
      }
    },

    pug: {
      options: {
        pretty: true,
        data: getLessVarsData
      },
      customizerVars: {
        src: 'docs/_pug/customizer-variables.pug',
        dest: 'docs/_includes/customizer-variables.html'
      },
      customizerNav: {
        src: 'docs/_pug/customizer-nav.pug',
        dest: 'docs/_includes/nav/customize.html'
      }
    },

    htmllint: {
      options: {
        ignore: [
          'Attribute "autocomplete" not allowed on element "button" at this point.',
          'Attribute "autocomplete" is only allowed when the input type is "color", "date", "datetime", "datetime-local", "email", "hidden", "month", "number", "password", "range", "search", "tel", "text", "time", "url", or "week".',
          'Element "img" is missing required attribute "src".'
        ]
      },
      src: '_gh_pages/**/*.html'
    },

    watch: {
      src: {
        files: '<%= jshint.core.src %>',
        tasks: ['jshint:core', 'qunit', 'concat']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      less: {
        files: 'less/**/*.less',
        tasks: 'less'
      }
    },

    'saucelabs-qunit': {
      all: {
        options: {
          build: process.env.TRAVIS_JOB_ID,
          throttled: 10,
          maxRetries: 3,
          maxPollRetries: 4,
          urls: ['http://127.0.0.1:3000/js/tests/index.html?hidepassed'],
          browsers: grunt.file.readYAML('grunt/sauce_browsers.yml')
        }
      }
    },

    exec: {
      npmUpdate: {
        command: 'npm update'
      }
    },

    compress: {
      main: {
        options: {
          archive: 'bootstrap-<%= pkg.version %>-dist.zip',
          mode: 'zip',
          level: 9,
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: 'bootstrap-<%= pkg.version %>-dist'
          }
        ]
      }
    }

  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll:docs', 'htmllint']);

  var runSubset = function (subset) {
    return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset;
  };
  var isUndefOrNonZero = function (val) {
    return val === undefined || val !== '0';
  };

  // Test task.
  var testSubtasks = [];
  // Skip core tests if running a different subset of the test suite
  if (runSubset('core') &&
      // Skip core tests if this is a Savage build
      process.env.TRAVIS_REPO_SLUG !== 'twbs-savage/bootstrap') {
    testSubtasks = testSubtasks.concat(['dist-css', 'dist-js', 'csslint:dist', 'test-js', 'docs']);
  }
  // Skip HTML validation if running a different subset of the test suite
  if (runSubset('validate-html') &&
      // Skip HTML5 validator on Travis when [skip validator] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_VALIDATOR)) {
    testSubtasks.push('validate-html');
  }
  // Only run Sauce Labs tests if there's a Sauce access key
  if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined' &&
      // Skip Sauce if running a different subset of the test suite
      runSubset('sauce-js-unit') &&
      // Skip Sauce on Travis when [skip sauce] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_SAUCE)) {
    testSubtasks.push('connect');
    testSubtasks.push('saucelabs-qunit');
  }
  grunt.registerTask('test', testSubtasks);
  grunt.registerTask('test-js', ['jshint:core', 'jshint:test', 'jshint:grunt', 'jscs:core', 'jscs:test', 'jscs:grunt', 'qunit']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify:core', 'commonjs']);

  // CSS selector count of distribution minified CSS file.
  grunt.registerTask('css-count', ['cssmetrics:dist']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore', 'less:compileTheme']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:core', 'autoprefixer:theme', 'csscomb:dist', 'cssmin:minifyCore', 'cssmin:minifyTheme', 'css-count', 're-dist-css']);

  // Re-minify dist files to reduce filesize from duplicate selectors
  grunt.registerTask('re-dist-css', ['cssmin:minifyDist', 'css-count']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'dist-css', 'webfont', 'copy:fonts', 'copy:images', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'copy:fonts', 'copy:images', 'test']);

  grunt.registerTask('build-customicons-data', function () { generateCustomiconsData.call(this, grunt); });

  // task for building customizer
  grunt.registerTask('build-customizer', ['build-customizer-html', 'build-raw-files']);
  grunt.registerTask('build-customizer-html', 'pug');
  grunt.registerTask('build-raw-files', 'Add scripts/less files to customizer.', function () {
    var banner = grunt.template.process('<%= banner %>');
    generateRawFiles(grunt, banner);
  });

  grunt.registerTask('commonjs', 'Generate CommonJS entrypoint module in dist dir.', function () {
    var srcFiles = grunt.config.get('concat.bootstrap.src');
    var destFilepath = 'dist/js/npm.js';
    generateCommonJSModule(grunt, srcFiles, destFilepath);
  });

  // Docs task.
  grunt.registerTask('docs-css', ['autoprefixer:docs', 'autoprefixer:examples', 'csscomb:docs', 'csscomb:examples', 'cssmin:docs']);
  grunt.registerTask('lint-docs-css', ['csslint:docs', 'csslint:examples']);
  grunt.registerTask('docs-js', ['uglify:docsJs', 'uglify:customize']);
  grunt.registerTask('lint-docs-js', ['jshint:assets', 'jscs:assets']);
  grunt.registerTask('docs', ['docs-css', 'lint-docs-css', 'docs-js', 'lint-docs-js', 'clean:docs', 'copy:docs', 'build-customicons-data', 'build-customizer']);
  grunt.registerTask('docs-github', ['jekyll:github', 'htmlmin']);

  grunt.registerTask('prep-release', ['dist', 'docs', 'docs-github', 'compress']);
};
