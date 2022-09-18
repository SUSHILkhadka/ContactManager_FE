import { IContact } from '../interface/IContact';

export const sortByAscendingAll = (dataOriginal: IContact[]) => {
  const temp = JSON.parse(JSON.stringify(dataOriginal));
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
  const temp = JSON.parse(JSON.stringify(dataOriginal));
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
  const listOfFavourite: IContact[] = [];
  dataOriginal.forEach((element: IContact) => {
    if (element.favourite) listOfFavourite.push(element);
  });
  return listOfFavourite;
};

export const sortByAscendingFavouritesFirstThenRest = (
  dataOriginal: IContact[]
) => {
  const listOfFavourite: IContact[] = [];
  const listofNonFavourite: IContact[] = [];
  dataOriginal.forEach((element: IContact) => {
    if (element.favourite) listOfFavourite.push(element);
    if (!element.favourite) listofNonFavourite.push(element);
  });
  const finalConcatenatedArray = listOfFavourite.concat(listofNonFavourite);
  return finalConcatenatedArray;
};
