import Post from "../models/blog.js";

const fakeData = [
  {
    title: "The Importance of Sleep",
    text: "A good night’s rest is essential for physical and mental health. Lack of sleep can lead to problems such as stress, weight gain, and weakened immunity.",
  },
  {
    title: "The Future of Electric Cars",
    text: "Electric vehicles are growing in popularity due to their environmental benefits and reduced maintenance costs. They are likely to dominate the car industry in the coming years.",
  },
  {
    title: "Healthy Eating on a Budget",
    text: "Eating healthy doesn’t have to be expensive. By planning meals, buying in bulk, and choosing seasonal produce, you can eat nutritious food without breaking the bank.",
  },
  {
    title: "The Rise of Remote Work",
    text: "Remote work has gained momentum in recent years. It offers flexibility and a better work-life balance, but also comes with challenges such as isolation and burnout.",
  },
  {
    title: "The Impact of Social Media on Mental Health",
    text: "Social media can be both beneficial and harmful. While it connects people, excessive use can lead to anxiety, depression, and feelings of inadequacy.",
  },
  {
    title: "How to Stay Productive Working from Home",
    text: "To stay productive, it’s important to set boundaries, create a dedicated workspace, and take regular breaks.",
  },
  {
    title: "The Benefits of Mindfulness Meditation",
    text: "Mindfulness meditation reduces stress, improves concentration, and promotes emotional well-being. It can be practiced anywhere at any time.",
  },
  {
    title: "The Evolution of Artificial Intelligence",
    text: "AI is transforming industries from healthcare to finance. While it offers numerous benefits, there are concerns about job displacement and ethics.",
  },
  {
    title: "The Importance of Regular Exercise",
    text: "Regular exercise improves cardiovascular health, boosts mood, and enhances overall well-being. Even 30 minutes of daily physical activity can make a difference.",
  },
  {
    title: "Sustainable Fashion",
    text: "Sustainable fashion is about creating clothes in an eco-friendly way, reducing waste, and supporting fair labor practices. It’s a growing movement in response to fast fashion.",
  },
  {
    title: "The Benefits of Learning a New Language",
    text: "Learning a new language improves cognitive abilities, boosts career prospects, and enhances cultural awareness. It’s a great way to challenge yourself and expand your horizons.",
  },
  {
    title: "The Power of Positive Thinking",
    text: "Positive thinking can reduce stress, improve relationships, and increase overall happiness. By focusing on the good, you can change your mindset and approach life more optimistically.",
  },
  {
    title: "The Growth of E-Commerce",
    text: "E-commerce has grown rapidly, especially during the pandemic. With convenience and accessibility, it’s becoming the preferred way to shop for consumers around the world.",
  },
  {
    title: "The Importance of Financial Literacy",
    text: "Financial literacy helps individuals make informed decisions about budgeting, saving, and investing. Understanding money management is key to achieving financial stability.",
  },
  {
    title: "The Role of Technology in Education",
    text: "Technology is reshaping education by providing new learning tools, online resources, and personalized education experiences. It’s making education more accessible and flexible.",
  },
  {
    title: "The Impact of Climate Change",
    text: "Climate change is affecting ecosystems, weather patterns, and human lives. Immediate action is needed to mitigate its effects and promote sustainability for future generations.",
  },
  {
    title: "The Benefits of Volunteering",
    text: "Volunteering helps people give back to their communities, develop new skills, and connect with others. It’s a rewarding way to make a positive impact on the world.",
  },
  {
    title: "The Rise of Plant-Based Diets",
    text: "Plant-based diets are gaining popularity due to their health benefits and reduced environmental impact. More people are opting for meatless meals as a sustainable lifestyle choice.",
  },
  {
    title: "How to Manage Stress Effectively",
    text: "Managing stress involves practicing relaxation techniques, staying organized, and taking time for self-care. Reducing stress leads to better mental and physical health.",
  },
  {
    title: "The Influence of Music on Mood",
    text: "Music has a powerful effect on emotions. It can lift spirits, calm anxiety, and even improve focus. Listening to music is a simple way to enhance your mood and well-being.",
  },
];
const userId = "123456";

async function allBlogs(req, res) {
  // get all blogs
  const data = await Post.find({}).select("title _id text");

  return res.status(200).json(data);
}

async function createTestPosts(req, res) {
  // create fake data
  fakeData.map(async (data) => {
    // console.log({ ...data, userId });
    if (await Post.findOne({ title: data.title })) {
      return;
    }
    const newPost = new Post({ ...data, userId });
    await newPost.save();
  });
  return res.status(201).json({ status: "all fake posts created" });
}

export { allBlogs, createTestPosts };
