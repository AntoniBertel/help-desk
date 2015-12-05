package grsu.helpdesk.server

import grsu.helpdesk.server.routing.UserRouting
import io.vertx.core.Future
import io.vertx.core.http.HttpMethod
import io.vertx.groovy.ext.web.Router
import io.vertx.groovy.ext.web.handler.StaticHandler
import io.vertx.lang.groovy.GroovyVerticle

class Server extends GroovyVerticle {

    @Override
    public void start(Future<Void> future) {
        def eventBus = vertx.eventBus();
        def Router mainApi = Router.router(vertx)
        def Router userApi = Router.router(vertx)
        mainApi.route("/*").handler(StaticHandler.create())

        UserRouting.route(userApi, eventBus)
        mainApi.route().method(HttpMethod.POST).handler({ routingContext ->
            routingContext.request().setExpectMultipart(true)
            routingContext.next()
        })
        mainApi.mountSubRouter(UserRouting.PATH, userApi)

        vertx.createHttpServer().requestHandler({ request -> mainApi.accept(request) }).listen(8080)
        future.complete()
    }

    @Override
    public void stop(Future<Void> future) {
        println("Server stopping")
        future.complete()
    }
}