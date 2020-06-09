const mongoose = require("mongoose");


const usersSchema = mongoose.Schema(
    { 
        username: {type:String, trim: true},
        email: {type:String, trim: true}, 
        password: {type:String, trim: true},
        role: { type: String, trim: true, enum: ['NGO', 'administrator', 'mentor'] }
    }
); 


const NGOsSchema = mongoose.Schema({
    user_id: ObjectId, //the _id of user so we can make the connection between these collections
    approval_pending: Boolean,
    name: {type:String, trim: true},
    image: {type:String, trim: true},
    webpage: {type:String, trim: true},
    description: {type:String, trim: true},
    main_representative: {type:String, trim: true},
    affinities: [{type:Number, maxlength:3}], //an array of _id affinities
    contact: {
        address: [{type:String, trim: true}],
        phone: [{type:String, trim: true}],
        contact_hours: [{type:String, trim: true}] 
    },
    documents: [Buffer]
});


const mentorsSchema = mongoose.Schema({
    user_id: ObjectId, //the _id of user so we can make the connection between these two collections
    organization_id: [{type: ObjectId, default:""}], //the _id of the NGO or NGOs that mentor may belongs
    affiliated_org: [{type:String, trim: true}],  //the NGO or NGOs that mentor may belongs
    approval_pending: Boolean,
    full_name: {type:String, trim: true},
    title: {type:String, trim: true},  //mentor's professional title
    gender: {type: {type:String, trim: true}, enum: ['other', 'male', 'female']},
    image: {type:String, trim: true},
    webpage: {type:String, trim: true},
    birth_date: Date,
    description: {type:String, trim: true},
    affinities: [{type:Number, maxlength:3}], //an array of id affinities
    contact: {
        address: [{type:String, trim: true}],
        phone: [{type:String, trim: true}],
        contact_hours: [{type:String, trim: true}] 
    }
});


const Users = mongoose.model('Users', usersSchema);
const NGOs = mongoose.model('NGOs', NGOsSchema);
const Mentors = mongoose.model('Mentors', mentorsSchema);