import { Socket } from "socket.io";

export const desconnect = (client: Socket) => {
  client.on('disconnect', () => {
    console.log('Cliente desconectado');
  })
};
