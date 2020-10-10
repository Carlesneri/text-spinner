const $originalText = document.getElementById('originalText')

const $finalText = document.getElementById('finalText')

const spinBtn = document.getElementById('spinBtn')

const synonymsURL = 'http://sesat.fdi.ucm.es:8080/servicios/rest/sinonimos/json/'
// window.addEventListener('click', (e) => {
//     console.log(document.elementFromPoint(e.clientX, e.clientY))
// })

spinBtn.addEventListener('click', spinText)

async function spinText(){
    const originalText = $originalText.value 

    const response = await fetch('/translate', {
        method: 'POST',
        body: JSON.stringify({ originalText }),
        headers: {
            'Content-Type': 'application/json' 
        }
        
    })

    const {translatedText} = await response.json()

    // console.log();

    const words = getWords(translatedText)

    $finalText.innerHTML = joinWords(words)

    const finalTextWords = $finalText.querySelectorAll('span')

    finalTextWords.forEach(el => el.addEventListener('click', showSynonymsModal))

}

function getWords(text){
    const words = text.split(' ')
    return words
}

function joinWords(array){
    let joinedWords = ''

    array.forEach((word, i) => {
        joinedWords += `<span data-id=${i}>${word} </span>`
        // joinedWords += `<span class="word-to-change" data-id=${i}>${word} </span>`
    })

    return joinedWords
}

async function showSynonymsModal(event){
    const word = event.target.innerText
    const modal = document.createElement('div')
    modal.classList.add("modal")
    
    try {
        const synonyms = await getSynonyms(word)

        console.log(synonyms)
        
        synonyms.forEach(synonym => {
            modal.innerHTML += `<div>${synonym}`
        
        })        // modal.innerHTML = 
    
        event.target.append(modal)
        // console.log(index)
        // const target = document.querySelector(`[data-id="${index}"]`)

        // console.log(event.target)

        
    } catch (error) {
        console.error(error)

    }

}

async function getSynonyms(word){
    try {
        const response = await fetch(`/altwords/${word}`)

        // console.log(synonyms)
        
        return await response.json()

    } catch (error) {
        
    }
}
