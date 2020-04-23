import { Injectable, } from '@angular/core';
import { DictionaryState } from './dictionary.state';
import { DictionaryModel } from './dictionary.model';
import { RecordModel } from '../record/record.model';

@Injectable({
    providedIn: 'root'
})

export class DictionaryService {

    constructor(
        public state: DictionaryState
    ) {
    }

    init() {
        this.state.init();
    }

    createDictionary() {
        const key = this._makeKey(6);
        this.state.setDictionaries(key, new DictionaryModel());
        return key;
    }

    loadDictionary(key: string) {
        return this.state.getDictionaries(key);
    }

    private _makeKey(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    mergeDictionary(key1, key2) {
        const dict1 = this.loadDictionary(key1);
        const dict2 = this.loadDictionary(key2);

        const newKey = this.createDictionary();
        const newDict = this.loadDictionary(newKey);

        newDict.addSet = this._mergeSet(dict1.addSet, dict2.addSet);
        newDict.removeSet = this._mergeSet(dict1.removeSet, dict2.removeSet);

        return newKey;
    }

    _mergeSet(a1: RecordModel[], a2: RecordModel[]) {

        const concatSet = a1.concat(a2);

        const result: RecordModel[] = Object.values(concatSet.reduce((a, { value, timestamp }) => {
            if (a[value]) {
                if (a[value].timestamp < timestamp) {
                    a[value] = new RecordModel({
                        value, timestamp
                    });
                }
            } else {
                a[value] = new RecordModel({
                    value, timestamp
                });
            }
            return a;
        }, {}));

        return result;
    }
}
