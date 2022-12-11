let connect = undefined;

if (typeof window === "undefined") {
    const { WebSocket } = await import("ws");

    connect = ({ url, rejectUnauthorized, onOpen, onClose, onError, onMessage }) => {
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
} else {
    connect = ({ url, onOpen, onClose, onError, onMessage }) => {
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
}

export default {
    connect
};
