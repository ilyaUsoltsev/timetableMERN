const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KlassSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    klassName:{
        type:String,
        required:true
    },
    lessons:[{
        name:{
            type: String
        },
        numberPerWeek:{
            type: Number
        }
    }
    ],
    timetable:{
        type:Array
    }

});

module.exports = Klass = mongoose.model('klasses',KlassSchema);