const mongoose = require('mongoose');
const Schema = mongoose.Schema
 
const usersSchema = new mongoose.Schema(

{
    nom : String,
    email: { type: String, required: true, unique: true },
    descrimination : Number,
    password: { type: String, required: true},
    cours: [{ type: Schema.Types.ObjectId, ref: 'Cours' }],
    Avancements : [{
        idCours : {type :Schema.Types.ObjectId, ref : 'Cours' },
        idLesson : {type :Schema.Types.ObjectId, ref : 'Cours.lessons'},
        nbrelesson : Number,
        estTermine : Boolean,
        score : Number,
        niveau : String
    }]
});

const Users = mongoose.model("Users",usersSchema)
module.exports = Users;