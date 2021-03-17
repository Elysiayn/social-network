const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
.route('/')
.get(getAllThoughts)

// /api/thoughts/:userId
router
.route('/:userId')
.post(createThought);

// /api/thoughts/:userId/:thoughtId
router
.route('/:userId/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

// /api/thoughts/:userId/:thoughtId/reactions
router
.route('/:userId/:thoughtId/reactions/')
.put(createReaction)

// /api/thoughts/:userId/:thoughtId/reactions/:reactionId
router
.route('/:userId/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;

