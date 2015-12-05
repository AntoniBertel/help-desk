package grsu.helpdesk.server.routing

import io.vertx.groovy.core.eventbus.EventBus
import io.vertx.groovy.ext.web.Router


class UserRouting {

    final static PATH = "/users"

    static public route(Router userRouter, EventBus eventBus) {
        userAll(userRouter)
        userGet(userRouter, eventBus);
        userPost(userRouter, eventBus);
    }


    static private userAll(Router router) {
        router.route().handler({ routingContext ->
            def response = routingContext.response()
            response.setChunked(true)
            response.putHeader("content-type", "application/json");
            routingContext.next()
        })
    }

    static private userGet(Router router, EventBus eventBus) {
        router.get("/").handler({ rC ->
            def userName = rC.request().getParam('userName')
            def userPassword = rC.request().getParam('userPassword')
            def response = rC.response()
            eventBus.send("user.get", [userName: userName, userPassword: userPassword], { sR ->
                if (sR.succeeded()) {
                    response.write(sR.result().body())
                }
                response.end()
            })
        })
    }

    static private userPost(Router router, EventBus eventBus) {
        router.post("/").handler({ rC ->
            def request = rC.request()
            request.endHandler({ v ->
                def formAttributes = request.formAttributes()
                def userName = formAttributes.get("userName")
                def userPassword = formAttributes.get('userPassword')
                def response = rC.response()
                eventBus.send("user.add", [userName: userName, userPassword: userPassword], { sR ->
                    if (sR.succeeded()) {
                        response.write(sR.result().body())
                    }
                    response.end()
                })
            })
        })
    }

}
