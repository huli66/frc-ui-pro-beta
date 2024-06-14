import React, { useContext } from 'react';
import {Upload, message} from 'antd';
import {Icon} from '../../../../index';
import { ChatroomContext } from '../context';

interface IProps {
  onSuccess?: () => void;
  onError?: () => void;
}

const EmojiUpload = ({onSuccess, onError}: IProps) => {
  const {chatroomApi} = useContext(ChatroomContext);
  const {uploadEmoji} = chatroomApi;
  const handleCustomRequest = async (options: any) => {
    const {onSuccess: successHandle, file} = options;

    // 创建一个 FormData 实例
    const formData = new FormData();

    // 添加文件到 FormData
    formData.append('file', file);

    // 假设你的 POST 接口地址是 '/api/upload'
    const response = await uploadEmoji(formData);
    console.log('response', response);
    // if (!response) {
    //   // 处理错误
    //   const error = new Error('Failed to upload');
    //   throw error;
    // }

    // 调用 onSuccess 回调以关闭进度条等
    successHandle(response);
  };

  const beforeUpload = (file: any) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片大小不能超过 5MB!');
    }
    // return isJpgOrPng && isLt5M;
    return isLt5M;
  };

  const handleChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      onSuccess && onSuccess();
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      onError && onError();
    }
  };

  return (
    <>
      <Upload
        name='file'
        customRequest={handleCustomRequest}
        onChange={handleChange}
        showUploadList={false} // 如果你不想显示上传列表
        beforeUpload={beforeUpload}
      >
        <div className='custom-upload-icon'>
          <Icon type='upload' />
        </div>
      </Upload>
    </>
  );
};

export default EmojiUpload;
