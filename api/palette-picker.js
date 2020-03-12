// http://colormind.io/api-access/
import express from 'express'
import 'isomorphic-fetch'
const app = express()

app.get('/', async (req, res) => {
  const data = await fetch('http://colormind.io/api/', {
    method: 'POST',
    body: JSON.stringify({
      model: 'default'
    })
  })
    .then(result => result.json())
    .catch(console.log)

  res.send(data)
})

export default {
  path: 'api/palette-picker',
  handler: app
}