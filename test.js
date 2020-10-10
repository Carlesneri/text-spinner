const axios = require('axios')
const cheerio = require('cheerio')

// const filePath = path.join(__dirname, "sinonimos.txt")

// console.log(filePath)

// fs.readFile(filePath, 'utf8', (err, data) => {
    //     if (err) throw err
    //     console.log(data.split('\n'))
    
    // })
    
    // const newStream = stream.split('\n')
    
    // fs.writeFile('sinonimos2.txt', newStream, () => console.log('File saved'))
    // pdfParse(stream)
    // .then(data => {
    //     // console.log(data)
    // })
    // .catch(error => console.error(error))


    const synonymURL = 'https://www.wordreference.com/sinonimos/'
    // const synonymURL = 'https://www.sinonimosonline.com/'
    
    async function getEspAltWords(word){

        let { data } = await axios.get(synonymURL + word)

        const $ = cheerio.load(data)

        let words = []

        const $words = $('#article .trans > ul > li')

        $words.each((i, el) => {
            const collection =  $(el).text()
            
            const colArr = collection.split(',')

            colArr.forEach(el => words.push(el.trim()))

        })
        
        console.log(words)

    
        // console.log(data)
    }

    getEspAltWords('genial')
