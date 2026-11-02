import { Injectable } from '@nestjs/common';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseService {
  private readonly app;

  constructor() {
    // TODO: Try this with default credential lookup. Set up fallback for local dev.
    this.app = initializeApp();
  }

  verifyIdToken(token: string): Promise<DecodedIdToken> {
    return getAuth(this.app).verifyIdToken(token);
  }
}