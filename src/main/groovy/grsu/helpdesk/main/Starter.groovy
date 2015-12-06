package grsu.helpdesk.main

import grsu.helpdesk.database.Mongo
import io.vertx.groovy.ext.mongo.MongoClient

//TODO multiply configs
def localConfig = [db_name: "demo"]
Mongo.client = MongoClient.createNonShared(vertx, localConfig)


vertx.deployVerticle("groovy:grsu.helpdesk.dsl.Parser")
vertx.deployVerticle("groovy:grsu.helpdesk.server.Server")
vertx.deployVerticle("groovy:grsu.helpdesk.service.UserService")