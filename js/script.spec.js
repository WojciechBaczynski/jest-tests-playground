const createAbvParameter = require("./script.js").__get__("createAbvParameter");
const createBeerContainer = require("./script.js").__get__(
  "createBeerContainer"
);
const createEndpoint = require("./script.js").__get__("createEndpoint");
const createTagContainer = require("./script.js").__get__("createTagContainer");
const createNameContainer = require("./script.js").__get__(
  "createNameContainer"
);
const createImgContainer = require("./script.js").__get__("createImgContainer");

describe("Beer display module", () => {
  test("createAbvParameter with selected option 1 returns expected text", () => {
    expect(createAbvParameter(1)).toBe("&abv_lt=4");
  });

  test("createAbvParameter with selected option 2 returns expected text", () => {
    expect(createAbvParameter(2)).toBe("&abv_lt=6&abv_gt=4");
  });

  test("createAbvParameter with selected option 3 returns expected text", () => {
    expect(createAbvParameter(3)).toBe("&abv_gt=6");
  });

  test("createAbvParameter with selected option 0 returns false", () => {
    expect(createAbvParameter(0)).toBe(false);
  });

  test("createAbvParameter with selected option 10 returns false", () => {
    expect(createAbvParameter(10)).toBeFalsy();
  });

  test("createBeerContainer returns div element", () => {
    const result = createBeerContainer().nodeName;
    expect(result).toBe("DIV");
  });

  test("createBeerContainer returns element with correct selectors", () => {
    const result = createBeerContainer().classList.contains("beerContainer");
    expect(result).toBeTruthy();
  });

  test("createEndpoint returns url", () => {
    expect(createEndpoint()).toBe(
      "https://api.punkapi.com/v2/beers?page=1&per_page=15"
    );
  });

  test("createEndpoint with argument returns url", () => {
    const argument = "&abv_lt=4";
    expect(createEndpoint(argument)).toBe(
      "https://api.punkapi.com/v2/beers?page=1&per_page=15" + argument
    );
  });

  test("createNameContainer changes DOM and display beer name", () => {
    const beer = { name: "beerName" };
    const beerContainer = global.document.createElement("div");
    createNameContainer(beer, beerContainer);
    expect(beerContainer.innerHTML.toString().includes(beer.name)).toBeTruthy();
    expect(beerContainer.innerHTML.toString().includes("span")).toBeTruthy();
  });

  test("createImgContainer changes DOM, element with class imgContainer is visible and image_url value is inside element", () => {
    const beer = { image_url: "ulrAddress" };
    const beerContainer = global.document.createElement("div");
    createImgContainer(beer, beerContainer);
    expect(
      beerContainer.innerHTML.toString().includes(beer.image_url)
    ).toBeTruthy();
    expect(
      beerContainer.innerHTML.toString().includes("imgContainer")
    ).toBeTruthy();
  });
});
