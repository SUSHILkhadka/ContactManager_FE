import { SearchOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  InputRef,
  message,
  Popconfirm,
  Space,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { ColumnType } from "antd/lib/table";
import React,{ useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import image from "../../assets/github.png";
import { IContact } from "../../interface/IContact";
import { load } from "../../redux_toolkit/slices/contactSlice";
import { deleteContact, editContact } from "../../services/backendCallContact";
import "../styles/Table.css";

type propsTypeforContactTable = {
  Obj: IContact[];
  reloadHandler: () => void;
};
type DataIndex = keyof IContact;
const ContactsTable = (props: propsTypeforContactTable) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleDelete = async (id: number) => {
    try {
      const contact = await deleteContact(id);
      if (contact.data) {
        message.success(`${contact.message}. Id is ${contact.data.id}`);
      }
      props.reloadHandler();
    } catch (e: any) {
      message.error("error deleting!! " + e.response.data.message);
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
    navigate("/edit");
  };

  const handleFavouriteChange = async (Obj: IContact) => {
    const body = {
      name: Obj.name,
      email: Obj.email,
      workNumber: Obj.workNumber ? Obj.workNumber : "",
      homeNumber: Obj.homeNumber ? Obj.homeNumber : "",
      phoneNumber: Obj.phoneNumber ? Obj.phoneNumber : "",
      photograph: Obj.photograph,
      favourite: !Obj.favourite,
    };

    try {
      const contact = await editContact(body, Obj.id);
      message.success(`${contact.message}. Id is ${contact.data.id}`);
      props.reloadHandler();
    } catch (e: any) {
      message.error("error editing!! " + e.response.data.message);
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
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<IContact> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
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
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
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
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const width = "10%";
  const columns: ColumnsType<IContact> = [
    {
      title: "Photograph",
      dataIndex: "photograph",
      key: "photograph",
      width: width,
      render: (url: string) => {
        return Boolean(url) ? (
          <img className="img-avatar-table" src={url} alt="Loading" />
        ) : (
          <img className="img-avatar-table" src={image} alt="loading" />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: width,
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: width,
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: width,
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "Work Number",
      dataIndex: "workNumber",
      key: "workNumber",
      width: width,
      ...getColumnSearchProps("workNumber"),
    },
    {
      title: "Favourite",
      dataIndex: "favourite",
      key: "favourite",
      width: width,
      render: (text: boolean, contact) => {
        return (
          <div
            className="table-favourite"
            onClick={() => handleFavouriteChange(contact)}
          >
            {!text ? (
              <StarOutlined />
            ) : (
              <StarFilled style={{ color: "firebrick" }} />
            )}
          </div>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            placement="top"
            title={"Are you sure?"}
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="deleteBtn">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table
        className="actual-table"
        onRow={(Obj: any, _rowIndex: any) => {
          return {
            onDoubleClick: () => handleEdit(Obj),
          };
        }}
        columns={columns}
        dataSource={props.Obj}
        rowKey="id"
      />
    </div>
  );
};

export default ContactsTable;
