import { io } from "socket.io-client";
const socket = io("http://localhost:9999");
socket.on("connect", () => {
  console.log("Connected to the server with socket ID:", socket.id);
});
export default socket;