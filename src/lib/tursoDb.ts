import { createClient } from '@libsql/client/web'

const db = createClient({
  url: import.meta.env.TURSO_DB_URL,
  authToken: import.meta.env.TURSO_DB_AUTH_TOKEN,
})

export default db
