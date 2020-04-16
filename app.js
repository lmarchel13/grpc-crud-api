const express = require("express");
const morgan = require("morgan");
const { grpcClient, grpcServer } = require("./grpc");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  grpcClient.getAll(null, (err, payload) => {
    if (!err) res.json(payload.customers);
  });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;

  grpcClient.get({ id }, (err, payload) => {
    if (!err) res.json(payload);
  });
});

app.post("/", (req, res) => {
  const { body } = req;

  grpcClient.insert(body, (err, payload) => {
    if (!err) res.json(payload);
  });
});

app.patch("/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  grpcClient.update({ ...body, id }, (err, payload) => {
    if (!err) res.json(payload);
  });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  grpcClient.remove({ id }, (err, payload) => {
    if (!err) res.json(payload);
  });
});

app.listen(3000, () => {
  grpcServer.start();
  console.log("Server running at port 3000");
});
