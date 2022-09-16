import { Button, message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { UploadProps } from "antd/es/upload/interface";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image from "../../assets/github.png";
import { changePhotoUrl } from "../../redux_toolkit/slices/contactSlice";
import { RootState } from "../../redux_toolkit/stores/store";
import { uploadToCloud } from "../../services/backendCallUpload";
import "../styles/Button.css";
const CustomUpload: React.FC = () => {
  const contactInfo = useSelector((state: RootState) => state.contact);

  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const props: UploadProps = {
    beforeUpload: async (file) => {
      setloading(true);
      const formData = new FormData();
      formData.append("keyForFileObject", file);
      try {
        const response = await uploadToCloud(formData);
        dispatch(changePhotoUrl(response.url));
        message.success("upload successfully.");
      } catch (e) {
        message.error("uploading error");
      }
      setloading(false);
      return false;
    },
    maxCount: 1,
    showUploadList: false,
  };
  return (
    <div className="customPhotoUploader">
      <div className="image-container">
      {Boolean(contactInfo.photograph) ? (
        <img
          className="img-avatar"
          src={contactInfo.photograph}
          alt="Loading"
        />
      ) : (
        <img className="img-avatar" src={image} alt="loading" />
      )}
      </div>
      <div className="changePhoto-containter">
      <ImgCrop rotate>
        <Upload {...props}>
          {loading ? (
            <Button
              className="btn btn-photo"
              type="primary"
              loading={loading}
            >
              Uploading..
            </Button>
          ) : (
            <Button className=" btn-photo">
              Change Photo
            </Button>
          )}
        </Upload>
      </ImgCrop>
      </div>
    </div>
  );
};

export default CustomUpload;
