const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: 'Usernames are required!',
            trim: true
        },
        email: {
            type: String,
            required: 'A valid email is required!',
            unique: true,
            match: [/.+@.+\..+/]
        },
        // array of _id values referencing the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// virtual that retrieves the length of the user's friends array field on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema)

module.exports = User;
