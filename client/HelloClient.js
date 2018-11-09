const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = '../proto/HelloService.proto';
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const helloServiceProto = grpc.loadPackageDefinition(packageDefinition).nodegrpc;

function main() {
    var client = new helloServiceProto.HelloService('localhost:50051',
        grpc.credentials.createInsecure());

    client.hello({firstName: "Raju", lastName: "MLN" }, function(err, response) {
        console.log('Greeting:', response);
    });
}

main();