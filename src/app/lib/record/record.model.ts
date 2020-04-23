import * as moment from 'moment';


export class RecordModel {

    constructor(init?: Partial<RecordModel>) {
        if (!!init) {
            Object.assign(this, init);
        }
    }

    value = '';

    timestamp = moment().valueOf();
}
