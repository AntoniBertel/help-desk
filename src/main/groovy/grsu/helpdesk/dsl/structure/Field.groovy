package grsu.helpdesk.dsl.structure

import grsu.helpdesk.dsl.parser.Callable

class Field extends Callable {
    void name(String name) { this.name = name }
    def name

    void type(String type) { this.type = type }
    def type
}
