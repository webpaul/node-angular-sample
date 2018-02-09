import { Component } from '@angular/core';

export function MockComponent(options: Component, inheritFrom: any = null) {
    options.template = options.template || '';
    
    @Component(options)
    class retVal {}

    return retVal;
}
