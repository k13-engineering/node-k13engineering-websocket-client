import { WebSocket } from "ws";

const connect = ({ url, rejectUnauthorized, onOpen, onClose, onError, onMessage }) => {
    if (!onError) {
        throw Error(`onError listener missing`);
    }

    const nodeWebsocket = new WebSocket(url, {
        rejectUnauthorized
    });
    nodeWebsocket.onopen = () => {
        onOpen();
    };
    nodeWebsocket.onerror = (error) => {
        onError({ error });
    };
    nodeWebsocket.onmessage = (event) => {
        onMessage({ message: event.data });
    };
    nodeWebsocket.onclose = () => {
        onClose();
    };

    const send = ({ messageAsString }) => {
        nodeWebsocket.send(messageAsString);
    };

    const close = () => {
        nodeWebsocket.close();
    };

    return {
        send,

        close
    };
};

export default {
    connect
};
