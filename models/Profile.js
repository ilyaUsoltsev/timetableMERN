const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    schoolName:{
        type: String,
        required: true,
        max: 40
    },
    daysPerWeek:{
        type: Number,
        required: true
    },
    lessonsPerDay:{
        type:Number,
        required: true
    }

});

module.exports = Profile = mongoose.model('profile',ProfileSchema);