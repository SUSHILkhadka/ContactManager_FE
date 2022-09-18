import { message, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import ContactsTable from '../../components/contact/ContactsTable';
import CustomSort from '../../components/utils/CustomSort';
import { IContact } from '../../interface/IContact';
import { readAllContacts } from '../../services/backendCallContact';
import { sortByAscendingAll } from '../../utils/sort';

export const ListContactPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataOriginal, setDataOrignal] = useState<IContact[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<IContact[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  const handleReload = () => {
    setReload((current) => !current);
  };

  useEffect(() => {
    let isMounted = true;

    const getalldata = async () => {
      try {
        const contacts = await readAllContacts();
        if (isMounted) {
          const sortedArray = sortByAscendingAll(contacts.data);
          setDataOrignal(sortedArray);
          setDataToDisplay(sortedArray);
        }
      } catch (e: any) {
        if (e.response) message.error(e.response.data.message);
        else message.error(e);
        setDataToDisplay([]);
      }
      setLoading(false);
    };

    getalldata();

    return () => {
      isMounted = false;
    };
  }, [reload]);

  return (
    <div className='list-page'>
      <div className='dropdown-menu'>
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
