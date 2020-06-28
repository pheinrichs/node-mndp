/// <reference types="node" />
import * as dgram from "dgram";
import * as events from "events";
import { Options } from './interfaces/options';
export declare class NodeMndp extends events.EventEmitter {
    server: any;
    default: Options;
    port: undefined | number;
    host: undefined | string;
    started: undefined | boolean;
    version: dgram.SocketType;
    constructor(options: Options);
    /**
     * Start the server
     */
    start(): void;
    /**
     * Stop the server
     */
    stop(): void;
    /**
     * Initalize Listeners
     */
    private registerListeners();
}
