const $originalText = document.getElementById('originalText')

const $finalText = document.getElementById('finalText')

const spinBtn = document.getElementById('spinBtn')

const synonymsURL = 'http://sesat.fdi.ucm.es:8080/servicios/rest/sinonimos/json/'

const localhostURL = 'http://localhost:5000/text-spinner-279d4/us-central1/app'
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

    const finalTextWords = $finalText.querySelectorAll('.spinned-word')

    finalTextWords.forEach(el => el.addEventListener('dblclick', showSynonymsModal))

}

function getWords(text){
    const words = text.split(' ')
    return words
}

function joinWords(array){
    let joinedWords = ''

    array.forEach((word, i) => {
        joinedWords += `<span class="spinned-word" data-id=${i}>${word} </span>`

    })

    return joinedWords
}

async function showSynonymsModal(event){

    let modal = document.querySelector(".modal")

    if(modal) modal.remove()

    document.body.addEventListener('click', event => {
        // event.stopPropagation()
        if(modal) modal.remove()
        
    })

    event.target.style.position = 'relative'

    const word = event.target.innerText

    modal = document.createElement('div')

    modal.classList.add("modal")

    modal.setAttribute('contenteditable', 'false')

    const dataId = event.target.dataset.id

    modal.setAttribute('data-id', dataId)
    
    try {
        const synonyms = await getSynonyms(word)

        // console.log(synonyms)
        if(!synonyms.length) modal.innerHTML = `No synonyms found`
        
        synonyms.forEach(synonym => {
            modal.innerHTML += `<div class="synonym">${synonym}</div>`
        
        })     
        
        event.target.appendChild(modal)

        const $synonyms = document.querySelectorAll('.synonym')

        // console.log($synonyms);

        $synonyms.forEach(el => {
            el.addEventListener('click', event => {
                // event.stopPropagation()
                // console.log('synonym clicked')
                modal.parentElement.innerHTML = event.target.innerText + ' '

            })
        })
    


        modal.addEventListener('click', event => {
            event.stopPropagation()
        })

        
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
