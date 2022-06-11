import Koa from "koa";
import KoaRouter from "koa-router";

const router = KoaRouter();

const app = new Koa();

router.get("/", async function (ctx) {
  ctx.body = {hello: "world"};
});

app.use(router.routes());
app.listen(3000);
