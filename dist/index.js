"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = require("dgram");
const events = require("events");
const Discovery_1 = require("./Discovery");
class NodeMndp extends events.EventEmitter {
    constructor(options) {
        super();
        this.default = {
            port: 5678,
            host: '0.0.0.0',
            version: 'udp4'
        };
        this.version = options.version || this.default.version;
        this.server = dgram.createSocket(this.version);
        this.port = options.port || this.default.port;
        this.host = options.host || this.default.host;
        this.started = false;
        this.registerListeners();
    }
    /**
     * Start the server
     */
    start() {
        if (this.server) {
            this.started = true;
            this.server.bind(this.port, this.host);
        }
    }
    /**
     * Stop the server
     */
    stop() {
        if (this.server && this.started) {
            this.server.close();
            this.started = false;
        }
    }
    /**
     * Initalize Listeners
     */
    registerListeners() {
        this.server.on('message', (msg, rinfo) => {
            let device = new Discovery_1.Discovery(msg, rinfo);
            device.output((device) => {
                this.emit('deviceFound', device);
            });
        });
        this.server.on('error', (msg, rinfo) => {
            this.emit('error', msg);
            this.stop();
        });
        this.server.on('listening', (msg, rinfo) => {
            this.emit('started', `Listening on ${this.server.address().address}:${this.server.address().port}`);
            this.server.setBroadcast(true);
        });
    }
}
exports.NodeMndp = NodeMndp;
