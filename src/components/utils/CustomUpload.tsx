import { Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePhotoUrl } from '../../redux_toolkit/slices/contactSlice';
import { uploadToCloud } from '../../services/backendCallUpload';
import ImgCrop from 'antd-img-crop';
import '../styles/Button.css';
const CustomUpload: React.FC = () => {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const props: UploadProps = {
    beforeUpload: async (file) => {
      setloading(true);
      const formData = new FormData();
      formData.append('keyForFileObject', file);
      console.log('file', file);
      try {
        const response = await uploadToCloud(formData);
        dispatch(changePhotoUrl(response.url));
        message.success('upload successfully.');
      } catch (e) {
        message.error('uploading error');
      }
      setloading(false);
      return false;
    },
    maxCount: 1,
    showUploadList: false,
  };
  return (
    <>
      <ImgCrop rotate>
        <Upload {...props}>
          {loading ? (
            <Button className="btn btn-photo" type="primary" loading={loading} style={{ marginTop: 16 }}>
              'Uploading'
            </Button>
          ) : (
            <Button type="primary" className="btn btn-photo">
              Change Photo
            </Button>
          )}
        </Upload>
      </ImgCrop>
    </>
  );
};

export default CustomUpload;
