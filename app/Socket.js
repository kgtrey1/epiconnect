import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect('ws://192.168.1.3:4242');
export const SocketContext = React.createContext();