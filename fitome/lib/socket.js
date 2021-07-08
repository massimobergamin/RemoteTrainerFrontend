import { io } from 'socket.io-client';

export const socket = io('https://remotetrainerserver.herokuapp.com/');