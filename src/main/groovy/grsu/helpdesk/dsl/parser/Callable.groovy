package grsu.helpdesk.dsl.parser

abstract  class Callable {
    def call(Closure cl) {
        cl.setDelegate(this);
        cl.setResolveStrategy(Closure.DELEGATE_ONLY)
        cl.call();
    }
}
