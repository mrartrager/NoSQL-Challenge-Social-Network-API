const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toDateString(),
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

thoughtSchema.virtual('reactionSchema').get(function (){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;