import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import image from '../../assets/github.png';
import { IContact } from '../../interface/IContact';
import '../styles/Table.css';
import { GetColumnSearchProps } from './GetColumnSearchProps';
import React from 'react';

export const GetColumns = (
  handleFavouriteChange: (Obj: IContact) => void,
  handleEdit: (Obj: IContact) => void,
  handleDelete: (id: number) => void
) => {
  const width = '10%';
  const columns: ColumnsType<IContact> = [
    {
      title: 'Photograph',
      dataIndex: 'photograph',
      key: 'photograph',
      width: width,
      render: (url: string) => {
        return Boolean(url) ? (
          <img className='img-avatar-table' src={url} alt='Loading' />
        ) : (
          <img className='img-avatar-table' src={image} alt='loading' />
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: width,
      render: (text) => <a>{text}</a>,
      ...GetColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: width,
      render: (text) => <a>{text}</a>,
      ...GetColumnSearchProps('email'),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: width,
      ...GetColumnSearchProps('phoneNumber'),
    },
    {
      title: 'Work Number',
      dataIndex: 'workNumber',
      key: 'workNumber',
      width: width,
      ...GetColumnSearchProps('workNumber'),
    },
    {
      title: 'Favourite',
      dataIndex: 'favourite',
      key: 'favourite',
      width: width,
      render: (text: boolean, contact) => {
        return (
          <div
            className='table-favourite'
            onClick={() => handleFavouriteChange(contact)}
          >
            {!text ? (
              <StarOutlined />
            ) : (
              <StarFilled style={{ color: 'firebrick' }} />
            )}
          </div>
        );
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            placement='top'
            title={'Are you sure?'}
            onConfirm={() => handleDelete(record.id)}
            okText='Yes'
            cancelText='No'
          >
            <Button className='deleteBtn'>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return columns;
};
