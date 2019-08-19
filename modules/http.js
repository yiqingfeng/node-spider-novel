/**
 * @description 封装部分 http API
 */
const http = require('http');
const iconv = require('iconv-lite');

exports.get = function (url, type = 'gb2312', max = 5) {
    return new Promise((resolve, reject) => {
        let i = 1;
        const get = () => {
            http.get(url, res => {
                let html = '';
                // 监听data事件，每次取一块数据
                res.on('data', chuck => {
                    html += iconv.decode(chuck, type);
                });
                // 监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
                res.on('end', () => {
                    resolve && resolve(html);
                });
            }).on('error', e => {
                if (i < max) {
                    get();
                } else {
                    console.log(`${colors.bgRed('Error:')} 请求${max}依然失败`);
                    console.log(`url: ${colors.blue(url)}`, e);
                    reject && reject(e);
                }
            });
        }
        get();
    });
}
