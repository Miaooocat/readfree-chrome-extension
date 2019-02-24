# 豆瓣ReadFree传送门

“豆瓣读书”页面到ReadFree电子书的传送门

### <a href="https://chrome.google.com/webstore/detail/%E8%B1%86%E7%93%A3readfree%E4%BC%A0%E9%80%81%E9%97%A8/nnijmebffagpcclklhofdkjeimnmckjp?hl=en&gl=CN" target="_blank">到Chrome Web Store下载</a>

## 问题反馈

如遇到插件相关问题（而不是ReadFree网站相关问题），可以在[issue](https://github.com/Ovilia/readfree-chrome-extension/issues)中提问，或者邮件至me at zhangwenli.com。

## 功能简介

ReadFree（ http://readfree.me/ ）是超好用的电子书分享平台，在这里能找到很多适合在Kindle上阅读的mobi等格式的电子书。

本插件能够让你在“豆瓣读书”页面点击一个按钮，直接传送到 ReadFree 页面。可以在亚马逊图书详情页、京东图书详情页看到豆瓣评分，在选购书籍时作为一种有价值的参考。

## 关于插件作者

本插件的作者是独立前端交互师；
她的主页： http://zhangwenli.com
她的豆瓣： http://www.douban.com/people/ovilia1024
她的微博： http://weibo.com/plainjane
欢迎造访交流！

如果你想打赏她一本书的话，请戳这里： http://zhangwenli.com/blog/tip/

## 截图

![](https://github.com/Ovilia/readfree-chrome-extension/raw/master/res/screenshot-0-1.png)
![](https://github.com/Ovilia/readfree-chrome-extension/raw/master/res/screenshot-1.png)
![](https://github.com/Ovilia/readfree-chrome-extension/raw/master/res/screenshot-2.png)
![](https://github.com/Ovilia/readfree-chrome-extension/raw/master/res/screenshot-3.png)
![](https://github.com/Ovilia/readfree-chrome-extension/raw/master/res/screenshot-4.png)
![](https://github.com/Ovilia/readfree-chrome-extension/raw/master/res/screenshot-5.png)

## 下载地址

### <a href="https://chrome.google.com/webstore/detail/%E8%B1%86%E7%93%A3readfree%E4%BC%A0%E9%80%81%E9%97%A8/nnijmebffagpcclklhofdkjeimnmckjp?hl=en&gl=CN" target="_blank">到Chrome Web Store下载</a>

## 更新日志

### v2.9.3

2019.02.24

- 修复 ReadFree 接口更新引起的不显示问题
- 显示 ReadFree 文件后缀名

### v2.9.2

2019.02.20

- 修复 ReadFree 登录问题引起的不显示问题

### v2.9.1

2019.01.25

- 修复 ReadFree 网站 HTTPS 引起的内容不显示问题

### v2.9

2018.07.28

- 新增京东图书详情页豆瓣评分显示
- 修复亚马逊图书不显示豆瓣评分的问题

### v2.6, v2.8

（为什么没有 v2.7 ？因为我不会数数……）

2016.09.30

- 优化亚马逊图书的识别算法

### v2.5

2016.09.27

- 新增亚马逊电子书的豆瓣评分

### v2.4

2016.09.27

- 新增在亚马逊图书页面的豆瓣评分
- 修改在亚马逊图书页面的链接样式

### v2.3

2016.05.05

- 修复在https链接下不能使用的问题
- 增加缓存，减少网络访问，提高部分加载速度

### v2.2

2015.12.14

- 修复豆瓣推荐、分类浏览等页面“加载更多”时的链接

### v2.0

2015.12.08

- 豆瓣页面链接的样式改进，和豆瓣风格趋近
- 亚马逊书籍详情页面到 ReadFree 的链接

### v1.5

2015.01.28

- 新增个人页面图书图片的 ReadFree 链接

### v1.4

2014.12.17

- 豆瓣首页、用户主页、用户广播页面等（ http://www.douban.com ）全面支持 ReadFree 链接
- 修复豆瓣读书书籍详情页面多个超链接的问题

### v1.3.2

2014.11.19

- 豆瓣读书豆瓣猜在删除某本书后仍可以重新查看 ReadFree 链接

### v1.3.1

2014.11.09

- 重大更新！只要 ReadFree 上存在，豆瓣阅读的所有页面都能看到啦！



## 如果你不能访问Chrome Web Store

（以下方法是仅适用于Chrome Web Store无法访问时的临时解决方法，每次打开浏览器可能都会被Chrome询问是否需要移除。从 v2.9.0 版本起，不再更新这个列表，原先的版本仍然可以用。）

1. 在<a href="https://github.com/Ovilia/readfree-chrome-extension/tree/master/download">download文件夹</a>选择版本号最大的文件下载
2. 打开Chrome，菜单->工具->扩展程序
3. 将已下载的crx文件拖入Chrome窗口
4. 打开一个豆瓣读书页面（如： http://book.douban.com/subject/4010969/ ），如果左侧没有出现`ReadFree!`按钮，则表示该书没有在ReadFree网站出现。

### Firefox 版本

非常感谢 <a href="https://github.com/JiajunW" target="_blank">Jiajun</a> 提供了 User Script 版本，因此使用 Firefox 的读者也可以使用该插件了！ <a href="https://github.com/JiajunW/douban2readfree" target="_blank">查看GitHub源码</a>

（注意在 User Script 上的版本已停止更新，只提供基本功能。请尽可能使用 Chrome Extension）

1. 安装 <a href="https://addons.mozilla.org/en-UgS/firefox/addon/greasemonkey/" target="_blank">Greasemonkey</a>
2. 在 <a href="https://greasyfork.org/zh-CN/scripts/4905-%E8%B1%86%E7%93%A3-readfree-%E4%BC%A0%E9%80%81%E9%97%A8" target="_blank">ReadFree User Script</a> 页面点击“安装脚本”
