import { baseUrl } from './core/enum';
import { getArticleLists, getData } from './components/getData';
import generate from './components/generate';

let articles = []; // 文章列表

getArticleLists(baseUrl).then(lists => {
    lists.forEach(article => {
        articles.push(article.name);
    });
    getData(lists);// 爬取文章内容
});

// setTimeout(lists => {
//     console.log(lists[0]);
// }, 60000, articles)
// getData(baseUrl); // 爬取文章内容

setTimeout(generate, 60000, articles); // 一分钟后读写获取的数据