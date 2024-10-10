import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify([]), { status: 200 })
}

export const POST: APIRoute = async () => {
  return new Response(JSON.stringify([]), { status: 200 })
}
