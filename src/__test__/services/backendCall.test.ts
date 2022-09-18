import { contactArray } from "../../constants/common";
import { add, deleteContact, readAllContacts } from "../../services/backendCallContact";
import { editUser, login, logout } from "../../services/backendCallUser";
jest.mock('../../services/api')
describe("for user", () => {
  const body = {
    email: "a@gmail.com",
    password: "a@gmail.com",
  };
  it("should get response when login is called with body", async () => {
    const input = body;
    const output = await login(body);
    const expectedOutput = body;
    expect(output.data).toEqual(expectedOutput);
  });
  it("should get response when editUser is called with body", async () => {
    const input = body;
    const output = await editUser(body);
    const expectedOutput = body;
    expect(output.data).toEqual(expectedOutput);
  });
  it("should get response when logout is called without any body", async () => {
    const output = await logout();
    const expectedOutput = "without any body";
    expect(output.data).toEqual(expectedOutput);
  });
});

describe("for contacts", () => {
  const body = {
    name: "name",
    email: "a@gmail.com",
  };
  it("should get response when add is called with body", async () => {
    const input = body;
    const output = await add(body);
    const expectedOutput = body;
    expect(output.data).toEqual(expectedOutput);
  });
  it("should get array of contacts when readAllContacts is called without body", async () => {
    const output = await readAllContacts();
    const expectedOutput = contactArray;
    expect(output.data).toEqual(expectedOutput);
  });
  it("should get response when editUser is called with body", async () => {
    const input = body;
    const output = await editUser(body);
    const expectedOutput = body;
    expect(output.data).toEqual(expectedOutput);
  });
  it("should get response when delete is called without any body", async () => {
    const id=1;
    const output = await deleteContact(id);
    const expectedOutput = "without any body";
    expect(output.data).toEqual(expectedOutput);
  });
});
