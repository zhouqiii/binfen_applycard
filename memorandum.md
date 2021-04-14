# BINFEN_BASE

#### H5适配方法--rem
1.根据网页的根元素来设置字体大小，和 em的区别是，em 是根据其父元素的字体大小来设置，而 rem 是根据网页的跟元素（html）来设置字体大小的,rem 不仅可以适用于字体，同样可以用于 width height margin 这些样式的单位
html {
    font-size:16px;
}
p {
    font-size: 0.75rem; //12÷16=0.75（rem）
}
2.为了方便起见，可以将 html 的 font-size 设置成 100px，这样在写单位时，直接将数值除以 100 在加上 rem 的单位就可以了。
3.现在关键问题来了，我们该如何通过不同的屏幕去动态设置 html 的 font-size 呢，这里一般分为两种办法

    (1)利用 css 的 media query 来设置即--写在一个公共style里，在main.js里引入即可全局使用
        @media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
            html{font-size: 37.5px;}
        }
    (2)利用 javascript 来动态设置 根据我们之前算出的基准值，我们可以利用 js 动态算出当前屏幕所适配的 font-size 即：
        document.getElementsByTagName('html')[0].style.fontSize = window.innerWidth / 10 + 'px';
4.当用作图片或者一些不能缩放的展示时，必须要使用固定的 px 值，因为缩放可能会导致图片压缩变形等。

#### Software Architecture
Software architecture description

#### Installation

1.  xxxx
2.  xxxx
3.  xxxx

#### Instructions

1.  xxxx
2.  xxxx
3.  xxxx

#### Contribution

1.  Fork the repository
2.  Create Feat_xxx branch
3.  Commit your code
4.  Create Pull Request


#### Gitee Feature

1.  You can use Readme\_XXX.md to support different languages, such as Readme\_en.md, Readme\_zh.md
2.  Gitee blog [blog.gitee.com](https://blog.gitee.com)
3.  Explore open source project [https://gitee.com/explore](https://gitee.com/explore)
4.  The most valuable open source project [GVP](https://gitee.com/gvp)
5.  The manual of Gitee [https://gitee.com/help](https://gitee.com/help)
6.  The most popular members  [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
