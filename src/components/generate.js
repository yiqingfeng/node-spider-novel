/**
 * 生成最终文件
 */
import path from 'path';
import { outPath } from '../core/enum';
import { appendFileSync, readFileSync } from '../core/fs';

function generate(lists) {
    // console.log(lists);
    lists.forEach((artilce, index) => {
        // if (index > 2) return;
        // console.log('魔天添加章节');
        readFileSync(path.join(`${outPath}data/${index}.txt`)).then(artilce => {
            appendFileSync(path.join(`${outPath}魔天.txt`), artilce);
        });
    });
}

export default generate;