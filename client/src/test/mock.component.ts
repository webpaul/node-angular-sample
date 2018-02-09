import { Component } from '@angular/core';

export function MockComponent(options: Component, inheritFrom: any = null) {
    options.template = options.template || '';
    
    //if(inheritFrom == null) inheritFrom = new Object();

    @Component(options)
    class retVal {} //extends inheritFrom

    return retVal;
}
