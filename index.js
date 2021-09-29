const express = require('express')
const app = express()
const port = 3000

/* '/' is an "endpoint", more can be made to make requests to backend (e.g. app.get('/getRecentPosts) etc) */
app.get('/', (req, res) => {
  res.send('Hello Friends!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})