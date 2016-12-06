/**
 * Cleans up the output (build) directory.
 */

import del from 'del';
import { makeDir } from './core/fs';

async function clean() {
    await del(['.tmp', 'dist/*'], { dot: true });
    await makeDir('dist/data');
}

export default clean;