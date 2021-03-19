const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/date-format');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please enter your reaction!',
            minLength: 1,
            maxLength: 280
        },
        //user that created this reaction
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method to format timestamp on query
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please enter your thought!',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method to format timestamp on query
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // user that created this thought
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// virtual that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model ('Thought', ThoughtSchema);

module.exports = Thought;