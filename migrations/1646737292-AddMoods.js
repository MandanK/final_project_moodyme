const moods = [
  { name: 'Happy', image: 'Image1.png' },
  { name: 'Sad', image: 'Image2.png' },
  { name: 'Angry', image: 'Image3.png' },
  { name: 'Stressed', image: 'Image4.png' },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO moods ${sql(moods, 'image', 'name')}
	`;
};

exports.down = async (sql) => {
  for (const mood of moods) {
    await sql`
		DELETE FROM
		moods
		WHERE
		image = ${mood.image} AND
		name = ${mood.name}
		`;
  }
};
