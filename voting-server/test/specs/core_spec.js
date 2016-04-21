import {expect} from "chai";
import {List, Map} from "immutable";

import {setEntries, next, vote} from "../../src/core";

describe("app logic", () => {
    describe("setEntries", () => {
        it("adds the entries to the state", () => {
            const state = Map();
            const entries = ["HRD", "Hennessy's"];
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries : List.of("HRD", "Hennessy's")
            }));
        }); 
    });

    describe("next", () => {
        it("takes the next two entries under vote", () => {
            const state = Map({
                entries : List.of("HRD", "Henessey's", "Little Skillet")
            });
            const nextState = next(state);
            
            expect(nextState).to.equal(Map({
                vote : Map({
                    pair : List.of("HRD", "Henessey's")
                }),
                entries : List.of("Little Skillet")
            }));
        });
    });

    describe("vote", () => {
        it("creates a tally for the voted entry", () => {
            const state = Map({
                vote : Map({
                    pair : List.of("HRD", "Henessey's")
                }),
                entries : List()
            });
            const nextState = vote(state, "HRD"); 

            expect(nextState).to.equal(Map({
                vote : Map({
                    pair : List.of("HRD", "Henessey's"),
                    tally : Map({
                        "HRD" : 1
                    })
                }),
                entries : List()
            }));
        });
        
        it("adds to existing tally for the voted entry", () => {
            const state = Map({
                vote : Map({
                    pair : List.of("HRD", "Henessey's"),
                    tally : Map({
                        "HRD" : 1,
                        "Henessey's" : 3
                    })
                }),
                entries : List()
            });
            const nextState = vote(state, "HRD"); 

            expect(nextState).to.equal(Map({
                vote : Map({
                    pair : List.of("HRD", "Henessey's"),
                    tally : Map({
                        "HRD" : 2,
                        "Henessey's" : 3
                    })
                }),
                entries : List()
            }));
        });
    });
});
