const socket = new WebSocket("ws://localhost:3000");

function sendMessage(e) {
  e.preventDefault();
  const input = document.querySelector("input");
  let { value } = input;
  if (value) {
    socket.send(value);
    value = "";
  }
  input.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

// Listen for messages

socket.addEventListener("message", ({ data }) => {
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});
