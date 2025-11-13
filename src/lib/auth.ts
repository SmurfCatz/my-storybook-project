// src/lib/auth.ts
declare global {
  // eslint-disable-next-line no-var
  var CURRENT_USER_ID: string | undefined;
}

export const CURRENT_USER_ID = globalThis.CURRENT_USER_ID ?? '1';