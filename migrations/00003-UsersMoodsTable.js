const user_moods = [
  {
    id: 1,
    mood_id: 1,
    type: 'none',
    text: 'note',
    image: '/images/user_moods/happy.png',
    created_at: '2021-12-01',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO user_moods ${sql(
    user_moods,
    'id',
    'mood_id',
    'type',
    'text',
    'image',
    'created_at',
  )}
	`;
};

exports.down = async (sql) => {
  await sql`
	TRUNCATE user_moods;
	`;
  await sql`
		ALTER SEQUENCE user_moods_user_mood_id_seq RESTART WITH 1
		`;
};
