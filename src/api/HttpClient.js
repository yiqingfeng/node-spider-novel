import http from 'http';
import iconv from 'iconv-lite';

const HttpClient = {
    get: path => new Promise((resolve, reject) => {
        http.get(path, res => {
            let html = '';
            // 监听data事件，每次取一块数据
            res.on('data', chuck => {
                html += iconv.decode(chuck, 'gb2312');
            });
            // 监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
            res.on('end', () => {
                resolve(html);
            });
        }).on('error', err => {
            reject(err);
        });
    }),
};

export default HttpClient;