const mongoose = require('mongoose');
//const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: [true],
            unique: true, 
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
           //validate: [isEmail],
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },

        bio: {
            type: String,
            max: 1024,
        },

        followers: {
            type: [String],
        },

        following: {
            type: [String],
        },

        likes: {
            type: [String],
        },

        image: {
            type:String,
            default: ""
        }
    },
    {
        timestamps: true,
    }
);

//play function before save
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
     }
     throw Error('Incorrect email')
};

const user = mongoose.model("user", userSchema);

module.exports = user;