import type { APIRoute } from 'astro'
import db from '../../../lib/tursoDb'

export const PUT: APIRoute = async ({ request, params }) => {
  const { id } = params
  const data = await request.json()

  try {
    const completedBool = +data.completed

    if (id === undefined) {
      throw new Error('ID is undefined')
    }

    await db.execute({
      sql: `UPDATE daily_habits SET completed = ? WHERE id = ?`,
      args: [completedBool, id],
    })

    return new Response(JSON.stringify({ success: true, id: `${id}` }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 })
  }
}
