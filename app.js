require('dotenv').config();
let express = require('express');
const request = require('request');
let app = express();
let port = process.env.PORT;


app.use(express.static(__dirname + '/public'))
app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', (req, res, next)=>{
    res.send('<h1>Welcome to Express</h1>')
})

app.get('/Weather/:city', (req, res)=>{
    let city = req.params.city;
    // let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.APP_KEY}`;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&units=metric&cnt=5&appid=${process.env.APP_KEY}`;
    request(url, (err, apiResponse)=>{
        if(err) throw err;
        let response = JSON.parse(apiResponse.body);
        console.log('response >>>', response)
        res.render('index', {title:"Weather App",result: response})
    })
})

app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`Server is listening on port ${port}`)
})