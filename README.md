# Auction
Auction app with real-time observable socket streams

# Stack
### Server-side:
 - Socket.io for real-time events
 - RxJS to treat socket.io events as Observable streams

### Client-side UI:
 - Frameworkless custom code influenced by Elm Architecture
 - Snabbdom a virtual DOM library for rendering
 - Union-type library for Actions
 - Socket.io
 - RxJS

# Install
`npm install`

# Run Server
`npm run server`
# Run server in debug mode
`nodemon --inspect src/server`

# Run UI client
`npm start`
