const suggestions = [
  {
    mood_id: '1',
    name: 'Note',
    image: '/images/suggestions/note.png',
    description: 'Write a mood-note!',
    type: 'note',
    is_enabled: 'true',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO suggestions ${sql(
    suggestions,
    'mood_id',
    'name',
    'image',
    'description',
    'type',
    'is_enabled',
  )}
	`;
};

exports.down = async (sql) => {
  await sql`
	TRUNCATE suggestions;
	`;

  await sql`
ALTER SEQUENCE suggestions_id_seq RESTART WITH 1
`;
};
