import jwt from "jsonwebtoken";

export const cleanErrors = (errors: any[]): Record<string, string> => {
  const cleanedErrors: Record<string, string> = {};

  for (const error of errors) {
    cleanedErrors[error.path] = error.msg;
  }

  return cleanedErrors;
};

export const getAccessTokenFromHeaders = ({
  authorization,
}: {
  authorization?: string;
}) => {
  const accessToken = authorization?.split(" ")[1];
  return accessToken;
};

export const jwtVerify = (accessToken: string) => {
  const payload = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  ) as JWTUser;
  return payload;
};
