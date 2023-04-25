import { Env } from '../pkg/env/env.js'

export const env = {
  port: Env.of('PORT'),
  vtexBaseUrl: Env.of('VTEX_BASE_URL'),
  vtexAppKey: Env.of('VTEX_APP_KEY'),
  vtexAppToken: Env.of('VTEX_APP_TOKEN'),
} satisfies Record<string, Env>
