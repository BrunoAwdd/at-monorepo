export interface UserProvider {
  getClientBySub(sub: string): Promise<any>;
}
