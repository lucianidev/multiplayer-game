import Player from './player'

class Client {
    constructor() {
        this.url = 'ws://localhost:8080';
        this.socket = new WebSocket(this.url);
        this.data = null; // recived data from the server
    }

    async onConnect(callback) {
        this.socket.addEventListener('open', () => {
            callback();
        })
        return this;
    }
    // set the data that have to be sent to the server
    setData(data) {
        this.data = data;
        return this;
    }
    // checks if the socket is open
    isOpen() {
        if(this.socket.readyState != this.socket.OPEN) {
            return false
        } else {
            return true;
        }
    }

    //  execute the code if the socket is open
    onMessage(callback) {
        if(!this.isOpen) return this;

        this.socket.addEventListener('message', (event) => {
            callback(event);
        });

        return this;
    }

    send() {
        if(this.socket.readyState === 4) return this;
        this.socket.send(this.data);
        return this;
    }
}

export default Client;