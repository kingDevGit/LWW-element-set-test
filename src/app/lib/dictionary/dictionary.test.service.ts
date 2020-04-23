import * as moment from 'moment';
import { Injectable, Inject } from '@angular/core';
import { DictionaryService } from './dictionary.service';
import { WINDOW, WindowRef } from '../window-ref';

@Injectable({
    providedIn: 'root'
})

export class DictionaryTestService {

    constructor(
        private dictionaryService: DictionaryService,
        @Inject(WINDOW) private window: WindowRef
    ) {

    }

    public test1() {
        const dict1Key = this.dictionaryService.createDictionary();
        const dict1 = this.dictionaryService.loadDictionary(dict1Key);
        dict1.add('Lumberjack');
        dict1.add('Robin hood');
        dict1.add('Black death');
        dict1.add('I r winner');
        dict1.add('howdoyouturnthison');
        dict1.remove('howdoyouturnthison', moment().valueOf() + 1000);

        if (!dict1.querySet.find(r => r.value === 'howdoyouturnthison')) {
            return this.window.__karma__
                ? void 0
                : alert(`Test dictionary ${dict1Key} created. Test successfully passed.`);
        }
        return this._testFail();
    }

    public test2() {
        const dict1Key = this.dictionaryService.createDictionary();
        const dict1 = this.dictionaryService.loadDictionary(dict1Key);
        dict1.add('Lumberjack');
        dict1.add('Robin hood');
        dict1.add('Black death');
        dict1.add('I r winner');
        dict1.add('howdoyouturnthison');
        dict1.remove('howdoyouturnthison', moment().valueOf() + 1000);
        dict1.add('howdoyouturnthison', moment().valueOf() + 3000);

        if (dict1.querySet.find(r => r.value === 'howdoyouturnthison')) {
            return this.window.__karma__
                ? void 0
                : alert(`Test dictionary ${dict1Key} created. Test successfully passed.`);
        }
        return this._testFail();
    }

    public test3() {
        const dict1Key = this.dictionaryService.createDictionary();
        const dict1 = this.dictionaryService.loadDictionary(dict1Key);
        dict1.add('Lumberjack');
        dict1.add('Robin hood');

        const dict2Key = this.dictionaryService.createDictionary();
        const dict2 = this.dictionaryService.loadDictionary(dict2Key);
        dict2.remove('Lumberjack', moment().valueOf() + 1000);
        dict2.remove('Robin hood', moment().valueOf() + 1000);
        dict2.add('I r winner');

        const dict3Key = this.dictionaryService.mergeDictionary(dict1Key, dict2Key);
        const dict3 = this.dictionaryService.loadDictionary(dict3Key);



        if (dict3.querySet.length === 1 && dict3.querySet[0].value === 'I r winner') {
            return this.window.__karma__
                ? void 0
                : alert(`Test dictionary ${dict1Key}, ${dict2Key} were created and merged in ${dict3Key}. Test successfully passed.`);
        }
        return this._testFail();

    }

    _testFail() {
        alert('Test failed');
    }
}
