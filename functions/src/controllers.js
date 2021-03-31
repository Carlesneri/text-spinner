const ctrl = {}

const { 
    getEspAltWords, 
    translateToEng, 
    translateToEsp, 
    changeWords
} = require('./services')

ctrl.getAltWords = async (req, res) => {
    let altWords = {}

    try {
        altWords = await getEspAltWords(req.params.word)

        // console.log(altWords)

        res.json(altWords)
    
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error'})

    }

}

ctrl.translate = async (req, res) => {
    try {
        const {originalText} = req.body

        // console.log('originalText', originalText)
        
        let engText = await translateToEng(originalText)
        // console.log('engText', engText)
        
        let newText = changeWords(engText)
        // console.log('newText', newText)
        
        let espText = await translateToEsp(newText)
        // console.log('espText', espText)
        
        res.json({translatedText: espText})
        // res.json({translatedText: 'espText'})
        
    } catch (error) {
        console.error(error)

    }

}

module.exports = ctrl