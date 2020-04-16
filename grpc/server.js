const grpc = require("grpc");
const { v4: uuidv4 } = require("uuid");

const errors = require("../errors");
const { CustomerProto } = require("../proto");
const { customers } = require("../database");
const config = require("../config");

const server = new grpc.Server();

server.addService(CustomerProto.CustomerService.service, {
  getAll: (call, callback) => {
    callback(null, { customers });
  },

  get: (call, callback) => {
    const customer = customers.find((customer) => customer.id === call.request.id);

    customer ? callback(null, customer) : callback(errors.GRPC_NOT_FOUND);
  },

  insert: (call, callback) => {
    const customer = { ...call.request, id: uuidv4() };
    customers.push(customer);
    callback(null, customer);
  },
  update: (call, callback) => {
    const customer = customers.find((customer) => customer.id === call.request.id);

    if (customer) {
      const updateCustomer = { ...customer, ...call.request };
      return callback(null, updateCustomer);
    }

    callback(errors.GRPC_NOT_FOUND);
  },
  remove: (call, callback) => {
    const index = customers.findIndex((customer) => customer.id === call.request.id);

    if (index !== -1) {
      customers.splice(index, 1);
      return callback(null, {});
    }

    callback(errors.GRPC_NOT_FOUND);
  },
});

server.bind(config.GRPC_DOMAIN, grpc.ServerCredentials.createInsecure());

module.exports = {
  start() {
    server.start();
    console.log("gRPC server running at http://localhost:50051");
  },
};
