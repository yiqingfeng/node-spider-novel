import httpClient from '../api/HttpClient';
import { writeFile } from '../core/fs';
import { baseUrl, outPath } from '../core/enum';
import { getLists } from '../core/html';

function getContents(lists) {
    const arr = [];
    lists.forEach(item => {
        arr.push(item.name + ', ' + item.href);
    });
    console.log('开始写入小说大纲');
    writeFile(`${outPath}contents.txt`, arr.join('\n'))
        .then(() => {
            console.log('小说大纲完成！');
        }).catch(err => {
            console.log(err);
        });
}

function dealArticle(txt) {
    let article = txt.split('<!--go-->')[1];
    article = article.replace(/<!-- 翻页上AD开始 -->/g, '');
    article = article.replace(/<BR>/g, '');
    article = article.replace(/<br>/g, '\n');
    article = article.replace(/&nbsp;/g, ' ');
    return article;
}

function getArticles(lists) {
    lists.forEach((item, index) => {
        // if (index > 1) return;
        // console.log(item);
        httpClient.get(item.href).then(res => {
            console.log(`开始写入${item.name}`);
            writeFile(`${outPath}data/${index}.txt`, item.name + dealArticle(`${res}`))
                .then(() => {
                    console.log(`${item.name} 章节完成！`);
                });
        });
    });
}

function getArticleLists(url) {
    return httpClient.get(url).then(res => {
        return getLists(res);
    });
}

function getData(lists) {
    getContents(lists); // 获取目录大纲
    getArticles(lists); // 获取各个章节
    // httpClient.get(url).then(res => {
    //     getLists(res).then(lists => {
    //         getContents(lists); // 获取目录大纲
    //         getArticles(lists); // 获取各个章节
    //     });
    // });
}

export {
    getArticleLists,
    getData,
};