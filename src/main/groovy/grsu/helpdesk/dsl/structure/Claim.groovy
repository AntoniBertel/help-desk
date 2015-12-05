package grsu.helpdesk.dsl.structure

import grsu.helpdesk.dsl.parser.Callable

class Claim extends Callable {
    void fields(Closure closures) {
        this.fields = new Fields()
        Closure code = closures.rehydrate(fields, this, this)
        this.fields.call(code)
    }

    void name(String name) { this.name = name }
    String name
    Fields fields
}