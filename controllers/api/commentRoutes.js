const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new comment
router.post('/projects/:projectId/comments', withAuth, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { content } = req.body;

    if (!content) {
      res.status(400).json({ message: 'Content cannot be empty' });
      return;
    }

    const newComment = await Comment.create({
      content,
      user_id: req.session.user_id,
      project_id: projectId,
      created_at: new Date(),
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;


