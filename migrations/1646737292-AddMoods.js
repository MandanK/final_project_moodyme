const moods = [
  { name: 'Happy', image: 'image1.png' },
  { name: 'Sad', image: 'image2.png' },
  { name: 'Angry', image: 'image3.png' },
  { name: 'Stressed', image: 'image4.png' },
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
