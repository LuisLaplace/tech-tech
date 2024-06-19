const sequelize = require('../config/connection');
const { User, Project, Comment } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const projects = [];

  for (const project of projectData) {
    const createdProject = await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    projects.push(createdProject);
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      project_id: projects[Math.floor(Math.random() * projects.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

