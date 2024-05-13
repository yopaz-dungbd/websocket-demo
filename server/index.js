const ws = require('ws')
const server = new ws.Server({ port: 3000 })

let connectedUser = []

server.on('connection', socket => {
  console.log('==> new connection')
  connectedUser.push(socket)

  socket.on('message', message => {
    const buffer = Buffer.from(message)
    console.log('==> receive new msg', buffer.toString())
    socket.send(`${message}`)
    connectedUser.forEach(user => {
      if (user !== socket) {
        user.send(`${message}`)
      }
    })
  })
})
