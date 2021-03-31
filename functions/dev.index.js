// const functions = require('firebase-functions')

const app = require('./server')

app.use('/', require('./src/routes'))

app.listen(3000, () => console.log(`App listening on port 3000`))
