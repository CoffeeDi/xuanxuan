import React from 'react';
import Modal from '../../components/modal';
import {About} from './about';
import Lang from '../../lang';

/**
 * 显示应用关于对话框
 * @param {function} callback 回调函数
 * @return {void}
 */
export const showAboutDialog = (callback) => {
    return Modal.show({
        title: Lang.string('common.about'),
        actions: false,
        id: 'app-about-dialog',
        content: <About />
    }, callback);
};

export default {
    show: showAboutDialog,
};
