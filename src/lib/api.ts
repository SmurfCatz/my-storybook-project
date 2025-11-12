// src/lib/api.ts
export const GRAPHQL_ENDPOINT = 
  import.meta.env.STORYBOOK === 'true' 
    ? 'http://localhost:4001/graphql'
    : 'http://localhost:4000/graphql';