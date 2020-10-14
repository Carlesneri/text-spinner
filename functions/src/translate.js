const translator= require('@vitalets/google-translate-api')

async function translateToEng(text){
    return translator(text, {
        from: 'es',
        to: 'en'
    })
    .then((res) =>  res.text)
    .catch((error) => console.error(error))

}

async function translateToEsp(text){
    return translator(text, {
        from: 'en',
        to: 'es'
    })
    .then((text) =>  text.text)
    .catch((error) => console.error(error))

}

module.exports = { translateToEng, translateToEsp }