import store, { addEntry } from '../redux/store';
const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("updateNearby", entry => {
  console.log(entry)
  store.dispatch(addEntry(entry))
  
});



export default socket;
