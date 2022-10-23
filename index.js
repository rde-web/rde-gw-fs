import FSClient from "./src/grpc_client.mjs";
import Fastify from 'fastify'
import fastifyCors from "@fastify/cors";

function getFSClient(){
  return FSClient("127.0.0.1:9090"); //@todo get address from config
}

const fastify = Fastify({
  logger: false
})

fastify.get('/ls', function (request, reply) {
  let path = request.query.path;
  getFSClient().LS({path: path ? path : "", recursive: false}, function(err, files) {
    if (err) {
        reply.code(500);
        return reply.send(err);
    }
    reply.send(files);
  });
});

fastify.get('/touch', function (request, reply) {
  let path = request.query.path;
  if (path.length == 0) {
    reply.code(500);
    return reply.send("argument path is required");
  }
  getFSClient().Touch({path: path}, function(err, _) {
    if (err) {
        reply.code(500);
        return reply.send(err);
    }
    reply.code(200);
    reply.send();
  });
});

fastify.get('/cat', function (request, reply) {
  let path = request.query.path;
  if (path.length == 0) {
    reply.code(500);
    return reply.send("argument path is required");
  } 
  getFSClient().Cat({path: path}, function(err, content) {
    if (err) {
        reply.code(500);
        return reply.send(err);
    }
    reply.send(content);
  });
});

fastify.register(fastifyCors, {}).then(_ => fastify.listen(
  { port: 3003 },
  function (err, _) { //@todo port from config
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
));