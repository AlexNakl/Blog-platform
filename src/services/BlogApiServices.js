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
          throw new Error(`Код ${response.status}: Не достаточно прав.`);
        case 404:
          throw new Error(
            `Код ${response.status}: Ресурс не найден или не доступен. Проверьте подключение к интернету.`
          );
        case 422:
          throw new Error(`Код ${response.status}: Неожиданная ошибка.`);
        default:
          throw new Error(`Код ${response.status}: Что-то пошло не так.`);
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
            `Код ${response.status}: Ресурс не найден или не доступен. Проверьте подключение к интернету.`
          );
        case 422:
          throw new Error(`Код ${response.status}: Неожиданная ошибка.`);
        default:
          throw new Error(`Код ${response.status}: Что-то пошло не так.`);
      }
    }

    const body = await response.json();

    return body;
  }
}
