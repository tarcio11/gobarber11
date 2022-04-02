export interface Execute {
  execute: (request: any) => Promise<Response>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Response = any
