CREATE TABLE moods (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(40) NOT NULL,
  image varchar(80) NOT NULL
);

INSERT INTO moods
(name, image)
VALUES
('Happy', 'Image1.jpg'),
('Sad', 'Image2.jpg'),
('Angry', 'Image3.jpg'),
('Stressed', 'Image4.jpg');

SELECT * FROM moods;