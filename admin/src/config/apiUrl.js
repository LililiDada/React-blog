const ipurl = 'http://127.0.0.1:8268/admin/';

let servicePath = {
    getTypeInfo:ipurl+'getTypeInfo',  //获取文章类别信息
    login:ipurl+'login',   //登录
    addArticle: ipurl+'addArticle',   //添加文章
    getArticleList: ipurl+'getArticleList/',   //文章列表
    delArticle: ipurl+'delArticle/',   //删除文章
    ArticleListNum:7,  //文章列表一次加载7篇文章
    getArticleById:ipurl+'getArticleById/',
    updateArticle: ipurl+'updateArticle',   //修改文章
    getAboutMe: ipurl+'getAboutMe/',   //修改文章
    delAbout:ipurl+'delAbout/',    // 删除“关于”记录
    addAbout:ipurl+'addAbout',     // 添加“关于”记录
    updateAbout:ipurl+'updateAbout',     // 修改“关于”记录
}

export default servicePath;