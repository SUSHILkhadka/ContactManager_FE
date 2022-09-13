import { IContact } from "../redux_toolkit/slices/contactSlice";

export const sortByAscendingAll = (dataOriginal: IContact[]) => {
  const temp = Object.create(dataOriginal);
  temp.sort(function (a: IContact, b: IContact) {
    const keyA = a.name;
    const keyB = b.name;
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  return temp;
};

export const sortByDescendingAll = (dataOriginal: IContact[]) => {
  const temp = Object.create(dataOriginal);
  temp.sort(function (a: IContact, b: IContact) {
    const keyA = a.name;
    const keyB = b.name;
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });
  return temp;
};

export const sortByAscendingFavouritesOnly = (dataOriginal: IContact[]) => {
  const temp = dataOriginal;
  const listOfFavourite: IContact[] = [];
  temp.forEach((element: IContact) => {
    if (element.favourite) listOfFavourite.push(element);
  });
  return listOfFavourite;
};

export const sortByAscendingFavouritesFirstThenRest = (dataOriginal: IContact[]) => {
  const temp = dataOriginal;
  const listOfFavourite: IContact[] = [];
  const listofNonFavourite: IContact[] = [];
  temp.forEach((element: IContact) => {
    if (element.favourite) listOfFavourite.push(element);
    if (!element.favourite) listofNonFavourite.push(element);
  });
  const finalConcatenatedArray = listOfFavourite.concat(listofNonFavourite);
  return finalConcatenatedArray;
};
