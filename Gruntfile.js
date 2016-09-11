/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2016 The Bootstrap Authors
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
  var isTravis = require('is-travis');

  var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' });

  var generateIconfontData = require('./grunt/bs-icons-data-generator.js');

  Object.keys(configBridge.paths).forEach(function (key) {
    configBridge.paths[key].forEach(function (val, i, arr) {
      arr[i] = path.join('./docs', val);
    });
  });

  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n' +
            ' */\n',
    jqueryCheck: 'if (typeof jQuery === \'undefined\') {\n' +
                 '  throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery\')\n' +
                 '}\n',
    jqueryVersionCheck: '+function ($) {\n' +
                        '  var version = $.fn.jquery.split(\' \')[0].split(\'.\')\n' +
                        '  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {\n' +
                        '    throw new Error(\'Bootstrap\\\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0\')\n' +
                        '  }\n' +
                        '}(jQuery);\n\n',

    // Task configuration.
    clean: {
      dist: 'dist',
      docs: 'docs/dist'
    },

    // JS build configuration
    babel: {
      dev: {
        options: {
          sourceMap: true,
          modules: 'ignore'
        },
        files: {
          'js/dist/util.js'      : 'js/src/util.js',
          'js/dist/alert.js'     : 'js/src/alert.js',
          'js/dist/button.js'    : 'js/src/button.js',
          'js/dist/carousel.js'  : 'js/src/carousel.js',
          'js/dist/collapse.js'  : 'js/src/collapse.js',
          'js/dist/dropdown.js'  : 'js/src/dropdown.js',
          'js/dist/modal.js'     : 'js/src/modal.js',
          'js/dist/scrollspy.js' : 'js/src/scrollspy.js',
          'js/dist/tab.js'       : 'js/src/tab.js',
          'js/dist/tooltip.js'   : 'js/src/tooltip.js',
          'js/dist/popover.js'   : 'js/src/popover.js'
        }
      },
      dist: {
        options: {
          modules: 'ignore'
        },
        files: {
          '<%= concat.bootstrap.dest %>' : '<%= concat.bootstrap.dest %>'
        }
      }
    },

    stamp: {
      options: {
        banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>\n+function ($) {\n',
        footer: '\n}(jQuery);'
      },
      bootstrap: {
        files: {
          src: '<%= concat.bootstrap.dest %>'
        }
      }
    },

    webfont: {
      icon: {
        src: 'svg/iconfonts/*.svg',
        dest: 'fonts/',
        destCss: 'scss/',
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
          font: 'iconfont',
          stylesheet: 'scss',
          templateOptions: {
            baseClass: 'iconfont',
            classPrefix: 'iconfont-'
          },
          types: 'eot,woff,ttf,svg'
        }
      }
    },

    concat: {
      options: {
        // Custom function to remove all export and import statements
        process: function (src) {
          return src.replace(/^(export|import).*/gm, '');
        },
        stripBanners: false
      },
      bootstrap: {
        src: [
          'js/src/util.js',
          'js/src/alert.js',
          'js/src/button.js',
          'js/src/carousel.js',
          'js/src/collapse.js',
          'js/src/dropdown.js',
          'js/src/modal.js',
          'js/src/scrollspy.js',
          'js/src/tab.js',
          'js/src/tooltip.js',
          'js/src/popover.js'
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

    // CSS build configuration
    scsslint: {
      options: {
        bundleExec: true,
        config: 'scss/.scss-lint.yml',
        reporterOutput: null
      },
      core: {
        src: ['scss/*.scss', '!scss/_normalize.scss', '!scss/_iconfont.scss']
      },
      docs: {
        src: ['docs/assets/scss/*.scss', '!docs/assets/scss/docs.scss']
      }
    },

    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        compatibility: 'ie9',
        keepSpecialComments: '*',
        sourceMap: true,
        advanced: false
      },
      core: {
        files: [
          {
            expand: true,
            cwd: 'dist/css',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/css',
            ext: '.min.css'
          }
        ]
      },
      docs: {
        files: [
          {
            expand: true,
            cwd: 'docs/assets/css',
            src: ['*.css', '!*.min.css'],
            dest: 'docs/assets/css',
            ext: '.min.css'
          }
        ]
      }
    },

    copy: {
      docs: {
        expand: true,
        cwd: 'dist/',
        src: [
          '**/*'
        ],
        dest: 'docs/dist/'
      },
      fonts: {
        expand: true,
        cwd: 'fonts/',
        src: [
          '**/*'
        ],
        dest: 'dist/fonts/'
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

    htmllint: {
      options: {
        ignore: [
          'Attribute “autocomplete” is only allowed when the input type is “color”, “date”, “datetime”, “datetime-local”, “email”, “hidden”, “month”, “number”, “password”, “range”, “search”, “tel”, “text”, “time”, “url”, or “week”.',
          'Attribute “autocomplete” not allowed on element “button” at this point.',
          'Consider using the “h1” element as a top-level heading only (all “h1” elements are treated as top-level headings by many screen readers and other tools).',
          'Element “div” not allowed as child of element “progress” in this context. (Suppressing further errors from this subtree.)',
          'Element “img” is missing required attribute “src”.',
          'The “color” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “date” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “datetime” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “datetime-local” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “month” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “time” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.',
          'The “week” input type is not supported in all browsers. Please be sure to test, and consider using a polyfill.'
        ]
      },
      src: ['_gh_pages/**/*.html', 'js/tests/visual/*.html']
    },

    watch: {
      src: {
        files: '<%= concat.bootstrap.src %>',
        tasks: ['babel:dev']
      },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['dist-css', 'docs']
      },
      docs: {
        files: 'docs/assets/scss/**/*.scss',
        tasks: ['dist-css', 'docs']
      }
    },

    'saucelabs-qunit': {
      all: {
        options: {
          build: process.env.TRAVIS_JOB_ID,
          concurrency: 10,
          maxRetries: 3,
          maxPollRetries: 4,
          urls: ['http://127.0.0.1:3000/js/tests/index.html?hidepassed'],
          browsers: grunt.file.readYAML('grunt/sauce_browsers.yml')
        }
      }
    },

    exec: {
      postcss: {
        command: 'npm run postcss'
      },
      'postcss-docs': {
        command: 'npm run postcss-docs'
      },
      htmlhint: {
        command: 'npm run htmlhint'
      },
      'upload-preview': {
        command: './grunt/upload-preview.sh'
      }
    },

    buildcontrol: {
      options: {
        dir: '_gh_pages',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:twbs/derpstrap.git',
          branch: 'gh-pages'
        }
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
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies',
    // Exclude Sass compilers. We choose the one to load later on.
    pattern: ['grunt-*', '!grunt-sass', '!grunt-contrib-sass'] });
  require('time-grunt')(grunt);

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll:docs', 'htmllint', 'exec:htmlhint']);

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
    testSubtasks = testSubtasks.concat(['dist-css', 'dist-js', 'test-scss', 'qunit', 'docs']);
  }
  // Skip HTML validation if running a different subset of the test suite
  if (runSubset('validate-html') &&
      isTravis &&
      // Skip HTML5 validator when [skip validator] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_VALIDATOR)) {
    testSubtasks.push('validate-html');
  }
  // Only run Sauce Labs tests if there's a Sauce access key
  if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined' &&
      // Skip Sauce if running a different subset of the test suite
      runSubset('sauce-js-unit')) {
    testSubtasks = testSubtasks.concat(['dist', 'docs-css', 'docs-js', 'clean:docs', 'copy:docs', 'exec:upload-preview']);
    // Skip Sauce on Travis when [skip sauce] is in the commit message
    if (isUndefOrNonZero(process.env.TWBS_DO_SAUCE)) {
      testSubtasks.push('connect');
      testSubtasks.push('saucelabs-qunit');
    }
  }
  grunt.registerTask('test', testSubtasks);

  // JS distribution task.
  grunt.registerTask('dist-js', ['babel:dev', 'concat', 'babel:dist', 'stamp', 'uglify:core']);

  grunt.registerTask('test-scss', ['scsslint:core']);

  // Webfont data file builder
  grunt.registerTask('build-iconfont-data', function () { generateIconfontData.call(this, grunt); });

  // CSS distribution task.
  // Supported Compilers: sass (Ruby) and libsass.
  (function (sassCompilerName) {
    require('./grunt/bs-sass-compile/' + sassCompilerName + '.js')(grunt);
  })(process.env.TWBS_SASS || 'libsass');
  // grunt.registerTask('sass-compile', ['sass:core', 'sass:extras', 'sass:docs']);
  grunt.registerTask('sass-compile', ['sass:core', 'sass:docs']);

  grunt.registerTask('dist-css', ['sass-compile', 'exec:postcss', 'cssmin:core', 'cssmin:docs']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'dist-css', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'webfont', 'copy:fonts', 'test']);

  // Docs task.
  grunt.registerTask('docs-css', ['cssmin:docs', 'exec:postcss-docs']);
  grunt.registerTask('lint-docs-css', ['scsslint:docs']);
  grunt.registerTask('docs-js', ['uglify:docsJs']);
  grunt.registerTask('docs', ['lint-docs-css', 'docs-css', 'docs-js', 'clean:docs', 'copy:docs', 'build-iconfont-data']);
  grunt.registerTask('docs-github', ['jekyll:github']);

  grunt.registerTask('prep-release', ['dist', 'docs', 'docs-github', 'compress']);

  // Publish to GitHub
  grunt.registerTask('publish', ['buildcontrol:pages']);
};
