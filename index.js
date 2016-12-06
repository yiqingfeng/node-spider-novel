'use strict';

require('shelljs/global');

if (!which('npm')) {
    echo('Sorry, this script requires npm');
    exit(1);
}

if (exec('npm run dev').code !== 0) {
    echo('Error: npm task failed!');
    exit(1);
}