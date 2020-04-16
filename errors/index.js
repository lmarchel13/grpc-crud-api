const grpc = require("grpc");

module.exports = {
  GRPC_NOT_FOUND: { code: grpc.status.NOT_FOUND, message: "Resource not found" },
};
