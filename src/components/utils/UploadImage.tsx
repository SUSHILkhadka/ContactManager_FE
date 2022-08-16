import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePhotoUrl } from '../../redux_toolkit/slices/contactSlice';
import { uploadToCloud } from '../../services/backendCallUpload';

const CustomUpload: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('name', 'ff');
    fileList.forEach((file) => {
      formData.append('keyForFileObject', file as RcFile);
    });
    setUploading(true);

    try {
      const response = await uploadToCloud(formData);
      setFileList([]);
      console.log('response after upload', response);
      dispatch(changePhotoUrl(response.url));
      message.success('upload successfully.');
    } catch (e) {
      message.error('uploading error');
    }
    setUploading(false);
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload maxCount={1} {...props} listType="picture">
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
};

export default CustomUpload;
