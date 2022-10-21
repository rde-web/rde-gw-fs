import FSClient from "./src/grpc_client.mjs";
import Fastify from 'fastify'

const fastify = Fastify({
  logger: false
})

fastify.get('/ls', function (request, reply) {
    FSClient("127.0.0.1:9090").LS( //@todo get addr
        {
            path: request.query.path ? request.query.path: "",
            recursive: request.query.recursive ? request.query.recursive : false 
        }, function(err, files) {
            if (err) {
                reply.code(500) 
                reply.send(err)
            } else {
                reply.send(files)
            }
    });
})

fastify.listen({ port: 3000 }, function (err, address) { //@todo port from config
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
});