const { NodeNextRequest } = require('next/dist/server/base-http/node');

const suggestions = [
  {
    mood_id: '1',
    name: "Let's dance together",
    image: '/images/suggestions/dance.gif',
    image_extra: 'none',
    description:
      "When we dance our brain releases endorphins, hormones which can trigger neurotransmitters that create a feeling of comfort, relaxation, fun and power. Let's dance together:",
    link: 'https://www.youtube.com/watch?v=6wPO8L5Jsx0',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '1',
    name: "Let's talk to someone",
    image: '/images/suggestions/call-happy.gif',
    image_extra: 'none',
    description:
      "Life is even more fun when shared with family and friends. Never forget 'anything is possible when you have right people there to support you. Let's call the right people to share your happiness with them.",
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '1',
    name: "Let's celebrate with your friends",
    image: '/images/suggestions/friends.gif',
    image_extra: 'none',
    description:
      'Friends can help you celebrate good times and provide support during bad times. Friends prevent isolation and loneliness and give you a chance to offer needed companionship, too. Friends can also: Increase your sense of belonging and purpose.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '1',
    name: "Let's cycle together",
    image: '/images/suggestions/bicycle.gif',
    image_extra: 'none',
    description:
      'Within five minutes of cardiovascular exercise, such is cycling, you can feel happier! Once you get moving, your brain releases serotonin, dopamine and norepinephrine as well as possibly others. These make you feel good!',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '1',
    name: "Let's have an ice cream",
    image: '/images/suggestions/ice.gif',
    image_extra: 'none',
    description:
      'Eating ice cream is fun and also it contains protein and fat, both of which our bodies need to help level our moods. On top of that, the amino acids in ice cream increase serotonin production that leaves us feeling satisfied, and well, happier!',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '1',
    name: "Let's take a photo",
    image: '/images/suggestions/photo.gif',
    image_extra: 'none',
    description:
      'Freeze this wonderful moment in a photo. Along with photography helping us recall memories, research has shown that taking photos can actually boost our memories under certain circumstances, and come on! photography is FUN.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '2',
    name: "Let's listen to a happy music",
    image: '/images/suggestions/sad-music.gif',
    image_extra: 'none',
    description:
      "Researchers have revealed strong links between music and happiness. Let's boost your mood by listening to some happy music together:",
    link: 'https://www.youtube.com/watch?v=MWKki0K5yCM',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '2',
    name: "Let's talk to someone",
    image: '/images/suggestions/call-sad.gif',
    image_extra: 'none',
    description:
      "No matter what you're going through at the moment, connecting and communicating with others is the key to living well. Talking about your feelings can help you stay in good mental health and deal with times when you feel troubled.",
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '2',
    name: "Let's cook something good today",
    image: '/images/suggestions/cooking.gif',
    image_extra: 'none',
    description:
      'Spending time in the kitchen can ease stress and restlessness, and enhance mindfulness, the study concluded. Not only does the process of cooking and baking improve moods, the feeling of satisfaction gained when seeing the end product naturally enhances happiness.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '2',
    name: "Let's spend sometime together",
    image: '/images/suggestions/family.gif',
    image_extra: 'none',
    description:
      'Interacting with a close group of people, like your family, can notably reduce the possibility of developing anxiety or depression. Study shows that socialization increases the feelings of well-being, safety, and happiness.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '2',
    name: "Let's eat Healthy",
    image: '/images/suggestions/salad.gif',
    image_extra: 'none',
    description:
      'Eating a diet rich in fruits, vegetables, whole grains, legumes, low-fat dairy foods, and lean meats, poultry, and fish can go a long way toward lowering your risk of physical health problems and also is essential for your mental well-being.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '2',
    name: "Let's walk together",
    image: '/images/suggestions/walking-sad.gif',
    image_extra: 'none',
    description:
      'Walking has been consistently shown to be good for most aspects of human health, including mental health. Studies have shown that exercise can be as effective as medication or talking therapy in treating sadness and mild-moderate depression.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    // I have two images for this
    mood_id: '3',
    name: 'Breath with me',
    image: '/images/suggestions/breath.gif',
    image_extra: '/images/suggestions/breath-main.gif.',
    description: 'Focus on the circle',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '3',
    name: "Let's eat healthy",
    image: '/images/suggestions/fruit.gif',
    image_extra: 'none',
    description:
      'Research suggests that “healthy” food choices such as eating fruits and vegetables have not only physical but also mental health benefits and might be a long-term investment in future well-being.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '3',
    name: "Let's go for a walk",
    image: '/images/suggestions/walking-angry.gif',
    image_extra: 'none',
    description:
      'Besides being healthy for your bodily functions, regular exercise is very effective at reducing stress in the body and mind. Try to get some exercise every day to keep stress and anger at bay. For a quick way to manage anger, go for a brisk walk, bike ride, or run.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '3',
    name: "Let's listen to a calming music",
    image: '/images/suggestions/music-angry.gif',
    image_extra: 'none',
    description:
      "Music therapy is proven to form healthier coping mechanisms that lead to the acceptance of anger as opposed to aggressive and violent behavior. Let's listen to music together:",
    link: 'https://www.youtube.com/watch?v=hQncT4Hswhw',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '3',
    name: "Let's drink some water ",
    image: '/images/suggestions/water.gif',
    image_extra: 'none',
    description:
      'According to new research, sipping a cold drink can reduce feelings of anger, shame, guilt and embarrassment. Studies suggest that drinking a cup of cold water or iced tea could reduce these types of uncomfortable emotions',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '3',
    name: "Let's meditate together",
    image: '/images/suggestions/meditation.gif',
    image_extra: 'none',
    description:
      'Done regularly, meditation helps with anger by: Helping us remain focused on the present instead of being stuck in a cycle of negative thoughts. Increasing our awareness of our emotions and allowing us to respond in ways that move us toward what we value.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '4',
    name: "Let's listen to a music",
    image: '/images/suggestions/music-stress.gif',
    image_extra: 'none',
    description:
      "A calming music can quiet your mind and relax your muscles, making you feel soothed while releasing the stress of the day. Music is effective for relaxation and stress management. Let's listen together:",
    link: 'https://www.youtube.com/watch?v=lFcSrYw-ARY',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '4',
    name: "Let's play with your pet",
    image: '/images/suggestions/pet.gif',
    image_extra: 'none',
    description:
      'Pets, especially dogs and cats, can reduce stress, anxiety, and depression, ease loneliness, encourage exercise and playfulness, and even improve your cardiovascular health. Caring for an animal can help children and adults to feel secure and active.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '4',
    name: "Let's meditate together",
    image: '/images/suggestions/stress-meditation.gif',
    image_extra: 'none',
    description:
      'Meditation can produce a deep state of relaxation and a tranquil mind. During meditation, you focus your attention and eliminate the stream of jumbled thoughts that may be crowding your mind and causing stress.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '4',
    name: 'Take a relaxing bath',
    image: '/images/suggestions/bath.gif',
    image_extra: 'none',
    description:
      'Submergence in water and especially hot water can reduce pain and inflammation and also calm the nervous system, reducing the levels of stress and anxiety in the body and improving your mood.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '4',
    name: "Let's do yoga",
    image: '/images/suggestions/yoga.gif',
    image_extra: 'none',
    description:
      'A number of studies have shown that yoga may help reduce stress and anxiety. Yoga can enhance your mood and overall sense of well-being. Yoga might also help you manage your symptoms of depression and anxiety that are due to difficult situations.',
    link: 'none',
    type: 'none',
    is_enabled: 'true',
  },
  {
    mood_id: '4',
    name: "Let's drink some tea",
    image: '/images/suggestions/tea.gif',
    image_extra: 'none',
    description:
      'Researchers have found that drinking tea lowers levels of the stress hormone cortisol. Drinking at least 100 ml (about half a cup) of green tea a day seems to lower the risk of developing depression and dementia.',
    link: 'none',
    type: 'none',
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
    'image_extra',
    'description',
    'link',
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
ALTER SEQUENCE suggestions_suggestion_id_seq RESTART WITH 1
`;
};
