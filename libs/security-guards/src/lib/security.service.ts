import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SecurityService {
  private keycloakId: string | null = null;

  /**
   * Validates an access token based on the provider.
   * @param provider The name of the authentication provider (e.g., "google").
   * @param accessToken The access token to validate.
   * @returns The token data if valid, otherwise throws an exception.
   */
  async validateToken(provider: string, accessToken: string): Promise<any> {
    switch (provider.toLowerCase()) {
      case 'google':
        return this.validateGoogleToken(accessToken);
      default:
        throw new UnauthorizedException(`Unsupported provider: ${provider}`);
    }
  }

  /**
   * Validates a Google OAuth2 access token.
   * @param accessToken The access token to verify.
   * @returns Token info if valid.
   */
  private async validateGoogleToken(accessToken: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
      );
      return response.data;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Stores the Keycloak ID.
   * @param id The Keycloak user ID.
   */
  setKeycloakId(id: string): void {
    this.keycloakId = id;
  }

  /**
   * Retrieves the stored Keycloak ID.
   * @returns The Keycloak user ID or null if not set.
   */
  getKeycloakId(): string | null {
    return this.keycloakId;
  }

  /**
   * Clears the stored Keycloak ID.
   */
  clearKeycloakId(): void {
    this.keycloakId = null;
  }
}
