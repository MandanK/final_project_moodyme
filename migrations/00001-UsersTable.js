const users = [
  {
    first_name: 'Tina',
    last_name: 'Example',
    user_name: 'tina1',
    birthday: '1993-06-012',
    email: 'tina@example.com',
    tel: '0123456789',
    address: 'Earth',
    password_hash: 'HyYESaMYtKHJhzT63V_9FBas!!',
    gender: 'Female',
    image: '/images/users/tina1.png',
    register_date: '2021-06-01',
    is_enabled: 'true',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO users ${sql(
    users,
    'first_name',
    'last_name',
    'user_name',
    'birthday',
    'email',
    'tel',
    'address',
    'password_hash',
    'gender',
    'image',
    'register_date',
    'is_enabled',
  )}
	`;
};

exports.down = async (sql) => {
  await sql`
	TRUNCATE users;
	`;

  await sql`
ALTER SEQUENCE users_id_seq RESTART WITH 1
`;
};
