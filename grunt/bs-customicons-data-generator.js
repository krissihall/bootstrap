/*!
 * AEO Grunt task for customicons data generation.
 */
'use strict';

var fs = require('fs');

module.exports = function generateCustomiconsData(grunt) {
  // Pass encoding, utf8, so `readFileSync` will return a string instead of a
  // buffer
  var customiconsFile = fs.readFileSync('less/custom-icons.less', 'utf8');
  var customiconsLines = customiconsFile.split('\n');

  // Use any line that starts with ".customicon-" and capture the class name
  var iconClassName = /^\.(customicon-[a-zA-Z0-9-_]+)/;
  var customiconsData = '# This file is generated via Grunt task. **Do not edit directly.**\n' +
                       '# See the \'build-customicons-data\' task in Gruntfile.js.\n\n';
  var customiconsYml = 'docs/_data/customicons.yml';
  for (var i = 0, len = customiconsLines.length; i < len; i++) {
    var match = customiconsLines[i].match(iconClassName);

    if (match !== null) {
      customiconsData += '- ' + match[1] + '\n';
    }
  }

  // Create the `_data` directory if it doesn't already exist
  if (!fs.existsSync('docs/_data')) {
    fs.mkdirSync('docs/_data');
  }

  try {
    fs.writeFileSync(customiconsYml, customiconsData);
  }
  catch (err) {
    grunt.fail.warn(err);
  }
  grunt.log.writeln('File ' + customiconsYml.cyan + ' created.');
};
