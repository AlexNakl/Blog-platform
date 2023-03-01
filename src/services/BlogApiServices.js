export default class BlogApiServices {
  baseUrl = new URL('https://blog.kata.academy');

  async getArticlesGlobally(limit = 5, offset = 0) {
    const urlArticlesGlobally = new URL('/api/articles', this.baseUrl);
    const queries = {
      limit,
      offset,
    };
    const params = new URLSearchParams(queries);
    urlArticlesGlobally.search = params.toString();

    const response = await fetch(urlArticlesGlobally);

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error(`Code ${response.status}: Unauthorized.`);
        case 404:
          throw new Error(
            `Code ${response.status}: Resource not found or not available. Try check your internet connection.`
          );
        case 422:
          throw new Error(`Code ${response.status}: Unexpected error.`);
        default:
          throw new Error(`Code ${response.status}: Something went wrong.`);
      }
    }

    const body = await response.json();

    return body;
  }

  async getArticle(slug) {
    const urlArticleSlug = new URL(`/api/articles/${slug}`, this.baseUrl);
    const response = await fetch(urlArticleSlug);

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(
            `Code ${response.status}: Resource not found or not available. Try check your internet connection.`
          );
        case 422:
          throw new Error(`Code ${response.status}: Unexpected error.`);
        default:
          throw new Error(`Code ${response.status}: Something went wrong.`);
      }
    }

    const body = await response.json();

    return body;
  }

  async getProfileUser(userName) {
    const urlProfileUser = new URL(`/api/profiles/${userName}`, this.baseUrl);
    const response = await fetch(urlProfileUser);

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error(`Code ${response.status}: Unauthorized.`);
        case 404:
          throw new Error(
            `Code ${response.status}: Resource not found or not available. Try check your internet connection.`
          );
        case 422:
          throw new Error(`Code ${response.status}: Unexpected error.`);
        default:
          throw new Error(`Code ${response.status}: Something went wrong.`);
      }
    }

    const body = await response.json();

    return body;
  }
}
