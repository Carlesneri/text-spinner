// import tcom from 'thesaurus-com'
const axios = require('axios')

const synonymAPI = 'http://sesat.fdi.ucm.es:8080/servicios/rest/sinonimos/json/'


async function getAltWords(word){
    
    console.log(`Getting synonyms of ${word}`)
    
    // let altWords = []

    let wordSynonyms = await axios(synonymAPI + word)

    // let nSynonyms = wordSynonyms.n

    // if(nSynonyms) nSynonyms = nSynonyms.splice(1)
    
    // if(nSynonyms) nSynonyms = nSynonyms.filter((el:string) => el !== 'n')

    // if(nSynonyms) altWords = nSynonyms
        
    // let vSynonyms = synonyms(word).v
    
    // vSynonyms && (vSynonyms = vSynonyms.splice(1))
    
    // vSynonyms && (vSynonyms = vSynonyms.filter((el: string) => el !== 'v'))

    // vSynonyms && (altWords = altWords.concat(vSynonyms))

    return wordSynonyms
}

module.exports = getAltWords