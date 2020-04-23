// #region vendor imports
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { isString } from 'lodash-es';
// #endregion

// #region weblib imports
import { WindowRef } from './window-ref';
import { take } from 'rxjs/operators';
// #endregion

const stateKey = 'state';

/**
 * This base class for state services is intended to provide methods for storing state on the DOM that should persist
 * between multiple instances of the state service.
 *
 * Subjects are useful for asynchronous behaviour like services making an API call then updating state
 * with results that listeners across components can subscribe to. BehaviorSubject or caching of last emitted value
 * is useful for displaying old data while the user waits for updated data to be retrieved from API.
 */
export abstract class State {

    constructor(
        /** Namespace used as property in the global state object to isolate scope from other state services. */
        protected ns: string,
        /** Reference to the browser's window object to store application state on a `state` property. */
        protected window: WindowRef
    ) {
        // Store state in a global variable, initialize if does not exist.
        if (!window[stateKey]) {
            window[stateKey] = {};
        }
        if (!window[stateKey][ns]) {
            window[stateKey][ns] = {};
        }
    }

    private get _state() {
        return this.window[stateKey][this.ns];
    }

    /** Get an item stored in the global state. */
    protected getState<T>(key: string) {
        return <T>this._state[key];
    }

    /** Set an item to be stored in the global state. */
    protected setState(key: string, item: any) {
        this._state[key] = item;
    }

    /** Clear the item stored in the global state. */
    protected clearState(key: string) {
        delete this._state[key];
    }

    /** Clear the WHOLE state.  All items inside this state would be wiped out */
    protected initState() {
        this.window[stateKey][this.ns] = {};
    }

}
