const { User, Thought } = require('../models');

module.exports = {

getThoughts(req, res) {
    console.log(Thought)
    Thought.find()
    .select('__v')
    .then((Thoughts) => res.json(Thoughts))
    .catch((err) => res.status(500).json(err));
},

getSingleThought(req, res){
    console.log(req.params)
    Thought.findOne({ _id: req.params.thoughtId })
    .select('__v')
    .then((Thought) =>
    !Thought
      ? res.status(404).json({ message: 'No Thought with that ID' })
      : res.json(Thought)
  )
  .catch((err) => res.status(500).json(err));
},

createThought(req, res){
    Thought.create(req.body)
    .then((Thought) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: Thought._id } },
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
        res.status(500).json(err);
    });
},

deleteThought(req, res){
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((Thought) => {
        if(!Thought) {
            res.status(404).json({ message: "Cannot find thought with that ID"})
        } else {
            res.status(200).json({ message: "Thought deleted"})
        }
    })
    .catch((err) => res.status(500).json(err))
},

addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: { reactionBody: req.body.reactionBody, username: req.body.username } } },
        { new: true }
    )
        .then((Reaction) =>
            !Reaction
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

removeReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { new: true }
    )
        .then((Thought) =>
            !Thought
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
}