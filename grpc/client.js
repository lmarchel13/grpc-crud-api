const grpc = require("grpc");

const config = require("../config");
const {
  CustomerProto: { CustomerService },
} = require("../proto");

module.exports = new CustomerService(config.GRPC_DOMAIN, grpc.credentials.createInsecure());
