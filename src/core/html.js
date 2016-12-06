/**
 * 处理html文档
 */
import cheerio from 'cheerio';
import _ from 'lodash';
import {baseUrl} from './enum';

function html(doc) {
    const $ = cheerio.load(doc);
    return $;
}

function getLists(doc) {
    const $ = html(doc);
    const $list = $('.TabCss dl>dd');
    const lists = [];
    _.forEach($list, item => {
        const $item = $(item).find('a');
        lists.push({
            name: $item.text(),
            href: baseUrl + $item.attr('href'),
        })
    });
    return new Promise(resolve => {
        resolve(lists);
    });
}

export {
    getLists,
};