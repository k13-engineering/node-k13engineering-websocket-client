import websocketFactory from "../lib/index.js";

const socket = websocketFactory.connect({
    url: "ws://localhost:8080/echo",

    onOpen: () => {
        console.log("socket opened");
    },

    onError: ({ error }) => {
        console.error("socket error", error.stack);
    },

    onMessage: ({ message }) => {
        console.log("received:", message);
    },

    onClose: () => {
        console.log("socket closed");
    }
});

setInterval(() => {
    const messageAsJSON = {
        hello: "world"
    };

    const messageAsString = JSON.stringify(messageAsJSON);

    console.log("sending:", messageAsString);

    socket.send({
        messageAsString
    });
}, 1000).unref();
