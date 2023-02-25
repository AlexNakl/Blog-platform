// Articles
export const getArticles = (state) => state.articles.articles;
export const getArticlesCount = (state) => state.articles.articlesCount;
export const getUsePage = (state) => state.articles.usePage;
export const getPageSize = (state) => state.articles.pageSize;

// Article
export const getArticle = (state) => state.article.article;

// Status
export const getIsLoading = (state) => state.status.isLoading;
export const getError = (state) => state.status.error;
