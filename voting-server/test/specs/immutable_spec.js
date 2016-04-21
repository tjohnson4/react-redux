import {expect} from 'chai';
import {List} from "immutable";

describe("immutability", () => {
    describe("a Eatery", () => {
        function addEatery(currentState, eatery) {
            return currentState.set(
                "eateries",
                currentState.get("eateries").push(eatery)
            );
        }

        it("is immutable", () => {
            let state = Map({
                eateries : List.of("American Grilled Cheese", "HRD", "Hennesy's")
            });
            let nextState = addEatery(state, "Ozone");

            expect(state).to.equal(Map({ 
                eateries : List.of("American Grilled Cheese", "HRD", "Hennesy's")
            }));
            expect(nextState).to.equal(Map({ 
                eateries : List.of("American Grilled Cheese", "HRD", "Hennesy's", "Ozone")
            }));
        });
    });
});
