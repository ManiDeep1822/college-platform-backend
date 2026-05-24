import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

interface TokenPayload {
  id: string;
}

export const getUserFromToken = (authHeader: string | null) => {
  console.log(authHeader);

  if (!authHeader) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];

  console.log(token);

  if (!token) {
    throw new Error("Invalid token");
  }

  const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

  return decoded;
};
