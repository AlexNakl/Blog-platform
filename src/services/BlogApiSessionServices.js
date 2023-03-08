export default class BlogApiSessionServices {
  baseUrl = new URL('https://blog.kata.academy');

  async registerNewUser(userData) {
    const urlregisterNewUser = new URL('/api/users', this.baseUrl);

    const response = await fetch(urlregisterNewUser, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: userData }),
    });

    const body = await response.json();

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(
            `Code ${response.status}: Resource not found or not available. Try check your internet connection.`
          );
        case 422:
          return body;
        default:
          throw new Error(`Code ${response.status}: Something went wrong.`);
      }
    }

    return body;
  }

  async login(userData) {
    const urlLogin = new URL('/api/users/login', this.baseUrl);
    const response = await fetch(urlLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: userData }),
    });

    const body = await response.json();

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error(`Code ${response.status}: Unauthorized.`);
        case 404:
          throw new Error(
            `Code ${response.status}: Resource not found or not available. Try check your internet connection.`
          );
        case 422:
          return body;
        default:
          throw new Error(`Code ${response.status}: Something went wrong.`);
      }
    }

    return body;
  }

  async getCurrentlyUser(token) {
    const urlCurrentlyUser = new URL('/api/user', this.baseUrl);
    const response = await fetch(urlCurrentlyUser, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();

    if (!response.ok) {
      switch (response.status) {
        case 401:
          return body;
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

    return body;
  }

  async editProfileUser(token, newUserData) {
    const urlProfileUser = new URL('/api/user', this.baseUrl);
    const response = await fetch(urlProfileUser, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: newUserData }),
    });

    const body = await response.json();

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error(`Code ${response.status}: Unauthorized.`);
        case 404:
          throw new Error(
            `Code ${response.status}: Resource not found or not available. Try check your internet connection.`
          );
        case 422:
          return body;
        default:
          throw new Error(`Code ${response.status}: Something went wrong.`);
      }
    }

    return body;
  }

  async createArticle(token, articleData) {
    const urlCreateArticle = new URL('/api/articles', this.baseUrl);
    const response = await fetch(urlCreateArticle, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ article: articleData }),
    });
    const body = await response.json();

    if (!response.ok) {
      switch (response.status) {
        case 401:
          throw new Error(`Code ${response.status}: Unauthorized.`);
        case 404:
          throw new Error(
            `Code ${response.status}: Resource not found or not available. Try check your internet connection.`
          );
        case 422:
          return body;
        default:
          throw new Error(`Code ${response.status}: Something went wrong.`);
      }
    }

    return body;
  }

  async deleteArticle(token, slug) {
    const urlDeleteArticle = new URL(`/api/articles/${slug}`, this.baseUrl);
    const response = await fetch(urlDeleteArticle, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

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
  }

  async editArticle(token, slug, editData) {
    const urlEditArticle = new URL(`/api/articles/${slug}`, this.baseUrl);
    const response = await fetch(urlEditArticle, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ article: editData }),
    });

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
  }

  async favorite(token, slug) {
    const urlFavoriteArticle = new URL(`/api/articles/${slug}/favorite`, this.baseUrl);
    const response = await fetch(urlFavoriteArticle, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const body = await response.json();

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

    return body;
  }

  async unfavorite(token, slug) {
    const urlUnFavoriteArticle = new URL(`/api/articles/${slug}/favorite`, this.baseUrl);
    const response = await fetch(urlUnFavoriteArticle, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    const body = await response.json();

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

    return body;
  }

  async getArticlesGlobally(limit = 5, offset = 0, token) {
    const urlArticlesGlobally = new URL('/api/articles', this.baseUrl);
    const queries = {
      limit,
      offset,
    };
    const params = new URLSearchParams(queries);
    urlArticlesGlobally.search = params.toString();

    const response = await fetch(urlArticlesGlobally, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

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

  async getArticle(slug, token) {
    const urlArticleSlug = new URL(`/api/articles/${slug}`, this.baseUrl);
    const response = await fetch(urlArticleSlug, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

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
}
