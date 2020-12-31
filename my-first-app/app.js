const EXPRESS = require('express');

const app = EXPRESS();

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  // res.send(`<h1>Hello express</h1>`)
  res.render('index')
})

app.get('/account', (req, res) => {
  res.render('account', { money: '$100', recent: true })
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})