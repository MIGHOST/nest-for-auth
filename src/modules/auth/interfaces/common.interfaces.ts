import { Request } from 'express';

export interface TokenPayload {
  id: string;
  email: string;
  sessionId: string;
}

export interface AuthRequest extends Request {
  user: TokenPayload;
}
