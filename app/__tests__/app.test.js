// @ts-check

import {
  describe, beforeAll, expect, test, afterAll
} from '@jest/globals';

import fastify from 'fastify';
import init from '../server/plugin.js';


// TODO: сейчас каждый тест оставляет после себя артефакты в БД
// попытатся использовать транзакции или перед каждым тестом очищать БД

describe('requests', () => {
  let app;

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: 'pino-pretty' },
    });
    await init(app);
  });

  test('GET 200', async () => {
    const res = await app.inject({
      method: 'GET',
      url: app.reverse('root'),
    });
    expect(res.statusCode).toBe(200);
  });

  test('GET 404', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/wrong-path',
    });
    expect(res.statusCode).toBe(404);
  });

  test('show articles - GET /articles', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/articles',
    });

    expect(response.statusCode).toBe(200);
  });

  test('new article - GET /articles/new', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/articles/new',
    });

    expect(response.statusCode).toBe(200);
  });

  test('create article - POST /articles', async () => {
    const newArticleData = {
      title: 'Article 1',
      content: 'Article 1 content',
    };

    const response = await app.inject({
      method: 'POST',
      url: '/articles',
      payload: {
        data: newArticleData,
      },
    });

    expect(response.statusCode).toBe(302);

    const article = await app.db.models.Article.findOne({ where: newArticleData });
    expect(article).not.toBeNull();
  });

  test('edit article - GET /articles/:id', async () => {
    const newArticleData = {
      title: 'Article 2',
      content: 'Article 2 content',
    };

    await app.inject({
      method: 'POST',
      url: '/articles',
      payload: {
        data: newArticleData,
      },
    });

    const newArticle = await app.db.models.Article.findOne({ where: newArticleData });

    const response2 = await app.inject({
      method: 'GET',
      url: `/articles/${newArticle.id}`,
    });

    expect(response2.statusCode).toBe(200);
  });

  test('update article - PATCH /articles/:id', async () => {
    const newArticleData = {
      title: 'Article 3',
      content: 'Article 3 content',
    };

    await app.inject({
      method: 'POST',
      url: '/articles',
      payload: {
        data: newArticleData,
      },
    });

    const newArticle = await app.db.models.Article.findOne({ where: newArticleData });

    const updatedArticleData = {
      title: 'Article updated',
      content: 'Article updated content',
    };

    const response2 = await app.inject({
      method: 'PATCH',
      url: `/articles/${newArticle.id}`,
      payload: {
        data: updatedArticleData,
      },
    });

    expect(response2.statusCode).toBe(302);

    const updatedArticle = await app.db.models.Article.findOne({ where: updatedArticleData });
    expect(updatedArticle).not.toBeNull();
    const article = await app.db.models.Article.findOne({ where: newArticleData });
    expect(article).toBeNull();
  });

  test('delete article - DELETE /articles/:id', async () => {
    const newArticleData = {
      title: 'Article 4',
      content: 'Article 4 content',
    };

    await app.inject({
      method: 'POST',
      url: '/articles',
      payload: {
        data: newArticleData,
      },
    });

    const newArticle = await app.db.models.Article.findOne({ where: newArticleData });

    const response2 = await app.inject({
      method: 'DELETE',
      url: `/articles/${newArticle.id}`,
    });

    expect(response2.statusCode).toBe(302);

    const updatedArticle = await app.db.models.Article.findOne({ where: newArticleData });
    expect(updatedArticle).toBeNull();
  });

  test('show article - GET /articles/:id', async () => {
    const newArticleData = {
      title: 'Article 5',
      content: 'Article 5 content',
    };

    await app.inject({
      method: 'POST',
      url: '/articles',
      payload: {
        data: newArticleData,
      },
    });

    const newArticle = await app.db.models.Article.findOne({ where: newArticleData });

    const response2 = await app.inject({
      method: 'GET',
      url: `/articles/${newArticle.id}`,
    });

    expect(response2.statusCode).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
