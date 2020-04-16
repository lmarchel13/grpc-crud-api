const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const { join } = require("path");

const filename = join(__dirname, "customers.proto");
const options = { keepCase: true, longs: String, enums: String, arrays: true };
const definition = protoLoader.loadSync(filename, options);

module.exports = grpc.loadPackageDefinition(definition);
