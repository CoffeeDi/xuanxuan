import system from 'Config/system.json'; // eslint-disable-line
import media from 'Config/media.json'; // eslint-disable-line
import ui from 'Config/ui.json'; // eslint-disable-line
import lang from 'Config/lang.json'; // eslint-disable-line
import pkg from '../package.json';
import platform from '../platform';

/**
 * 应用运行时配置
 * @type {Object}
 */
const config = {
    system,
    media,
    ui,
    pkg,
    exts: {},
    lang,
};

/**
 * 获取系统特殊版本信息
 * @return {String} 版本信息
 */
export const getSpecialVersionName = () => {
    let {specialVersion} = config.system;
    if (specialVersion === undefined && platform.call('type') === 'browser') {
        specialVersion = 'Modern Browser';
    }
    return specialVersion;
};

/**
 * 更新应用运行时配置
 * @param {Object} newConfig 新的配置项
 * @return {Object} 应用运行时配置
 */
export const updateConfig = (newConfig) => {
    Object.keys(newConfig).forEach(key => {
        Object.assign(config[key], newConfig[key]);
    });
    // const langInNewConfig = newConfig.lang && newConfig.lang[Lang.name];
    // if (langInNewConfig) {
    //     Lang.update(langInNewConfig);
    // }
    return config;
};

const {configurations} = pkg;
if (configurations) {
    updateConfig(configurations);
}

// 运行时配置中的语言配置
// const langInConfig = config.lang && config.lang[Lang.name];
// if (langInConfig) {
//     Lang.update(langInConfig);
// }

export default config;
