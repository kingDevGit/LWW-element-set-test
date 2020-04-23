import { NgModule, Optional, SkipSelf, Provider } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { WINDOW } from './window-ref';

export function windowFactory() {
    return window;
}

export function documentFactory() {
    return document;
}

export const SharedProviders: Provider[] = [
    { provide: WINDOW, useFactory: windowFactory },
    { provide: DOCUMENT, useFactory: documentFactory },
];

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: SharedProviders
})
export class SharedModule {

    constructor(
        @Optional() @SkipSelf() parentModule: SharedModule
    ) {
        if (parentModule) {
            throw new Error('SharedModule is already loaded. Import it in the AppModule only.');
        }
    }
}
