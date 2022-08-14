import { Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  load } from '../../redux_toolkit/slices/contactSlice';
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
interface IContact {
  id: number;
  name: string;
  phoneNumber: string;
  favourite: boolean;
  photograph: string;
}

type TablePaginationPosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';

const bottomOptions = [
  { label: 'bottomLeft', value: 'bottomLeft' },
  { label: 'bottomCenter', value: 'bottomCenter' },
  { label: 'bottomRight', value: 'bottomRight' },
  { label: 'none', value: 'none' },
];

const columns: ColumnsType<IContact> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
      },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Favourite',
    dataIndex: 'favourite',
    key: 'favourite',
    render: (text:boolean) =>{ 
        console.log(text);
    return(!text?(<StarOutlined />):(<StarFilled style={{color: 'gold'}}/>))
},

  },
  {
    title: 'Photograph',
    dataIndex: 'photograph',
    key: 'photograph',
  },
];

type TT = {
  Obj: IContact[];
};

const ContactsTable = (props: TT) => {
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <Radio.Group
        style={{ marginBottom: 10 }}
        options={bottomOptions}
        value={bottom}
        onChange={(e) => {
          setBottom(e.target.value);
        }}
      />
      <Table
        onRow={(Obj, _rowIndex) => {
          const handleFormSelection = (): void => {
            
            const dataForContactInfo = {
              id: Obj.id,
              name: Obj.name,
              phoneNumber: Obj.phoneNumber,
              photograph: Obj.photograph,
              favourite: Obj.favourite,
            };
            dispatch(load(dataForContactInfo));
            navigate('/contact/edit');
          };
          return {
            onClick: handleFormSelection,
          };
        }}
        columns={columns}
        pagination={{ position: [bottom] }}
        dataSource={props.Obj}
      />
    </div>
  );
};

export default ContactsTable;
