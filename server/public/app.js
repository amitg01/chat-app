const socket = io("ws://localhost:3500");

const msgInput = document.querySelector("#message");
const nameInput = document.querySelector("#name");
const roomInput = document.querySelector("room");
const activity = document.querySelector(".activity");
const userList = document.querySelector(".user-list");
const roomList = document.querySelector(".room-list");
const chatDisplay = document.querySelector(".chat-display");

function sendMessage(e) {
  e.preventDefault();
  if (msgInput.value || nameInput.value || roomInput.value) {
    socket.emit("message", {
      text: msgInput.value,
      name: nameInput.value,
      room: roomInput.value,
    });
    msgInput.value = "";
  }
  msgInput.focus();
}

function enterRoom(e) {
  e.preventDefault();
  if (nameInput.value && chatRoom.value) {
    socket.emit("enterRoom", {
      name: nameInput.value,
      room: chatRoom.value,
    });
  }
}

document.querySelector(".form-msg").addEventListener("submit", sendMessage);

document.querySelector(".form-join").addEventListener("submit", enterRoom);

msgInput.addEventListener("keypress", () => {
  socket.emit("activity", nameInput.value);
});
// Listen for messages

socket.on("message", (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});

let t;
socket.on("activity", (name) => {
  clearTimeout(t);
  t = setTimeout(() => {
    document.querySelector(".activity").textContent = "";
  }, 1000);
  document.querySelector(".activity").textContent = `${name} is typing...`;
});
