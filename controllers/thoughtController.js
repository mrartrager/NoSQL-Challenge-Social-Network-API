const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getThoughts(req, res) {
        // use find() on your Thought model
        Thought.find()
            .sort({createdAt: -1})
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json({err, message: "error"}));
    },
    // get single thought by id
    getSingleThought(req, res) {
        // findOne() on Thought model
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate('reactions')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a thought
    createThought(req, res) {
        // use create() on Thought model
        Thought.create(req.body)
            .then((Thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { Thoughts: Thought._id } },
                    { new: true }
                );
            })
            .then((Thought) =>
                !Thought
                    ? res
                        .status(404)
                        .json({ message: 'Thought created, but found no user with that ID' })
                    : res.json('Created the thought 🎉')
            )
            .catch((err) => {
                console.log(err);
            });
    },
    // update thought
    updateThought(req, res) {
        // findOneAndUpdate() on Thought model
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((Thought) =>
                !Thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(Thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete thought
    deleteThought(req, res) {
        // findOneAndRemove() on Thought model
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((Thought) => {
                if (!Thought) {
                    res.status(404).json({ message: 'No thought with that ID' })
                } else {
                    res.status(200).json({ message: 'Successfully deleted Thought' })
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    // add a reaction to a thought
    addReaction(req, res) {
        // findOneAndUpdate
        // use $addToSet - reference activity 23, controllers/postController - check out hows it's being used in the createPost
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username } } },
            { new: true }
        )
            .then((reaction) =>
                !reaction
                    ? res
                        .status(404)
                        .json({ message: 'No user with that ID' })
                    : res.json('Added reaction 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // remove reaction from a thought
    removeReaction(req, res) {
        // findOneAndUpdate
        // use $pull
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'No user with that ID' })
                    : res.json('Deleted reaction 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

module.exports = thoughtController;