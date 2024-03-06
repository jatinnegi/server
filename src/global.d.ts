interface JWTUser {
  id: string;
}

namespace Express {
  interface Request {
    context: Context;
  }
}

namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: number;
    MONGODB_URI: string;
    ACCESS_TOKEN_SECRET: string;
  }
}
