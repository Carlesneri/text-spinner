const axios = require('axios')
const cheerio = require('cheerio')
const translator = require('@vitalets/google-translate-api')
const synonyms = require('synonyms')

// const synonymAPI = 'http://sesat.fdi.ucm.es:8080/servicios/rest/sinonimos/json/'

const synonymURL = 'https://www.wordreference.com/sinonimos/'

const upperCaseRegExp = /[A-Z]/

async function getEspAltWords(word){

    word = word.trim()

    const espAltWords = []

    try {
                
        console.log(`Getting Esp synonyms of '${word}'`)

        let isUpperCase = false
        
        let isPlural = false

        if(upperCaseRegExp.test(word.charAt(0)) && !upperCaseRegExp.test(word.charAt(1))){
            word = word.toLowerCase()
            isUpperCase = true

        }

        if(word.charAt(word.length - 1) === 's'){
            isPlural = true

        }
        
        let { data } = await axios.get(synonymURL + word)

        const $ = cheerio.load(data)

        const $words = $('#article .trans > ul > li')

        $words.each((i, el) => {
            const collection =  $(el).text()
            
            const colArr = collection.split(',')

            colArr.forEach(el => {
                el = el.trim()

                if(isUpperCase){
                    el = el.charAt(0).toUpperCase() + el.slice(1)

                } 

                if(isPlural) el = el + 's'

                espAltWords.push(el)

            })
        })

    } catch (error) {
        console.error(error.message)

    } finally {
        return espAltWords

    }
}

async function getEngAltWords(word){
    let isUpperCase = false

    // console.log(`Getting Eng synonyms of '${word}'`)

    if(upperCaseRegExp.test(word.charAt(0)) && !upperCaseRegExp.test(word.charAt(1))){
        word = word.toLowerCase()
        isUpperCase = true

    }

    let altWords = []

    const wordSynonyms = synonyms(word)

    // console.log(wordSynonyms)

    let nSynonyms = [], vSynonyms = []

    if(wordSynonyms && wordSynonyms.n) nSynonyms = wordSynonyms.n.splice(1)
    
    if(nSynonyms) nSynonyms = nSynonyms.filter((el) => el !== 'n')

    if(nSynonyms) altWords = nSynonyms
            
    wordSynonyms && wordSynonyms.v && (vSynonyms = vSynonyms.splice(1))
    
    vSynonyms && (vSynonyms = vSynonyms.filter((el) => el !== 'v'))

    vSynonyms && (altWords = altWords.concat(vSynonyms))

    if(isUpperCase){
        altWords.forEach(word => word.toUpperCase())
    }
    
    // altWords.length ? console.log(`Synonyms of ${word}: ${altWords}`) : console.log(`No synonyms found for ${word}`)

    return altWords
}



function changeWords(text){
    // console.log(text)
    let newText = text

    let textInWords = text.split(' ')

    const cleanWords = []

    const punctRegExp = /[.,\/#!$%\^&\*;:{}=\-_`~()”“"…]/g

    textInWords.forEach(word => {
        cleanWords.push(word.replace(punctRegExp, ''))
    });

    cleanWords.forEach(word => {
        if (word.length > 3) {
            const altWords = getEngAltWords(word)
            if(altWords[0]){
                newText = text.replace(word, altWords[0])
            }

        }
    })

    // console.log(cleanWords)

    return newText

}


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


module.exports = { getEspAltWords, getEspAltWords, getEngAltWords, translateToEng, translateToEsp, changeWords }