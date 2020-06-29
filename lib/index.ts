import * as dgram from "dgram";
import * as events from "events";
import { EventEmitter } from "events";

import { Options } from './interfaces/options';

import { Discovery } from './Discovery';

export class NodeMndp extends events.EventEmitter {
    server: any;
    default: Options = {
        port: 5678,
        host: '0.0.0.0',
        version: 'udp4'
    };

    port: undefined | number;
    host: undefined | string;
    started: undefined | boolean;
    version: dgram.SocketType;

    constructor(options: Options) {
        super();

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
    start(): void
    {
        if (this.server) {
            this.started = true;
            this.server.bind(this.port, this.host)
        }
    }

    /**
     * Stop the server
     */
    stop(): void
    {
        if (this.server && this.started) {
            this.server.close();
            this.started = false;
        }
    }

    /**
     * Initalize Listeners
     */
    private registerListeners(): void
    {
        this.server.on('message', (msg: any, rinfo: any) => {
            let device = new Discovery(msg, rinfo);
            device.output((device) => {
                this.emit('deviceFound', device);
            })
        })

        this.server.on('error', (msg: any, rinfo: any) => {
            this.emit('error', msg);
            this.stop();
        })

        this.server.on('listening', (msg: any, rinfo: any) => {
            this.emit('started',`Listening on ${this.server.address().address}:${this.server.address().port}`);
            this.server.setBroadcast(true);
        })
    }
}