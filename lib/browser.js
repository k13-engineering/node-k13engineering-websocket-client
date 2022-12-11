const connect = ({ url, onOpen, onClose, onError, onMessage }) => {
    if (!onError) {
        throw Error(`onError listener missing`);
    }

    const browserWebsocket = new window.WebSocket(url);
    browserWebsocket.onopen = () => {
        onOpen();
    };
    browserWebsocket.onerror = (error) => {
        onError({ error });
    };
    browserWebsocket.onmessage = (event) => {
        onMessage({ message: event.data });
    };
    browserWebsocket.onclose = () => {
        onClose();
    };

    const send = ({ messageAsString }) => {
        browserWebsocket.send(messageAsString);
    };

    const close = () => {
        browserWebsocket.close();
    };

    return {
        send,

        close
    };
};

export default {
    connect
};
