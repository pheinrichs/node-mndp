# Node MNDP
`Mikrotik Network Discovery Protocol`

This is an implementation written in Node


### Usage Example
```
var NodeMndp = require('node-mndp');
var discovery = new NodeMndp({
    port: 5678
});

discovery.on('deviceFound', (device) => {
    // retrieve found device here
})

discovery.start();
```

Ipv6 Example
```
var NodeMndp = require('node-mndp');
var discovery = new NodeMndp({
    port: 5678,
    host: "::",
    version: "udp6"
});

discovery.on('deviceFound', (device) => {
    // retrieve found device here
})

discovery.start();
```
### API
```
var NodeMndp = require('node-mndp');
var discovery = new NodeMndp({
    port: 5678
});
```

#### discovery.constructor({options: Options})
```
options {
    `host` : default = 0.0.0.0
    `port` : default = 5678
    `version` : default = udp4
}
```

#### discovery.start() -> void

#### discovery.stop() -> void

#### Event: 'deviceFound'
```

Output:
{
    "ipAddress":"192.168.88.1",
    "macAddress":"aabbccddeeff",
    "identity":"Mikrotik",
    "version":"6.41.2 (stable)"
}

```
#### Event: 'error' -> string

#### Event: 'started' -> string

---
Pull requests are welcome!