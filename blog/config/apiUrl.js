let ipUrl = 'http://127.0.0.1:7001/default/' 

let servicePath = {
    ArticleListNum:9, //首页文章列表一次性加载个数
    getArticleList:ipUrl + 'getArticleList/' ,  //  首页文章列表接口
    getArchiveList:ipUrl + 'getArchiveList' ,  //  归档页面借口哦
    getArticleById:ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
    getAboutList:ipUrl + 'getAboutList',  // 叨叨页面首次加载数据
    pageSize:5,         //叨叨页面加载更多一次加载的总数

}
export default servicePath;