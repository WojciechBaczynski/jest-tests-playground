const { createAbvParameter, createBeerContainer } = require("./script.js");

describe("Beer display module", () => {
    test("1 to be 1", () => {
        expect(1).toBe(1)
    });

    test("createAbvParameter with selected option 1 returns expected text", () => {
        expect(createAbvParameter(1)).toBe('&abv_lt=4');
    });

    test("createAbvParameter with selected option 2 returns expected text", () => {
        expect(createAbvParameter(2)).toBe('&abv_lt=6&abv_gt=4');
    });

    test("createAbvParameter with selected option 3 returns expected text", () => {
        expect(createAbvParameter(3)).toBe('&abv_gt=6');
    });

    test("createAbvParameter with selected option 0 returns false", () => {
        expect(createAbvParameter(0)).toBe(false);
    });

    test("createAbvParameter with selected option 10 returns false", () => {
        expect(createAbvParameter(10)).toBeFalsy();
    });

    test("createBeerContainer returns div element", () => {
        const result = createBeerContainer().nodeName;
        expect(result).toBe('DIV');
    });

    test("createBeerContainer returns element with correct selectors", () => {
        const result = createBeerContainer().classList.contains('beerContainer');
        expect(result).toBeTruthy();
    });
});

