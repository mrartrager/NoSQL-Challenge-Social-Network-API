const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')
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

const thought = model('thought', thoughtSchema);

module.export = thought;