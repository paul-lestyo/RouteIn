import type { APIRoute } from 'astro'
import db from '../../../lib/tursoDb'
import { formatDate, isValidDateFormat } from '../../../utils/dateUtils';

export const GET: APIRoute = async ({ url }) => {

  try {
		const dateHabit = url.searchParams.get('date')
		console.log(dateHabit);
		
		const dateToUse = dateHabit && isValidDateFormat(dateHabit) ? new Date(dateHabit) : new Date();
		const formattedDate = formatDate(dateToUse);
		console.log(formattedDate);
		
    const result = await db.execute({
			sql: 'SELECT * FROM habits INNER JOIN daily_habits ON habits.id == daily_habits.habit_id WHERE daily_habits.date = ?',
			args: [formattedDate],
		})
    return new Response(JSON.stringify(result.rows), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 })
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()
    const result = await db.execute({
      sql: 'INSERT INTO habits (name, expValue) VALUES (?, ?)',
      args: [data.name, data.expValue],
    })
    return new Response(JSON.stringify({ success: true, id: `${result.lastInsertRowid}` }), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 })
  }
}

// try {
//   const body = await request.json();
//   const { action, data } = body;

// let result;
// switch (action) {
//   case 'create':
//     result = await db.execute({
// 			sql: 'INSERT INTO habittracker (name, description, frequency, startDate) VALUES (?, ?, ?, ?)',
// 			args: [data.name, data.description, data.frequency, data.startDate]
// 		});
//     return new Response(JSON.stringify({ success: true, id: result.lastInsertRowId }), { status: 201 });

//   case 'read':

//   case 'update':
//     result = await db.execute(
//       'UPDATE habittracker SET name = ?, description = ?, frequency = ?, startDate = ? WHERE id = ?',
//       [data.name, data.description, data.frequency, data.startDate, data.id]
//     );
//     return new Response(JSON.stringify({ success: true }), { status: 200 });

//   case 'delete':
//     result = await db.execute('DELETE FROM habittracker WHERE id = ?', [data.id]);
//     return new Response(JSON.stringify({ success: true }), { status: 200 });

//   default:
//     return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
// }
// } catch (error) {
// return new Response(JSON.stringify({ error: error.message }), { status: 500 });
// }
