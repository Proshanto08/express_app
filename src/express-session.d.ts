import 'express-session';

declare module 'express-session' {
  interface Session {
    distinct_id?: string;
  }
}
