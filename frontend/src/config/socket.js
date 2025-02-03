import socket from 'socket.io-client';
 let  socketInstance = null;
 export const initializeSocket = (projectId) => {
     socketInstance = socket(import.meta.env.VITE_BASE_URL, {
         auth: {
             token: localStorage.getItem('token')
         },
         query: {
             projectId: projectId
         }
     });

     return socketInstance;
 };


 export const  receivemessage = (eventName) =>{
    socketInstance.on(eventName, (message) => {
        console.log("nppfdfd");
        console.log("Received message:", message);
    });
 }
 export const  sendMessage = (eventName, message) =>{
    socketInstance.emit(eventName, message);
 }