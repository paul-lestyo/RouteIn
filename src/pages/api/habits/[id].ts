import type { APIRoute } from 'astro'
import db from '../../../lib/tursoDb'

export const PUT: APIRoute = async ({ request, params }) => {
  const { id } = params
	const data = await request.json()
	
	try {
		const completedBool = +data.completed
		let query = "UPDATE habit SET"
		let args = []

		if(data.name) {
			query += " name = ?" 
			args.push(data.name)
		}

		if(completedBool == 0 || completedBool == 1) {
			query += " completed = ?"
			args.push(completedBool)
		}

		if(data.expValue) {
			query += " expValue = ?"
			args.push(data.expValue)
		}

		args.push(id)
		await db.execute({
			sql: `${query} WHERE id = ?`,
			args: args
		})
	
		return new Response(JSON.stringify({ success: true, id: `${id}` }), { status: 200 })
	} catch (error) {
		return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 })
	}
}

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params

  // Logika untuk menghapus habit berdasarkan ID
  return new Response(JSON.stringify({ message: `Habit ${id} deleted` }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
