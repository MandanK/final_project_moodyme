exports.up = async (client) => {
  // <insert magic here>
  await sql`
	CREATE TABLE "moods"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "is_enabled" BOOLEAN NOT NULL
);
ALTER TABLE
    "moods" ADD PRIMARY KEY("id");
	`;
};

exports.down = async (client) => {
  // just in case...
};
