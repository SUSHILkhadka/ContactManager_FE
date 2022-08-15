import { message } from "antd";
import { useEffect, useState } from "react";
import ContactsTable from "../../components/contact/ContactsTable";
import { readMyContacts } from "../../services/backendCallContact";

export const ListContactPage = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    const getalldata = async () => {
      try {
        const contacts = await readMyContacts();
        setData(contacts.data);
        console.log('contacts are ', contacts);
      } catch {
        message.error('reading contacts failed')
      }
    };
    getalldata();
  }, []);

  return data == [] ? (
    <div>Loading</div>
  ) : (
    <div className="App">
      <ContactsTable Obj={data}  />
    </div>
  );
};