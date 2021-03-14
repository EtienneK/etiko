import next from 'next'
import express from 'express'
import path from 'path'

const dev = process.env.NODE_ENV !== 'production'
let port = process.env.PORT || 3000

if (process.env.NODE_ENV === 'test') port = 7357

const server = express()
const app = next({ dev, dir: path.join(__dirname, '../../') })

server.get('*', (req, res) => app.getRequestHandler()(req, res))

const serverPromise = app.prepare()
  .then(() => server.listen(port, () => console.log(`server - listening on port ${port}`)))
  .catch(console.error)

export default serverPromise
