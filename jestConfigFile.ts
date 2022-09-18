// import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// jest.mock('@react-native-async-storage/async-storage',()=> mockAsyncStorage);
// jest.mock('redux-persist', () => {
//   const real = jest.requireActual('redux-persist');
//   return {
//     ...real,
//     persistReducer: jest
//       .fn()
//       .mockImplementation((config, reducers) => reducers),
//   };
// });
// jest.mock('react-native-snackbar', () => {});

// jest.mock('@react-navigation/native', () => {
//   const originalModule = jest.requireActual('@react-navigation/native');
//   return {...originalModule, useNavigation: jest.fn(() => {})};
// });

// jest.mock('react-redux', () => {
//   const originalModule = jest.requireActual('react-redux');
//   return {
//     ...originalModule,
//     useSelector: jest.fn(() => {}),
//     useDispatch: jest.fn(() => {}),
//   };
// });

const path = require('path')

module.exports = {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';'
  },
}


// export const contactArray = [
//     {
//       id: 1,
//       name: "a",
//       email: "string",
//       workNumber: "string",
//       homeNumber: "string",
//       phoneNumber: "string",
//       favourite: true,
//       photograph: "string",
//     },
//     {
//       id: 1,
//       name: "b",
//       email: "string",
//       workNumber: "string",
//       homeNumber: "string",
//       phoneNumber: "string",
//       favourite: false,
//       photograph: "string",
//     },
//     {
//       id: 1,
//       name: "x",
//       email: "string",
//       workNumber: "string",
//       homeNumber: "string",
//       phoneNumber: "string",
//       favourite: true,
//       photograph: "string",
//     },
//   ];
// export default jest.mock("./src/services/api", () => {
//   return {
//     post: (url: string, body: any = "without any body") => {
//       return {
//         data: {
//           data: body,
//         },
//       };
//     },
//     put: (url: string, body: any) => {
//       return {
//         data: {
//           data: body,
//         },
//       };
//     },
//     get: (url: string) => {
//         console.log('in mock')

//       return {
//         data: {
//           data: contactArray,
//         },
//       };
//     },
//   };
// });
