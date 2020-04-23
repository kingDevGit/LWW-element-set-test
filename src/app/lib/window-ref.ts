import { InjectionToken } from '@angular/core';

export class WindowRef extends Window {
    [key: string]: any;
}

export const WINDOW = new InjectionToken<WindowRef>('WindowToken');
