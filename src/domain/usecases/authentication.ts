export interface Authentication {
  auth(email: string, password): Promise<string>;
}
