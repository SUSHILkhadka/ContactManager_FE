import { Button, Input, InputRef, message, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IContact, load } from '../../redux_toolkit/slices/contactSlice';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import image from '../../assets/github.png';
import { deleteContact, editContact } from '../../services/backendCallContact';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { ColumnType } from 'antd/lib/table';
import { SearchOutlined } from '@ant-design/icons';
import '../styles/Table.css';

type TT = {
  Obj: IContact[];
  reloadHandler: () => void;
};
type DataIndex = keyof IContact;
const ContactsTable = (props: TT) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleDelete = async (id: number) => {
    try {
      const contact = await deleteContact(id);
      if (contact.data) {
        message.success(`${contact.message}. Id is ${contact.data.id}`);
      }
      // navigate("/contact/list");
      props.reloadHandler();
    } catch (e: any) {
      message.error('error deleting!! ' + e.response.data.message);
    }
  };

  const handleEdit = (Obj: IContact): void => {
    const dataForContactInfo = {
      id: Obj.id,
      name: Obj.name,
      email: Obj.email,
      workNumber: Obj.workNumber,
      homeNumber: Obj.homeNumber,
      phoneNumber: Obj.phoneNumber,
      photograph: Obj.photograph,
      favourite: Obj.favourite,
    };
    dispatch(load(dataForContactInfo));
    navigate('/contact/edit');
  };
  const handleFavouriteChange = async (Obj: IContact) => {
    const body = {
      name: Obj.name,
      email: Obj.email,
      workNumber: Obj.workNumber,
      homeNumber: Obj.homeNumber,
      phoneNumber: Obj.phoneNumber,
      photograph: Obj.photograph,
      favourite: !Obj.favourite,
    };

    try {
      const contact = await editContact(body, Obj.id);
      message.success(`${contact.message}. Id is ${contact.data.id}`);
      // navigate('/contact/list');
      props.reloadHandler();
    } catch (e: any) {
      message.error('error editing!! ' + e.response.data.message);
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IContact> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              confirm({ closeDropdown: true });
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value as string).toLowerCase())
        : false,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<IContact> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Photograph',
      dataIndex: 'photograph',
      key: 'photograph',
      width: '20%',
      render: (url: string) => {
        return Boolean(url) ? (
          <img className="img-avatar-table" src={url} alt="Loading" />
        ) : (
          <img className="img-avatar-table" src={image} alt="loading" />
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      ...getColumnSearchProps('phoneNumber'),
    },
    {
      title: 'Work Number',
      dataIndex: 'workNumber',
      key: 'workNumber',
      ...getColumnSearchProps('workNumber'),
    },
    {
      title: 'Favourite',
      dataIndex: 'favourite',
      key: 'favourite',
      render: (text: boolean, contact) => {
        return (
          <div onClick={() => handleFavouriteChange(contact)}>
            {!text ? <StarOutlined /> : <StarFilled style={{ color: 'gold' }} />}
          </div>
        );
      },
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button className="deleteBtn" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="table-contact">
        <Table
          onRow={(Obj: any, _rowIndex: any) => {
            return {
              onMouseEnter: () => {},
              onDoubleClick: () => handleEdit(Obj),
            };
          }}
          columns={columns}
          pagination={false}
          dataSource={props.Obj}
        />
      </div>
    </div>
  );
};

export default ContactsTable;
