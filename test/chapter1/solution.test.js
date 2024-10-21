import { expect } from "chai";
import { solution } from "../../src/chapter1/solution.js";

describe("Chapter 1 - Solution Test", () => {
  it("should return the expected value", () => {
    const expectedValue = false;
    const result = solution();
    expect(result).to.equal(expectedValue);
  });
})