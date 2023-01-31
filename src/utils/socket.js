import { io } from "socket.io-client";
import { REACT_APP_WS_URL } from "@env";
const socket = io.connect(REACT_APP_WS_URL);
export default socket;