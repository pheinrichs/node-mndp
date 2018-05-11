const mndp = require('./dist/index').NodeMndp;

const test = new mndp({
    port:5678,
    version: 'udp4'
});

test.on('deviceFound', (output) => {
    console.log('badaboom we found ' + JSON.stringify(output));
});

test.on('started', (output) => {
    console.log(output);
});

test.on('error', (output) => {
    console.log(output);
});


test.start();
