import { message, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IContact } from '../../interface/IContact';
import { load } from '../../redux_toolkit/slices/contactSlice';
import { deleteContact, editContact } from '../../services/backendCallContact';
import { getReduxContactInfoFromDatabaseData } from '../../utils/converter';
import '../styles/Table.css';
import { GetColumns } from '../utils/GetColumns';
import React from 'react';

type propsTypeforContactTable = {
  Obj: IContact[];
  reloadHandler: () => void;
};
const ContactsTable = (props: propsTypeforContactTable) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    try {
      const contact = await deleteContact(id);
      if (contact.data) {
        message.success(`${contact.message}. Id is ${contact.data.id}`);
      }
      props.reloadHandler();
    } catch (e: any) {
      message.error('error deleting!! ' + e.response.data.message);
    }
  };

  const handleEdit = (Obj: IContact) => {
    const dataForContactInfo = getReduxContactInfoFromDatabaseData(Obj);
    dispatch(load(dataForContactInfo));
    navigate('/edit');
  };

  const handleFavouriteChange = async (Obj: IContact) => {
    const body = {
      ...getReduxContactInfoFromDatabaseData(Obj),
      favourite: !Obj.favourite,
    };

    try {
      const contact = await editContact(body, Obj.id);
      message.success(`${contact.message}. Id is ${contact.data.id}`);
      props.reloadHandler();
    } catch (e: any) {
      if (e.response)
        message.error('error editing!! ' + e.response.data.message);
      else message.error(e);
    }
  };

  const columns = GetColumns(handleFavouriteChange, handleEdit, handleDelete);

  return (
    <div className='table-container'>
      <Table
        className='actual-table'
        columns={columns}
        dataSource={props.Obj}
        rowKey='id'
        data-testid='table'
      />
    </div>
  );
};

export default ContactsTable;
