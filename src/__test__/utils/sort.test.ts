import { IContact } from "../../interface/IContact";
import { sortByAscendingAll, sortByAscendingFavouritesFirstThenRest, sortByAscendingFavouritesOnly } from "../../utils/sort";

 const contactArray = [
  {
    id: 1,
    name: "a",
    email: "string",
    workNumber: "string",
    homeNumber: "string",
    phoneNumber: "string",
    favourite: true,
    photograph: "string",
  },
  {
    id: 1,
    name: "b",
    email: "string",
    workNumber: "string",
    homeNumber: "string",
    phoneNumber: "string",
    favourite: false,
    photograph: "string",
  },
  {
    id: 1,
    name: "x",
    email: "string",
    workNumber: "string",
    homeNumber: "string",
    phoneNumber: "string",
    favourite: true,
    photograph: "string",
  },
];
describe("ascending all", () => {
  it("should sort in asecnding order of name", () => {
    const input: IContact[] = contactArray;
    const output = sortByAscendingAll(input);
    const expectedOutput: IContact[] = [contactArray[0], contactArray[1], contactArray[2]];
    expect(output).toEqual(expectedOutput);
  });
  it("should return empty array, when empty array is passed", () => {
    const input: IContact[] = [];
    const output = sortByAscendingAll(input);
    const expectedOutput: IContact[] = [];
    expect(output).toEqual(expectedOutput);
  });
});

describe("ascending Favourites only", () => {
    it("should sort in asecnding order of name", () => {
      const input: IContact[] = contactArray;
      const output = sortByAscendingFavouritesOnly(input);
      const expectedOutput: IContact[] = [contactArray[0],  contactArray[2]];
      expect(output).toEqual(expectedOutput);
    });
    it("should return empty array, when empty array is passed", () => {
      const input: IContact[] = [];
      const output = sortByAscendingFavouritesOnly(input);
      const expectedOutput: IContact[] = [];
      expect(output).toEqual(expectedOutput);
    });
  });

  describe("ascending Favourites first then rest by name", () => {
    it("should sort in asecnding order of name", () => {
      const input: IContact[] = contactArray;
      const output = sortByAscendingFavouritesFirstThenRest(input);
      const expectedOutput: IContact[] = [contactArray[0],  contactArray[2],contactArray[1]];
      expect(output).toEqual(expectedOutput);
    });
    it("should return empty array, when empty array is passed", () => {
      const input: IContact[] = [];
      const output = sortByAscendingFavouritesFirstThenRest(input);
      const expectedOutput: IContact[] = [];
      expect(output).toEqual(expectedOutput);
    });
  });
