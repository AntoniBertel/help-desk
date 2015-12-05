package grsu.helpdesk.main

import grsu.helpdesk.database.Mongo
import io.vertx.groovy.ext.mongo.MongoClient

Mongo.client = MongoClient.createNonShared(vertx, [db_name: "demo"])


vertx.deployVerticle("groovy:grsu.helpdesk.dsl.Parser")
vertx.deployVerticle("groovy:grsu.helpdesk.server.Server")
vertx.deployVerticle("groovy:grsu.helpdesk.service.UserService")