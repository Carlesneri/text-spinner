const { translateToEng, translateToEsp } = require('./translate')
const getAltWords = require('./synonyms')

const app = require('./server')

app.listen(3000, () => {
    console.log('Listening in port 3000')

})

const textToSpin = 'Como es lógico, cuenta con la ventaja de que puede utilizarse en cualquier idioma. También podemos usarlo para generar contraseñas de forma aleatoria incluyendo diferentes caracteres entre corchetes separados por barras que se ordenarán de forma automática.'


const translateAPI = 'http://sesat.fdi.ucm.es:8080/servicios/rest/ingles/json/'
// spin(textToSpin)
// .then(text => console.log(text))
// .catch(error => console.error(error))


async function spin(text){
    try{
        return await translateToEsp(await translateToEng(text))

    }catch(error){
        console.error(error)

    }
}


// getAltWords('siempre')
// .then((resp: any) => console.log(resp.data.sinonimos))
// .catch((error: any) => console.error(error))