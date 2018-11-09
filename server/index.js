const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = "../proto/HelloService.proto";
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const helloServiceProto = grpc.loadPackageDefinition(packageDefinition).nodegrpc;

/**
 * Implements the sayGreetingMessage RPC method.
 */
function sayGreetingMessage(helloRequest, cb){
        console.log(helloRequest);
        return cb(null, {greeting: "fhjkdh"});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
    var server = new grpc.Server();
    server.addService(helloServiceProto.HelloService.service, { hello: sayGreetingMessage});
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    console.log("server started");
}

main();

/*
syntax = "proto3";

option java_multiple_files = true;
option java_package = "io.grpc.examples.helloworld";
option java_outer_classname = "HelloWorldProto";
option objc_class_prefix = "HLW";

package helloworld;

// The greeting service definition.
service Greeter {
    // Sends a greeting
    rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
    string name = 1;
}

// The response message containing the greetings
message HelloReply {
    string message = 1;
}*/
