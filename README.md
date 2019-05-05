# Tp1backoffice

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# HOW TO

## Generar un componente

```
$ ng generate component <component_name>
```

## Generar un servicio

```
$ ng generate service <service_name>
```

## Agregar el routing

```
$ ng generate module <module_name>  --flat --module=app
```

* <module_name> que usé es *app-routing* para el Router.
* *--flat* es para que no lo ponga en src/module-name sino en src/
* *--module=app* para que lo agregue a los imports en AppModule
