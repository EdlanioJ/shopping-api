export class InvaildEmailOrPasswordError extends Error {
  constructor() {
    super('Invalid email or password')
  }
}
