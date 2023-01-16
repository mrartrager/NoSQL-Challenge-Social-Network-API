const { User, Thought } = require('../models');

const userController = {
    // get all users
    getUsers(req, res) {
        //find() on User
        User.find()
            .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // get single user by id
    getSingleUser(req, res) {
        // findOne() on User
        // use .populate to populate friends and thoughts for that User
        // ex: .populate('friends')
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new user
    createUser(req, res) {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // update a user
    updateUser(req, res) {
        // findOneAndUpdate
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete user (BONUS: and delete associated thoughts)
    deleteUser(req, res) {
        // findOneAndDelete
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user with that ID' })
                } else {
                    Thought.deleteMany({ _id: { $in: user.thoughts } })
                    .then(() => res.status(200).json({ message: 'Successfully deleted User' }))
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    // add friend to friend list
    addFriend(req, res) {
        // findOneAndUpdate
        // use $addToSet - reference activity 23, controllers/postController - check out hows it's being used in the createPost
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user with that ID' })
                    : res.json('Added friend 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // remove friend from friend list
    removeFriend(req, res) {
        // findOneAndUpdate
        // use $pull
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user with that ID' })
                    : res.json('Removed friend 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

module.exports = userController;