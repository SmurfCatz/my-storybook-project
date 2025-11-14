// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';
import { GRAPHQL_ENDPOINT } from '../lib/api';
import { mockBlogs } from './mockData';

export const handlers = [
  http.post(GRAPHQL_ENDPOINT, async ({ request }) => {
    console.log('MSW intercepted:', request.url); // ต้องเห็น log นี้
    return HttpResponse.json({
      data: { blogs: mockBlogs },
    });
  }),
];

export const loadingThenSuccessHandler = http.post(
  GRAPHQL_ENDPOINT,
  async () => {
    await delay(3000);
    return HttpResponse.json({ data: { blogs: mockBlogs } });
  }
);