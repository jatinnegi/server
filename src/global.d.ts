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
    PORT: number;
    MONGODB_URI: string;
    ACCESS_TOKEN_SECRET: string;
  }
}
