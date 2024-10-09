import type { APIRoute } from 'astro'
import db from '../../../lib/tursoDb'
import { formatDate, isValidDateFormat, parseDate } from '../../../utils/dateUtils'
import type { Value } from '@libsql/client'

export const GET: APIRoute = async ({ url }) => {
	try {
		const dateHabit = url.searchParams.get('date');
		const dateToUse = dateHabit && isValidDateFormat(dateHabit) ? parseDate(dateHabit) : new Date();
		const formattedDate = formatDate(dateToUse);
		let result = await db.execute({
			sql: `SELECT * FROM daily_habits INNER JOIN habits ON daily_habits.habit_id = habits.id WHERE daily_habits.date = ?`,
			args: [formattedDate],
		});

		if(result.rows.length == 0) {
			const habits = await db.execute(`SELECT * FROM habits`);
			const habitIds = habits.rows.map(row => row.id);
			await createBatchHabitToday(habitIds, formattedDate);

			result = await db.execute({
				sql: `SELECT * FROM daily_habits INNER JOIN habits ON daily_habits.habit_id = habits.id WHERE daily_habits.date = ?`,
				args: [formattedDate],
			});
		}

		return new Response(JSON.stringify(result.rows), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
	}
};

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

export const createBatchHabitToday = async (idRows: Value[], dateString: string) => {
	try {
			const insertValues = idRows.map(id => `(${id}, '${dateString}', 0)`).join(', ');
			const result = await db.execute(`INSERT INTO daily_habits (habit_id, date, completed) VALUES ${insertValues}`);
			return result.rowsAffected

	} catch (error) {
			console.error('Error creating batch habits:', error);
			throw new Error((error as Error).message);
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
