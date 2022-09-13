import { Skeleton, message } from "antd";
import { useEffect, useState } from "react";
import ContactsTable from "../../components/contact/ContactsTable";
import { readAllContacts } from "../../services/backendCallContact";
import { sortByAscendingAll } from "../../utils/sort";
import CustomSort from "../../components/utils/CustomSort";
import { IContact } from "../../interface/IContact";

export const ListContactPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataOriginal, setDataOrignal] = useState<IContact[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<IContact[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  const handleReload = () => {
    setReload((current) => !current);
  };

  useEffect(() => {
    const getalldata = async () => {
      try {
        const contacts = await readAllContacts();
        const sortedArray = sortByAscendingAll(contacts.data);
        setDataOrignal(sortedArray);
        setDataToDisplay(sortedArray);
      } catch (e: any) {
        message.error(
          "reading contacts list failed!! " + e.response.data.message
        );
        setDataToDisplay([]);
      }
      setLoading(false);
    };
    getalldata();
  }, [reload]);

  return (
    <div>
      <div className="dropdown-menu">
        <CustomSort
          dataOriginal={dataOriginal}
          setDataToDisplay={setDataToDisplay}
        />
      </div>
      {loading ? (
        <Skeleton active />
      ) : (
        <div className="table-contact">
          <ContactsTable Obj={dataToDisplay} reloadHandler={handleReload} />
        </div>
      )}
    </div>
  );
};
