let socket= io("http://localhost:8000")
var name=prompt("Enter User Name to Join ChatApp:")
socket.emit("join",name)

var first= document.querySelector(".first")
function displayMsg(message,side){
    var mdiv =document.createElement("div")
    mdiv.classList.add("alert")
    if(side=='left'){
        mdiv.classList.add("left")
        mdiv.classList.add("alert-secondary")
    }
    else if(side=='right'){
        mdiv.classList.add("right")
        mdiv.classList.add("alert-success")
    }
    else
  {
        mdiv.classList.add("center")
        mdiv.classList.add("alert-light")
    }
    mdiv.innerHTML=message
    first.append(mdiv)
}
socket.on("new-user-joined",(name)=>{
displayMsg(`${name} Joined the Chat`,"center")
})
socket.on("left",(name)=>{
    displayMsg(`${name} left the Chat`,"center")
    })

    function sendMsg(){
        var x=document.getElementById("msg")
        displayMsg(`${x.value}  `,"right")
        socket.emit("send",x.value)
        x.value=""
    }
    socket.on("receive",({message,name})=>{
        displayMsg(`${name}: ${message}`,"left")
    })