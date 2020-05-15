# jueJin-Search
掘金（https://juejin.im ）上的用户产出了很多有质量的文章，但官方的搜索似乎不那么好用，此工具基于掘金自有的搜索接口，创建一个中间层来过滤出“相对“高质量的搜索结果，提供更好的搜索能力和更有效的搜索。

例如搜索技术相关关键词，‘前端’，‘后端’，‘Java’，‘MongoDB’，‘ES6’，‘three.js’等，即可拿到社区内相关且内容质量相对较高的文章，方便搜索相关教程/资料（对比直接在搜索引擎盲搜或用官方的搜索工具，可能此搜索可以提高获取资料的效率）。

# Usage

首先保证电脑已存在 node10.0+ 环境，然后

1.拉取本项目

```
git clone https://github.com/ZY2071/JueJin-Search.git
cd JueJin-Search
npm i
node index.js
```

2.或者下载本项目压缩包，解压

```
cd JueJin-Search-master  // 进入项目文件夹
npm i
node index.js
```

# Examples

当启动项目后，可以看到控制台输出

```
Listening on port 3000!
```

之后用浏览器或双击打开根目录下的 jueJinSearch.html 文件

稍微等待即可使用搜索功能
