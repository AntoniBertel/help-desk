package grsu.helpdesk.dsl.structure

import grsu.helpdesk.dsl.parser.Callable

class Fields extends Callable {
    def methodMissing(String name, args) {
        Field field = new Field();
        Closure closure = args.getAt(0) as Closure
        field.call(closure)
        fields.add(field)
//        Field field = new Field()
//        Binding binding = new Binding()
//        binding.setVariable(name, field);
////
//        GroovyShell shell = new GroovyShell(binding);
//        Script dslScript = shell.parse(args[0])
//        dslScript.run()
    }
    List<Field> fields = []

    def Field get(Integer number) {
        fields[number]
    }
}