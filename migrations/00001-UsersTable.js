// This can be used to create a default admin user
/* const users = [
  {
		username: 'test-user',
		password_hash: 'HyYESaMYtKHJhzT63V_9FBas!!',
		role: 'admin',
    firstname: 'Admin',
    lastname: 'Admin',
    username: 'admin',
    birthday: '1993-06-012',
    email: 'tina@example.com',
    tel: '0123456789',
    address: 'Earth',
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
		'username',
		'password_hash',
		'role',
    'first_name',
    'last_name',
    'birthday',
    'email',
    'tel',
    'address',
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
*/
