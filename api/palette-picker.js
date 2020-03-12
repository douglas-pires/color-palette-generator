// http://colormind.io/api-access/
import 'isomorphic-fetch'

export default async function(req, res, next) {
  const data = await fetch('http://colormind.io/api/', {
    method: 'POST',
    body: JSON.stringify({
      model: 'default'
    })
  })
    .then(result => result.json())
    .catch(console.log)

  res.end(JSON.stringify(data))
}
