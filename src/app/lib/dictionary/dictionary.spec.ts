import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DictionaryService } from './dictionary.service';
import { AppModule } from '../../app.module';
import * as moment from 'moment';
import { DictionaryState } from './dictionary.state';
import { DictionaryTestService } from './dictionary.test.service';

const context = describe;
describe('Dictionary Service', () => {

    let service: DictionaryService;
    let state: DictionaryState;
    let testService: DictionaryTestService;
    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [
                DictionaryService,
                DictionaryState,
                DictionaryTestService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        service = TestBed.get(DictionaryService);
        state = TestBed.get(DictionaryState);
        testService = TestBed.get(DictionaryTestService);
        service.init();
    });

    describe('Init & Basic operation', () => {
        it('Can create dictionary', () => {
            service.init();
            service.createDictionary();
            expect(state.dictionariesKeyList.length).toEqual(1);
        });

        it('Can add element into the ADD set', () => {
            service.init();
            const dict1Key = service.createDictionary();
            const dict1 = service.loadDictionary(dict1Key);
            dict1.add('testing');

            const targetInAddSet = dict1.addSet.find(e => e.value === 'testing');
            const targetInQuerySet = dict1.querySet.find(e => e.value === 'testing');
            expect(!!targetInAddSet && !!targetInQuerySet).toBeTruthy();
        });


        it('Can add element into the REMOVE set', () => {
            service.init();
            const dict1Key = service.createDictionary();
            const dict1 = service.loadDictionary(dict1Key);
            dict1.remove('testing');

            const targetInRemoveSet = dict1.removeSet.find(e => e.value === 'testing');
            const targetInQuerySet = dict1.querySet.find(e => e.value === 'testing');
            expect(!!targetInRemoveSet && !targetInQuerySet).toBeTruthy();
        });

        it('Can update element in set', () => {
            service.init();
            const dict1Key = service.createDictionary();
            const dict1 = service.loadDictionary(dict1Key);
            dict1.add('testing');

            const testingTimestamp = moment().valueOf() + 3000;
            dict1.add('testing', testingTimestamp);

            dict1.addSet.filter(e => e.value === 'testing');

            expect(dict1.addSet.length === 1 && dict1.addSet[0].timestamp === testingTimestamp
            ).toBeTruthy();

        });
    });

    describe('Dictionary scenerios', () => {
        it('Can correctly remove an exist element', () => {

            const spy = spyOn(testService, '_testFail').and.callFake(() => {
            });
            testService.test1();
            expect(spy).not.toHaveBeenCalled();
        });

        it('Can add back the element after it was deleted', () => {

            const spy = spyOn(testService, '_testFail').and.callFake(() => {
            });
            testService.test2();
            expect(spy).not.toHaveBeenCalled();
        });

        it('Merge two dictionaries while dictionary 1 is adding elements and dictionary 2 is able to delete them with a bigger timestamp'
            , () => {

                const spy = spyOn(testService, '_testFail').and.callFake(() => {
                });
                testService.test3();
                expect(spy).not.toHaveBeenCalled();
            });


        it('Merge two dictionaries while dictionary 1 is removing elements and dictionary 2 is able to add them with a smaller timestamp.'
            , () => {
                service.init();
                const dict1Key = service.createDictionary();
                const dict1 = service.loadDictionary(dict1Key);
                dict1.remove('Lumberjack');
                dict1.remove('Robin hood');

                const dict2Key = service.createDictionary();
                const dict2 = service.loadDictionary(dict2Key);
                dict2.add('Lumberjack', moment().valueOf() + 1000);
                dict2.add('Robin hood', moment().valueOf() + 1000);
                dict2.add('I r winner');

                const dict3Key = service.mergeDictionary(dict1Key, dict2Key);
                const dict3 = service.loadDictionary(dict3Key);

                expect(dict3.querySet.length).toEqual(3);
            });

        it('Merging two dictionaries which are adding the same element with different timestamp', () => {
            service.init();
            const dict1Key = service.createDictionary();
            const dict1 = service.loadDictionary(dict1Key);
            dict1.add('Lumberjack');

            const dict2Key = service.createDictionary();
            const dict2 = service.loadDictionary(dict2Key);
            dict2.add('Lumberjack', moment().valueOf() + 1000);

            const dict3Key = service.mergeDictionary(dict1Key, dict2Key);
            const dict3 = service.loadDictionary(dict3Key);

            expect(dict3.querySet.length).toEqual(1);
        });

        it('Merging two dictionaries which are adding the same element with same timestamp and bias come effect', () => {
            service.init();
            const dict1Key = service.createDictionary();
            const dict1 = service.loadDictionary(dict1Key);
            dict1.add('Lumberjack', 1000);

            const dict2Key = service.createDictionary();
            const dict2 = service.loadDictionary(dict2Key);
            dict2.remove('Lumberjack', 1000);

            const dict3Key = service.mergeDictionary(dict1Key, dict2Key);
            const dict3 = service.loadDictionary(dict3Key);

            expect(dict3.querySet.length).toEqual(0);
        });
    });
});
