export const isValidDateFormat = (dateString: string) => {
	const regex = /^\d{1,2}-\d{1,2}-\d{4}$/; // Matches dd-mm-yyyy
	return regex.test(dateString);
} 

export const formatDate = (date: Date) => {
	const day = date.getDate(); // Get day
	const month = date.getMonth() + 1; // Get month (0-indexed, so add 1)
	const year = date.getFullYear(); // Get year
	return `${day}-${month}-${year}`; // Format as "d-m-yyyy"
}