import React from 'react';
import Modal from '../../components/modal';
import ChatCode from './chat-code';
import { isAbsolute } from 'path';
/**
 * 显示发送代码对话框界面
 * @param {Chat} chat 聊天对象
 * @param {function} callback 回调函数
 * @return {void}
 */
export const showChatCodeDialog = (chat, callback) => {
    const modalId = 'app-chat-code-dialog';
    return Modal.show({
        id: modalId,
        style: {
            width: 600,
            height: 430,
            left: '50%',
            marginLeft: -300,
            position: 'absolute',
            bottom: 0,
        },
        className: 'app-chat-code-dialog',
        animation: 'enter-from-bottom',
        actions: false,
        content: <ChatCode chat={chat} onRequestClose={() => (Modal.hide(modalId))} />
    }, callback);
};

export default {
    show: showChatCodeDialog,
};
