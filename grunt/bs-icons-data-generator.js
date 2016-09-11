/*!
 * Bootstrap Grunt task for iconfont data generation
 * http://getbootstrap.com
 * Copyright 2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
'use strict';
var fs = require('fs');

module.exports = function generateIconfontData(grunt) {
  // Pass encoding, utf8, so `readFileSync` will return a string instead of a
  // buffer
  var iconfontFile = fs.readFileSync('scss/_iconfont.scss', 'utf8');
  var iconfontLines = iconfontFile.split('\n');

  // Use any line that starts with ".customicon-" and capture the class name
  var iconClassName = /^\.(iconfont-[a-zA-Z0-9-_]+)/;
  var iconfontData = '# This file is generated via Grunt task. **Do not edit directly.**\n' +
                       '# See the \'build-iconfont-data\' task in Gruntfile.js.\n\n';
  var iconfontYml = 'docs/_data/iconfont.yml';
  for (var i = 0, len = iconfontLines.length; i < len; i++) {
    var match = iconfontLines[i].match(iconClassName);

    if (match !== null) {
      iconfontData += '- ' + match[1] + '\n';
    }
  }

  // Create the `_data` directory if it doesn't already exist
  if (!fs.existsSync('docs/_data')) {
    fs.mkdirSync('docs/_data');
  }

  try {
    fs.writeFileSync(iconfontYml, iconfontData);
  }
  catch (err) {
    grunt.fail.warn(err);
  }
  grunt.log.writeln('File ' + iconfontYml.cyan + ' created.');
};
