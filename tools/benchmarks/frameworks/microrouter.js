import micro from "micro";
import microRouter, {router} from "microrouter";

const hello = async function (req, res) {
  return micro.send(res, 200, {hello: "world"});
};

const server = micro(router(microRouter.get("/", hello)));

server.listen(3000);
