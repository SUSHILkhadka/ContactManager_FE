import { Skeleton, Dropdown, Menu, message, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import ContactsTable from '../../components/contact/ContactsTable';
import { IContact } from '../../redux_toolkit/slices/contactSlice';
import { readMyContacts } from '../../services/backendCallContact';
import { DownOutlined } from '@ant-design/icons';

export const ListContactPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataOriginal, setDataOrignal] = useState<IContact[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<IContact[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [sortMethodId, setSortMethodId] = useState<number>(3);

  const handleReload = () => {
    setReload((current) => !current);
  };

  useEffect(() => {
    setLoading(true)
    const getalldata = async () => {
      try {
        const contacts = await readMyContacts();
        const sorted = contacts.data;
        sorted.sort(function (a: IContact, b: IContact) {
          const keyA = a.name;
          const keyB = b.name;
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        setDataOrignal(sorted);
        setDataToDisplay(sorted);
      } catch (e: any) {
        message.error('reading contacts list failed!! ' + e.response.data.message);
        setDataToDisplay([]);
      }
    };
    getalldata();
    setLoading(false);
  }, [reload]);

  useEffect(() => {
    switch (sortMethodId) {
      case 0:
        ascendingAll();
        break;
      case 1:
        descendingAll();
        break;
      case 2:
        ascendingFavouritesOnly();
        break;
      default:
        ascendingFavouritesFirstThenRest();
    }
  }, [dataOriginal]);

  const ascendingAll = () => {
    const temp = Object.create(dataOriginal);
    setDataToDisplay(temp);
    setSortMethodId(0);
  };

  const descendingAll = () => {
    const temp = Object.create(dataOriginal);
    temp.sort(function (a: IContact, b: IContact) {
      const keyA = a.name;
      const keyB = b.name;
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
    setDataToDisplay(temp);
    setSortMethodId(1);
  };
  const ascendingFavouritesOnly = () => {
    const temp = dataOriginal;
    const listOfFavourite: IContact[] = [];
    temp.forEach((element: IContact) => {
      if (element.favourite) listOfFavourite.push(element);
    });
    if (listOfFavourite.length > 0) {
      setDataToDisplay(listOfFavourite);
    } else {
      setDataToDisplay([]);
    }
    setSortMethodId(2);
  };

  const ascendingFavouritesFirstThenRest = () => {
    const temp = dataOriginal;
    const listOfFavourite: IContact[] = [];
    const listofNonFavourite: IContact[] = [];
    temp.forEach((element: IContact) => {
      if (element.favourite) listOfFavourite.push(element);
      if (!element.favourite) listofNonFavourite.push(element);
    });
    const finalConcatenatedArray = listOfFavourite.concat(listofNonFavourite);
    if (finalConcatenatedArray.length > 0) {
      setDataToDisplay(finalConcatenatedArray);
    }
    setSortMethodId(3);
  };

  const menu = (
    <Menu
      selectable
      defaultSelectedKeys={[`${sortMethodId}`]}
      items={[
        {
          key: '0',
          label: <div>ascendingAll</div>,
          onClick: ascendingAll,
        },
        {
          key: '1',
          label: <div>descendingAll</div>,
          onClick: descendingAll,
        },
        {
          key: '2',
          label: <div>ascendingFavouritesOnly</div>,
          onClick: ascendingFavouritesOnly,
        },
        {
          key: '3',
          label: <div>ascendingFavouritesFirstThenRest</div>,
          onClick: ascendingFavouritesFirstThenRest,
        },
      ]}
    />
  );

  return loading ? (
    <Skeleton active />
  ) : (
    <div>
      <div className="dropdown-menu">
        <Dropdown overlay={menu}>
          <Typography.Link>
            <Space className="dropdown-title">
              Sort By
              <DownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
      </div>
      <div className="table-contact">
        <ContactsTable Obj={dataToDisplay} reloadHandler={handleReload} />
      </div>
    </div>
  );
};
