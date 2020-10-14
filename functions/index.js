const functions = require('firebase-functions')

const app = require('./server')

// app.listen(3000, () => console.log(`App listening on port 3000`))

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app)
