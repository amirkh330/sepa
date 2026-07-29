export const ROUTES = {
  welcome: '/',
  home: '/home',
  stage: (id: string | number) => `/stage/${id}`,
  result: (id: string | number) => `/result/${id}`,
} as const;
