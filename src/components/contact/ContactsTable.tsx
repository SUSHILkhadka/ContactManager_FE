import { Radio, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { load } from "../../redux_toolkit/slices/contactSlice";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import image from "../../assets/github.png";
import "../../App.css"
interface IContact {
  id: number;
  name: string;
  phoneNumber: string;
  favourite: boolean;
  photograph: string;
}


const columns: ColumnsType<IContact> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Favourite",
    dataIndex: "favourite",
    key: "favourite",
    render: (text: boolean) => {
      return !text ? (
        <StarOutlined />
      ) : (
        <StarFilled style={{ color: "gold" }} />
      );
    },
  },
  {
    title: "Photograph",
    dataIndex: "photograph",
    key: "photograph",
    render: (url: string) => {
      return Boolean(url) ? (
        <img
          className="img-avatar-table"
          src={url}
          alt="Loading"
        />
      ) : (
        <img className="img-avatar-table" src={image} alt="loading" />
      );
    },
  },
];

type TT = {
  Obj: IContact[];
};
const StyledTable = styled((props:any) => <Table {...props} />)`
  && tbody > tr:hover > td {
    background: rgba(224, 248, 232, 1);
  }
`;

const ContactsTable = (props: TT) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
    <div className="table-contact">
      <StyledTable
        onRow={(Obj:any, _rowIndex:any) => {
          const handleFormSelection = (): void => {
            const dataForContactInfo = {
              id: Obj.id,
              name: Obj.name,
              phoneNumber: Obj.phoneNumber,
              photograph: Obj.photograph,
              favourite: Obj.favourite,
            };
            dispatch(load(dataForContactInfo));
            navigate("/contact/edit");
          };
          return {
            onClick: handleFormSelection,
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
