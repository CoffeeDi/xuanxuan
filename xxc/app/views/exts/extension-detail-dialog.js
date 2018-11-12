import React from 'react';
import Modal from '../../components/modal';
import {ExtensionDetail} from './extension-detail';

/**
 * 显示扩展详情对话框
 * @param {BaseExtension} extension 要显示的扩展对象
 * @param {function} callback 对话框显示完成回调函数
 * @return {void}
 */
export const showExtensionDetailDialog = (extension, callback) => {
    const modalId = 'app-ext-detail-dialog';
    return Modal.show({
        id: modalId,
        title: null,
        className: 'rounded app-ext-detail-dialog',
        animation: 'enter-from-bottom fade',
        actions: false,
        content: <ExtensionDetail extension={extension} onRequestClose={() => (Modal.hide(modalId))} />
    }, callback);
};

export default {
    show: showExtensionDetailDialog,
};
