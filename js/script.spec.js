const { createAbvParameter } = require("./script.js");

describe("Beer display module", () => {
    test("1 to be 1", () => {
        expect(1).toBe(1)
    });

    test("createAbvParameter with selected option 1 returns expected text", () => {
        expect(createAbvParameter(1)).toBe('&abv_lt=4')
    })
});

