package grsu.helpdesk.service
import grsu.helpdesk.database.Mongo
import io.vertx.core.Future
import io.vertx.lang.groovy.GroovyVerticle

class UserService extends GroovyVerticle {

    @Override
    public void start(Future<Void> future) {
        def eb = vertx.eventBus()
        eb.consumer("user.get", { userInfo ->
            userInfo.reply('{"status" : "success", "token" : "123"}')
        })

        eb.consumer("user.add", { userInfo ->
            def userBody = userInfo.body()
            if (userBody.userName == null || userBody.userPassword == null) {
                return userInfo.reply(BaseResponse.failure("user.not.added", ""))
            }
            def newUser = [
                    username: userBody.userName,
                    password: userBody.userPassword
            ]
            Mongo.client.save("users", newUser, { insResult ->
                if (!insResult.succeeded())
                    return userInfo.reply(BaseResponse.failure("user.not.added", ""))
                def userId = insResult.result()
                Mongo.client.findOne("users", [_id: userId], null, { res ->
                    if (!res.succeeded())
                        return userInfo.reply(BaseResponse.failure("user.not.added", ""))
                    def userName = res.result().username
                    return userInfo.reply(BaseResponse.success("user.added", "${getKey()}"))
                })
            })
        })
        future.complete();
    }

    @Override
    public void stop(Future<Void> future) {
        println("Server stopping")
        future.complete()
    }
}
