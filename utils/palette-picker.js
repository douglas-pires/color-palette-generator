const colormindUrl = 'http://colormind.io/api/'

// http://colormind.io/api-access/
export default () =>
  fetch(colormindUrl, {
    method: 'POST',
    body: JSON.stringify({
      model: 'default'
    })
  })
    .then(result => result.json())
    // eslint-disable-next-line no-console
    .catch(console.log)
