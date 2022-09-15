import { message, Skeleton } from "antd";
import { useEffect, useState } from "react";
import ContactsTable from "../../components/contact/ContactsTable";
import CustomSort from "../../components/utils/CustomSort";
import { IContact } from "../../interface/IContact";
import { readAllContacts } from "../../services/backendCallContact";
import { sortByAscendingAll } from "../../utils/sort";

export const ListContactPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataOriginal, setDataOrignal] = useState<IContact[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<IContact[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  const handleReload = () => {
    setReload((current) => !current);
  };

  useEffect(() => {
    let isCancelled=false;

    const getalldata = async () => {
      try {
        const contacts = await readAllContacts();
        if(!isCancelled){
        const sortedArray = sortByAscendingAll(contacts.data);
        setDataOrignal(sortedArray);
        setDataToDisplay(sortedArray);
        }
      } catch (e: any) {
        message.error(
          "reading contacts list failed!! " + e.response.data.message
        );
        setDataToDisplay([]);
      }
      setLoading(false);
    };
    getalldata();

    return ()=>{
      isCancelled=true;
    }
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
          <ContactsTable Obj={dataToDisplay} reloadHandler={handleReload} />
      )}
    </div>
  );
};
