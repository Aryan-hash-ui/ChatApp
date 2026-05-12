
//Cross-origin resource sharing (CORS) is a browser mechanism which enables controlled access to resources located outside of a given domain. CORS will allow more than one app running on different ports 
const PORT = process.env.PORT || 8000
const io = require("socket.io")(PORT, {
    cors: {
        origin: "https://chat-app-alpha-flax.vercel.app"
    }
})
let users = {}
// //Built-in keywords events etc.- connection,discoonect
// //User-defined- socket,join,send,receive

io.on("connection", (socket) => {
    socket.on("join", (name) => {
        if (name == "" || name == null || name == "null") { }
        else {
            users[socket.id] = name
            socket.broadcast.emit("new-user-joined", name)
        }

        // console.log(users)
    
    })
    socket.on("send", (message) => {
        socket.broadcast.emit("receive", {
            name: users[socket.id], message: message
        })

    })
        socket.on("disconnect", () => {
            if(users[socket.id]=="" || users[socket.id] == null || users[socket.id] == "null")
                {}
            else
            {
                socket.broadcast.emit("left",
                    users[socket.id])
                delete users[socket.id]
            }
          
        })
    })




