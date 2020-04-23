import { Injectable, Inject } from '@angular/core';
import { WINDOW, WindowRef } from '../window-ref';
import { State } from '../state';
import { DictionaryModel } from './dictionary.model';

const dictionariesListKey = 'dictionariesList';

@Injectable({
    providedIn: 'root'
})

export class DictionaryState extends State {

    constructor(@Inject(WINDOW) window: WindowRef) {
        super('dictionary', window);
    }

    init() {
        this.initState();
        this.dictionariesKeyList = [];
    }

    setDictionaries(key: string, value: DictionaryModel) {
        this.setState(`dict-${key}`, value);
        if (this.dictionariesKeyList.indexOf(key) === -1) {
            this.dictionariesKeyList.push(key);
        }
    }

    getDictionaries(key: string) {
        return this.getState<DictionaryModel>(`dict-${key}`);
    }

    get dictionariesKeyList() {
        return this.getState(dictionariesListKey);
    }

    set dictionariesKeyList(value: string[]) {
        this.setState(dictionariesListKey, value);
    }



}
