package grsu.helpdesk.dsl

import grsu.helpdesk.dsl.structure.Claim
import io.vertx.core.Future
import io.vertx.lang.groovy.GroovyVerticle

class Parser extends GroovyVerticle {
    long timerId = -1;

    @Override
    public void start(Future<Void> future) {
        setupParseTimer()
        future.complete()
    }

    private void setupParseTimer() {
        timerId = vertx.setPeriodic(100000, { id ->
            parse()
            vertx.cancelTimer(timerId)
        })
    }

    private void parse() {
        println("Parser starting")
        File file = new File("./resources/dsl/test.cl")
        Claim claim = new Claim()
        Binding binding = new Binding()
        binding.setVariable("claim", claim);

        GroovyShell shell = new GroovyShell(binding);
        Script dslScript = shell.parse(file.text)

        dslScript.run()
    }

    @Override
    public void stop(Future<Void> future) {
        vertx.cancelTimer(timerId);
        println("Parser stopping")
        future.complete()
    }
}