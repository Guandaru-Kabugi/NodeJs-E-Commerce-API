export function mapDbError(err) {
  switch (err.code) {
    case "23502": // NOT NULL violation
      // err.column gives you the column name e.g. "image_url"
      return `Missing required field: ${err.column}`;

    case "23505": // Unique constraint violation
      return `A record with that value already exists.`;

    case "23503": // Foreign key violation
      return `Referenced record does not exist.`;

    case "22P02": // Invalid input syntax (e.g. bad UUID)
      return `Invalid input format.`;

    case "42703": // Undefined column
      return `Unknown field in request.`;

    default:
      console.error("Unhandled DB error:", err);
      return "A database error occurred.";
  }
}