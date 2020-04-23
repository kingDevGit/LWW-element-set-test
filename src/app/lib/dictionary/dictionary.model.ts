import { RecordModel } from '../record/record.model';
import { cloneDeep } from 'lodash-es';
import * as moment from 'moment';

export class DictionaryModel {

    addSet: RecordModel[] = [];

    removeSet: RecordModel[] = [];

    public add(value: string, timestamp?: number) {
        const record = this.addSet.find(item => item.value === value);
        if (!record) {
            this.addSet.push(!!timestamp ? new RecordModel({ value, timestamp }) : new RecordModel({ value }));
        } else {
            record.timestamp = timestamp && timestamp > record.timestamp ? timestamp : moment().valueOf();
        }
    }

    public remove(value: string, timestamp?: number) {
        const record = this.removeSet.find(item => item.value === value);
        if (!record) {
            this.removeSet.push(!!timestamp ? new RecordModel({ value, timestamp }) : new RecordModel({ value }));
        } else {
            record.timestamp = timestamp && timestamp > record.timestamp ? timestamp : moment().valueOf();
        }
    }

    public get querySet() {
        const list: RecordModel[] = cloneDeep(this.addSet);

        return list.filter((i) => {
            const shouldRemoved = this.removeSet.find(r => (r.value === i.value) && (r.timestamp >= i.timestamp));
            return !shouldRemoved;
        })
            ;
    }

}
