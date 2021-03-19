const { Thought, User } = require('../models'); 

const thoughtController = {
    // get all thought
    getAllThought(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendSatus(400).json(err);
        });
    },
    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
    }
}