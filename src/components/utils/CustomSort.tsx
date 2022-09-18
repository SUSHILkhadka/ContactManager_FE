import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IContact } from '../../interface/IContact';
import {
  sortByAscendingFavouritesFirstThenRest,
  sortByAscendingFavouritesOnly,
  sortByDescendingAll,
} from '../../utils/sort';
import React from 'react';

type PropType = {
  dataOriginal: IContact[];
  setDataToDisplay: Dispatch<SetStateAction<IContact[]>>;
};
const CustomSort = ({ dataOriginal, setDataToDisplay }: PropType) => {
  const [sortMethodId, setSortMethodId] = useState<number>(3);

  useEffect(() => {
    switch (sortMethodId) {
      case 0:
        switchToAscendingAll();
        break;
      case 1:
        switchToDescendingAll();
        break;
      case 2:
        switchToAscendingFavouritesOnly();
        break;
      default:
        switchToAscendingFavouritesFirstThenRest();
    }
  }, [dataOriginal]);

  const switchToAscendingAll = () => {
    const temp = Object.create(dataOriginal);
    setDataToDisplay(temp);
    setSortMethodId(0);
  };

  const switchToDescendingAll = () => {
    const temp = sortByDescendingAll(dataOriginal);
    setDataToDisplay(temp);
    setSortMethodId(1);
  };
  const switchToAscendingFavouritesOnly = () => {
    const listOfFavourite: IContact[] =
      sortByAscendingFavouritesOnly(dataOriginal);
    if (listOfFavourite.length > 0) {
      setDataToDisplay(listOfFavourite);
    } else {
      setDataToDisplay([]);
    }
    setSortMethodId(2);
  };

  const switchToAscendingFavouritesFirstThenRest = () => {
    const finalConcatenatedArray =
      sortByAscendingFavouritesFirstThenRest(dataOriginal);
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
          onClick: switchToAscendingAll,
        },
        {
          key: '1',
          label: <div>descendingAll</div>,
          onClick: switchToDescendingAll,
        },
        {
          key: '2',
          label: <div>ascendingFavouritesOnly</div>,
          onClick: switchToAscendingFavouritesOnly,
        },
        {
          key: '3',
          label: <div>ascendingFavouritesFirstThenRest</div>,
          onClick: switchToAscendingFavouritesFirstThenRest,
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu}>
      <Typography.Link>
        <Space className='dropdown-title'>
          Sort By
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};
export default CustomSort;
