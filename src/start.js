/**
 * 开启整个项目
 */

import run from './run';
import clean from './clean';

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
    await run(clean);
    await new Promise(resolve => {
        require('./main');
    });
}

export default start;