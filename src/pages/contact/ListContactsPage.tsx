import { Button, Dropdown, Menu, message, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import ContactsTable from '../../components/contact/ContactsTable';
import { IContact } from '../../redux_toolkit/slices/contactSlice';
import { readMyContacts } from '../../services/backendCallContact';
import { DownOutlined } from '@ant-design/icons';

export const ListContactPage = () => {
  const [dataOriginal, setDataOrignal] = useState<IContact[]>([]);
  const [dataToDisplay, setDataToDisplay] = useState<IContact[]>([]);
  useEffect(() => {
    const getalldata = async () => {
      try {
        const contacts = await readMyContacts();
        setDataOrignal(contacts.data);
        setDataToDisplay(contacts.data);
      } catch {
        message.error('reading contacts failed');
      }
    };
    getalldata();
  }, []);

  useEffect(() => {
    ascendingFavouritesFirstThenRest();
  }, [dataOriginal]);

  const ascendingAll = () => {
    const temp = dataOriginal;
    temp.sort(function (a: IContact, b: IContact) {
      const keyA = a.name;
      const keyB = b.name;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    setDataToDisplay(temp);
  };
  const ascendingFavouritesOnly = () => {
    const temp = dataOriginal;
    temp.sort(function (a: IContact, b: IContact) {
      const keyA = a.name;
      const keyB = b.name;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
    const listOfFavourite: IContact[] = [];
    temp.forEach((element: IContact) => {
      if (element.favourite) listOfFavourite.push(element);
    });
    if (listOfFavourite.length > 0) {
      console.log('after sorting only favourites', listOfFavourite);
      setDataToDisplay(listOfFavourite);
    }
  };

  const ascendingFavouritesFirstThenRest = () => {
    const temp = dataOriginal;
    temp.sort(function (a: IContact, b: IContact) {
      const keyA = a.name;
      const keyB = b.name;
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
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
  };

  const menu = (
    <Menu
      selectable
      defaultSelectedKeys={['3']}
      items={[
        {
          key: '1',
          label: <div>ascendingAll</div>,
          onClick: ascendingAll,
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

  return dataToDisplay == [] ? (
    <div>Loading</div>
  ) : (
    <div>
      <div className="dropdown-menu">
        <Dropdown overlay={menu}>
          <Typography.Link>
            <Space className="brown">
              Selectable
              <DownOutlined />
            </Space>
          </Typography.Link>
        </Dropdown>
      </div>
      <div className="table-contact">
        <ContactsTable Obj={dataToDisplay} />
      </div>
    </div>
  );
};
