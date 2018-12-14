import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {classes} from '../../utils/html-helper';
import replaceViews from '../replace-views';
import MessageContentCard from './message-content-card';
import {getUrlMeta} from '../../core/ui';
import WebView from '../common/webview';
import Lang from '../../lang';
import Button from '../../components/button';

/**
 * MessageContentUrl 组件 ，显示聊天消息网址卡片内容界面
 * @class MessageContentUrl
 * @see https://react.docschina.org/docs/components-and-props.html
 * @extends {PureComponent}
 * @example
 * import MessageContentUrl from './message-content-url';
 * <MessageContentUrl />
 */
export default class MessageContentUrl extends PureComponent {
    /**
     * 获取 MessageContentUrl 组件的可替换类（使用可替换组件类使得扩展中的视图替换功能生效）
     * @type {Class<MessageContentUrl>}
     * @readonly
     * @static
     * @memberof MessageContentUrl
     * @example <caption>可替换组件类调用方式</caption>
     * import {MessageContentUrl} from './message-content-url';
     * <MessageContentUrl />
     */
    static get MessageContentUrl() {
        return replaceViews('chats/message-content-url', MessageContentUrl);
    }

    /**
     * React 组件属性类型检查
     * @see https://react.docschina.org/docs/typechecking-with-proptypes.html
     * @static
     * @memberof MessageContentUrl
     * @type {Object}
     */
    static propTypes = {
        className: PropTypes.string,
        url: PropTypes.string.isRequired,
        data: PropTypes.object,
        sleep: PropTypes.bool,
    };

    /**
     * React 组件默认属性
     * @see https://react.docschina.org/docs/react-component.html#defaultprops
     * @type {object}
     * @memberof MessageContentUrl
     * @static
     */
    static defaultProps = {
        className: null,
        data: null,
        sleep: false
    };

    /**
     * React 组件构造函数，创建一个 MessageContentUrl 组件实例，会在装配之前被调用。
     * @see https://react.docschina.org/docs/react-component.html#constructor
     * @param {Object?} props 组件属性对象
     * @constructor
     */
    constructor(props) {
        super(props);
        const {data, sleep} = props;

        /**
         * React 组件状态对象
         * @see https://react.docschina.org/docs/state-and-lifecycle.html
         * @type {object}
         */
        this.state = {meta: data && data.title ? data : null, sleep};
    }

    /**
     * React 组件生命周期函数：`componentDidMount`
     * 在组件被装配后立即调用。初始化使得DOM节点应该进行到这里。若你需要从远端加载数据，这是一个适合实现网络请
    求的地方。在该方法里设置状态将会触发重渲。
     *
     * @see https://doc.react-china.org/docs/react-component.html#componentDidMount
     * @private
     * @memberof MessageContentUrl
     * @return {void}
     */
    componentDidMount() {
        const {sleep} = this.state;
        if (!sleep) {
            this.getUrlMeta();
        }
    }

    /**
     * React 组件生命周期函数：`componentWillReceiveProps`
     * 在装配了的组件接收到新属性前调用。若你需要更新状态响应属性改变（例如，重置它），你可能需对比this.props和nextProps并在该方法中使用this.setState()处理状态改变。
     *
     * @param {Object} nextProps 即将更新的属性值
     * @see https://doc.react-china.org/docs/react-component.html#unsafe_componentwillreceiveprops
     * @private
     * @memberof MessageContentUrl
     * @return {void}
     * @todo 考虑使用 `UNSAFE_componentWillReceiveProps` 替换 `componentWillReceiveProps`
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.props.url) {
            this.setState({meta: null});
        }
    }

    /**
     * React 组件生命周期函数：`componentWillUnmount`
     * 在组件被卸载和销毁之前立刻调用。可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理
    任何在componentDidMount环节创建的DOM元素。
     *
     * @see https://doc.react-china.org/docs/react-component.html#componentwillunmount
     * @private
     * @memberof MessageContentUrl
     * @return {void}
     */
    componentWillUnmount() {
        this.unmounted = true;
    }

    /**
     * 获取网址信息
     *
     * @param {boolean} [disableCache=false] 是否禁用缓存
     * @memberof MessageContentUrl
     * @return {void}
     */
    getUrlMeta(disableCache = false) {
        if (this.state.meta && !this.state.loading) {
            return;
        }
        const {url} = this.props;
        getUrlMeta(url, disableCache).then(meta => {
            if (this.unmounted) {
                return;
            }
            return this.setState({meta, loading: false});
        }).catch(_ => {
            if (this.unmounted) {
                return;
            }
            if (DEBUG) {
                console.error('Get url meta error', _);
            }
            return this.setState({meta: {url, title: url}, loading: false});
        });
    }

    /**
     * 获取网址信息（禁用缓存）
     *
     * @memberof MessageContentUrl
     * @return {void}
     */
    tryGetUrlMeta() {
        this.setState({loading: true}, () => {
            this.getUrlMeta(true);
        });
    }

    /**
     * 尝试强制获取网址信息
     *
     * @memberof MessageContentUrl
     * @return {void}
     */
    loadSleep = () => {
        this.setState({sleep: false, loading: true}, () => {
            this.getUrlMeta(true);
        });
    };

    /**
     * React 组件生命周期函数：Render
     * @private
     * @see https://doc.react-china.org/docs/react-component.html#render
     * @see https://doc.react-china.org/docs/rendering-elements.html
     * @memberof MessageContentUrl
     * @return {ReactNode|string|number|null|boolean} React 渲染内容
     */
    render() {
        const {
            url,
            className,
            data,
            sleep,
            ...other
        } = this.props;

        const {meta, loading} = this.state;

        if (this.state.sleep) {
            const card = {
                icon: 'mdi-web icon-2x text-info',
                clickable: 'title',
                url,
                title: url,
            };
            const reloadBtn = (<div className="flex-none hint--top has-padding-sm" data-hint={Lang.string('chat.message.loadCard')}><Button onClick={this.loadSleep} className="iconbutton rounded text-primary" icon="mdi-cards-playing-outline" /></div>);
            return <MessageContentCard header={reloadBtn} card={card} className={classes('app-message-content-url relative')} {...other} />;
        }

        const card = Object.assign({
            clickable: 'content',
            title: url,
        }, meta, {
            icon: (meta && !loading) ? (meta.icon === false ? null : (meta.icon || 'mdi-web icon-2x text-info')) : 'mdi-loading muted spin',
        });

        if (meta && !loading) {
            if (!card.menu) {
                card.menu = [];
            }
            const {webviewContent, content} = card;
            if (webviewContent) {
                const {originSrc, ...webviewProps} = content;
                card.content = <WebView className="relative" {...webviewProps} ref={e => {this.webview = e;}} />;
                card.clickable = 'header';
                card.menu.push({
                    label: Lang.string('common.moreActions'),
                    url: `!showContextMenu/link/?url=${encodeURIComponent(url)}`,
                    icon: 'mdi-share',
                }, {
                    label: Lang.string('ext.app.open'),
                    url: `!openUrlInDialog/${encodeURIComponent(originSrc || content.src)}/?size=lg&insertCss=${encodeURIComponent(content.insertCss)}`,
                    icon: 'mdi-open-in-app'
                });
                if (DEBUG && content.type !== 'iframe') {
                    card.menu.push({
                        label: Lang.string('ext.app.openDevTools'),
                        click: () => {
                            if (this.webview && this.webview.webview && this.webview.webview.openDevTools) {
                                this.webview.webview.openDevTools();
                            } else if (DEBUG) {
                                console.warn('Cannot open dev tools for current webview.');
                            }
                        },
                        icon: 'mdi-auto-fix'
                    });
                }
            }
            card.menu.push({
                label: Lang.string('chat.message.refreshCard'),
                click: () => {
                    if (this.webview) {
                        this.webview.reloadWebview();
                    } else {
                        this.tryGetUrlMeta();
                    }
                },
                icon: 'mdi-refresh'
            });
        }

        return (
            <MessageContentCard
                card={card}
                className={classes('app-message-content-url relative', {
                    'is-webview': card.webviewContent
                })}
                {...other}
            />
        );
    }
}
