const axios = require("axios");
const express = require("express");
var cors = require("cors");
const app = express();

app.use(cors());

function numFilter(item, property, num) {
    return item[property] >= num;
}

function includeTest(item, property, text) {
    return item[property] && item[property].includes(text);
}

function timeFilter(item, property) {
    let time = new Date(new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000).toISOString(); // 半年前的时间戳
    return item[property] > time;
}

function sortList(a, b) {
    return b.node.entity.createdAt > a.node.entity.createdAt ? 1 : -1;
}

function getData(queryKey = "前端", likeNum = 1000) {
    let url = "https://web-api.juejin.im/query";
    let params = {
        extensions: { query: { id: "a53db5867466eddc50d16a38cfeb0890" } },
        operationName: "",
        query: "",
        variables: { type: "ALL", query: queryKey, after: "", period: "ALL", first: 100 }
    };
    return axios
        .post(url, params, {
            headers: { "X-Agent": "Juejin/Web" }
        })
        .then(function(response) {
            let dataArr = response.data.data.search.edges;
            let newInfo = dataArr.filter(
                ({ node: { entity } }) =>
                    timeFilter(entity, "createdAt") &&
                    // includeTest(entity, "title", "前端") &&
                    numFilter(entity, "likeCount", likeNum)
            );
            newInfo.sort(sortList);
            return Promise.resolve(newInfo);
        })
        .catch(function(error) {
            console.log(error);
        });
}

app.get("/", (req, res) => {
    let promise = getData(); // 发起抓取
    promise.then(response => {
        res.json(response); // 数据返回
    });
});
app.get("/:queryKey-:likeNum", (req, res) => {
    const {
        queryKey, // 获取查询关键词
        likeNum // 获取点赞数下限
    } = req.params;
    let promise = getData(queryKey, likeNum); // 发起抓取
    promise.then(response => {
        res.json(response); // 数据返回
    });
});

app.listen(3000, () => console.log("Listening on port 3000!")); // 监听3000端口
