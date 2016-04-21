import {List, Map} from "immutable";

/**
* Method for adding entries to a state object. 
* Allow iterable js objects and cast as an immutable list. 
*
* @method setEntries
* @param state {Map} The state object
* @param entries {Array} The list of entries to add a state object
* @return The updated state object
*/ 
export function setEntries(state, entries) {
    return state.set("entries", List(entries));
}

/**
* Method seperates out the current items to be voted on 
* from the entries list of the state object
*
* @method next
* @param {Map} state The state object
* @return The updated state object
*/
export function next(state) {
    const entries = state.get("entries");

    return state.merge({
        vote : Map({
            pair : entries.take(2)
        }),
        entries : entries.skip(2)
    });
}

export function vote(state, entry) {
    return state.updateIn(
        ["vote", "tally", entry],
        0,
        tally => tally + 1
    );
}
