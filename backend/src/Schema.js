
const mongoose = require("mongoose");

// mongodb: (may be) needed for targeted updates
mongoose.set('useFindAndModify', false);

// export enables all modules to use same connection
// connection initialized at "main" as defined in package.json
module.exports.mongoose = mongoose;

const affinitiesArray = [
    "ΜΗΔΕΝΙΚΗ ΦΤΩΧΕΙΑ", "ΜΗΔΕΝΙΚΗ ΠΕΙΝΑ",
    "ΚΑΛΗ ΥΓΕΙΑ ΚΑΙ ΕΥΗΜΕΡΙΑ", "ΠΟΙΟΤΙΚΗ ΕΚΠΑΙΔΕΥΣΗ",
    "ΙΣΟΤΗΤΑ ΤΩΝ ΦΥΛΩΝ", "ΚΑΘΑΡΟ ΝΕΡΟ - ΑΠΟΧΕΤΕΥΣΗ",
    "ΦΤΗΝΗ ΚΑΙ ΚΑΘΑΡΗ ΕΝΕΡΓΕΙΑ", "ΑΞΙΟΠΡΕΠΗΣ ΕΡΓΑΣΙΑ ΚΑΙ ΟΙΚΟΝΟΜΙΚΗ ΑΝΑΠΤΥΞΗ",
    "ΒΙΟΜΗΧΑΝΙΑ, ΚΑΙΝΟΤΟΜΙΑ ΚΑΙ ΥΠΟΔΟΜΕΣ", "ΛΙΓΟΤΕΡΕΣ ΑΝΙΣΟΤΗΤΕΣ",
    "ΒΙΩΣΙΜΕΣ ΠΟΛΕΙΣ ΚΑΙ ΚΟΙΝΟΤΗΤΕΣ", "ΥΠΕΥΘΥΝΗ ΚΑΤΑΝΑΛΩΣΗ ΚΑΙ ΠΑΡΑΓΩΓΗ",
    "ΔΡΑΣΗ ΓΙΑ ΤΟ ΚΛΙΜΑ", "ΖΩΗ ΣΤΟ ΝΕΡΟ", "ΖΩΗ ΣΤΗ ΣΤΕΡΙΑ",
    "ΕΙΡΗΝΗ, ΔΙΚΑΙΟΣΥΝΗ ΚΑΙ ΙΣΧΥΡΟΙ ΘΕΣΜΟΙ", "ΣΥΝΕΡΓΑΣΙΑ ΓΙΑ ΤΟΥΣ ΣΤΟΧΟΥΣ"
];

// keep schema and model in singular
const userSchema = mongoose.Schema({
    approval_pending: Boolean,
    username: { type: String, trim: true },
    password: { type: String, trim: true },
    email: { type: String, trim: true },
    full_name: { type: String, trim: true },
    role: { type: String, trim: true, enum: ['administrator', 'User'] },
    affiliated_ngo: {       // data specific to the NGO this user is affiliated with
        ID: { type: String, default: "" },     // equals NGO._id
        name: { type: String, trim: true },    // NGO.name
    },
    affinities: [{ type: String, enum: affinitiesArray }], //an array of affinities
    title: { type: String, trim: true },  //user's professional title
    gender: { type: { type: String, trim: true }, enum: ['female', 'male', 'other'] },
    image: { type: String, trim: true },
    webpage: { type: String, trim: true },
    birth_date: Date,
    description: { type: String, trim: true },
    contact: {
        address: [{ type: String, trim: true }],
        phone: [{ type: String, trim: true }],
        contact_hours: [{ type: String, trim: true }]
    }
});

// keep schema and model in singular
const NGOSchema = mongoose.Schema({
    approval_pending: Boolean,
    name: { type: String, trim: true, required: true },
    image: { type: String, trim: true },
    webpage: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    main_representative: { type: String, trim: true, required: true },
    affinities: [{ type: String, enum: affinitiesArray, required: true }], //an array of _id affinities
    contact: {
        address: [{ type: String, trim: true, required: true }],
        phone: [{ type: String, trim: true, required: true }],
        contact_hours: [{ type: String, trim: true }]
    },
    documents: [Buffer]
});

// keep schema and model in singular - also export the models
module.exports.User = mongoose.model('user', userSchema);
module.exports.NGO = mongoose.model('ngo', NGOSchema);

// additional export the list of affinities
module.exports.affinities = affinitiesArray;

