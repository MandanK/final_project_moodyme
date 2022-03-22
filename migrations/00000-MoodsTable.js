const moods = [
  { name: 'Happy', image: '/moods/image1.png', is_enabled: 'true' },
  { name: 'Sad', image: '/moods/image2.png', is_enabled: 'true' },
  { name: 'Angry', image: '/moods/image3.png', is_enabled: 'true' },
  { name: 'Stressed', image: '/moods/image4.png', is_enabled: 'true' },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO moods ${sql(moods, 'image', 'name', 'is_enabled')}
	`;
};

exports.down = async (sql) => {
  await sql`
TRUNCATE moods;
`;

  await sql`
ALTER SEQUENCE moods_id_seq RESTART WITH 1
`;
};
