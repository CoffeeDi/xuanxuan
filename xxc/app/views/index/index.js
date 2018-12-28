import React, {PureComponent} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import ImageCutterApp from './app-image-cutter';
import _AppView from './app-view';
import {onLangChange} from '../../core/lang';
import events from '../../core/events';
import withReplaceView from '../with-replace-view';

/**
 * AppView 可替换组件形式
 * @type {Class<AppView>}
 * @private
 */
const AppView = withReplaceView(_AppView);

/**
 * HomeIndex 组件 ，显示喧喧应用窗口界面
 * @class HomeIndex
 * @see https://react.docschina.org/docs/components-and-props.html
 * @extends {PureComponent}
 * @example
 * import HomeIndex from './index';
 * <HomeIndex />
 */
export default class HomeIndex extends PureComponent {
    /**
     * HomeIndex 对应的可替换类路径名称
     *
     * @type {String}
     * @static
     * @memberof HomeIndex
     */
    static replaceViewPath = 'index/HomeIndex';

    /**
     * React 组件生命周期函数：`componentDidMount`
     * 在组件被装配后立即调用。初始化使得DOM节点应该进行到这里。若你需要从远端加载数据，这是一个适合实现网络请
    求的地方。在该方法里设置状态将会触发重渲。
     *
     * @see https://doc.react-china.org/docs/react-component.html#componentDidMount
     * @private
     * @memberof LanguageSwitcher
     * @return {void}
     */
    componentDidMount() {
        this.onLangChangeHandler = onLangChange(() => {
            this.forceUpdate();
        });
    }

    /**
     * React 组件生命周期函数：`componentWillUnmount`
     * 在组件被卸载和销毁之前立刻调用。可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理
    任何在componentDidMount环节创建的DOM元素。
     *
     * @see https://doc.react-china.org/docs/react-component.html#componentwillunmount
     * @private
     * @memberof LanguageSwitcher
     * @return {void}
     */
    componentWillUnmount() {
        events.off(this.onLangChangeHandler);
    }

    /**
     * React 组件生命周期函数：Render
     * @private
     * @see https://doc.react-china.org/docs/react-component.html#render
     * @see https://doc.react-china.org/docs/rendering-elements.html
     * @memberof HomeIndex
     * @return {ReactNode|string|number|null|boolean} React 渲染内容
     */
    render() {
        return (<Router>
            <Switch>
                <Route path="/image-cutter/:file?" component={ImageCutterApp} />
                <Route path="/:app?" component={AppView} />
            </Switch>
        </Router>);
    }
}
