/* eslint-disable no-unused-vars */
interface PayloadUser {
  i: number
  n: string
  e: string
  ri: number
  rn: string
  scope: string
  t: string
}

declare namespace Express {
  interface Request {
    auth: PayloadUser
  }
}
