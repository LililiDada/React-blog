import React,{useState} from 'react';
import {Modal,Input} from 'antd';
const {TextArea} = Input;

function AddModal({ visible, onCancel ,onOK ,changeRecord,record}){
    
    return (
        <Modal
          visible={visible}
          title="'关于我'记录"
          okText="添加"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onOK}
        >
            <TextArea rows={5} onChange={changeRecord}  onPressEnter={changeRecord} value={record}></TextArea>
        </Modal>
    );
}

export default AddModal