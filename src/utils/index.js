import Vue from 'vue'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import config from '../config'
import store from '../store'

Vue.prototype.axios = axios;

// 跨域携带 cookie
Vue.prototype.axios.defaults.withCredentials = true;

// 请求拦截器
Vue.prototype.axios.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    let token = store.state.token;
    if (token) config.headers.token = token;
    return config;
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default class tools {

    /**
     * 基于 Axios 的 GET 请求封装
     * @url     请求url
     * @para    请求参数，默认为 signal='srun'
     * @func    成功回调方法,默认为空
     */
    static get(url, para, func = () => {
    }) {

        // 如果使用默认参数,防止参数顺序混乱
        if (typeof para === "function") func = para;

        // url 拼接
        url = `${config.reqUrl}:${config.reqPort}${url}`;

        // 发起请求
        Vue.prototype.axios.get(url, {
            params: para
        })
            .then(
                res => {
                    func(res.data);
                },
                res => {
                    console.error(res);
                }
            )
    }

    /**
     * 基于 Axios 的 POST 请求封装
     * @url             请求地址
     * @para            请求参数    {Object}
     * @status.success  成功回调
     * @status.error    失败回调
     */
    static post(url, para, status = {
        success() {
        },
        error() {
        }
    }) {

        // url 拼接
        url = `${config.reqUrl}:${config.reqPort}${url}`;

        // 发起请求
        Vue.prototype.axios.post(url, para)
            .then(
                res => {
                    // 200 成功
                    // 400 失败
                    // 500 token无效

                    if (status.error === undefined) status.error = () => {
                    };

                    // 根据 code 执行对应 func
                    res.data.code === 200 ? status.success(res.data) : status.error(res.data);
                },
                res => {
                    console.error(res);
                }
            )
    }

    /**
     * 前端规则校验
     * @range   校验元素范围
     */
    static Check() {

        const pattern = {
            user: {
                name: '用户名',
                rule: /^[a-zA-Z0-9_-]{2,16}$/,
                tips: '「由 2-16 位字母数字下划线组成」'
            },
            pass: {
                name: '密码',
                rule: '',
                tips: ''
            },
            name: {
                name: '姓名',
                rule: /^[\u4e00-\u9fa5]{2,4}$/,
                tips: '「由 2-4 位汉字组成」'
            },
            mail: {
                name: '邮箱',
                rule: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                tips: ''
            },
            phone: {
                name: '手机号',
                rule: /^1(3|4|5|7|8)\d{9}$/,
                tips: ''
            },
            number: {
                name: '',
                rule: /^[0-9]\d*$/,             // 非负整数
                tips: ''
            },
            noBlank: {
                name: '',
                rule: '',
                tips: ''
            }
        };

        let checkItem,          // 校验项目
            checkList;          // 校验列表

        // 校验方法
        this.checkInput = function (range = '') {

            // 获取校验列表
            checkList = document.querySelectorAll(`${range} input[checkRule],${range} textarea[checkRule]`);

            for (let el of checkList) {

                // 匹配校验规则
                checkItem = pattern[el.getAttribute('checkRule')];

                // 非空校验
                if (el.value === '') {
                    // 没有规则名称则从元素中获取
                    if (checkItem.name === '') {
                        checkItem.name = el.getAttribute('checkName')
                    }
                    shake(el);
                    return `${checkItem.name}不能为空`
                }

                // 若校验项目无规则，则跳过此项目
                if (checkItem.rule === '') continue;

                // 正则校验
                if (!checkItem.rule.test(el.value)) {
                    // 没有规则名称则从元素中获取
                    if (checkItem.name === '') {
                        checkItem.name = el.getAttribute('checkName')
                    }
                    shake(el);
                    return `${checkItem.name}格式有误${checkItem.tips}`
                }
            }
        };

        /**
         * 元素闪烁
         * @el      闪烁对象
         */
        function shake(el) {
            el.classList.remove("shake");
            let num = 0;
            let timer = setInterval(() => {
                num > 6 ? clearInterval(timer) : el.classList.toggle("shake");
                num++;
            }, 100);

            // 元素点击后 移除shake
            el.onfocus = () => {
                el.classList.remove("shake");
            }
        }
    }

    /**
     * 缓存赋值
     * @obj     需要克隆的对象
     */
    static cloneCache(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * 设备震动
     * @duration    震动时间,默认 0.1s
     */
    static shock(duration = 100) {
        navigator.vibrate(duration);
    }

    /**
     * 设置 Cookie
     * @obj.name    需要存储的 Cookie 名称
     * @obj.value   需要存储的 Cookie 值
     * @obj.dey     存储时间，默认 7 天
     */
    static setCookie(obj) {
        if (obj.day === undefined) obj.day = 7;
        let date = new Date();
        date.setDate(date.getDate() + obj.day);
        document.cookie = `${obj.name}=${obj.value};expires=${date}`;
    }

    /**
     * 读取 Cookie
     * @name    需要读取的 Cookie 名称
     */
    static getCookie(name) {
        let reg = RegExp(name + '=([^;]+)'),
            arr = document.cookie.match(reg);

        arr ? arr = arr[1] : arr = false;

        return arr;
    }

    /**
     * 对象替换 Key
     * @obj     需要替换 key 的对象 (需要数组格式)
     * @oldKey  旧 key
     * @newKey  新 key
     */
    static replaceKey(obj, oldKey, newKey) {
        let arr = [];

        for (let val of obj) {
            let keys = Object.keys(val),
                temp = {};
            for (let key of keys) {
                key === oldKey ? temp[newKey] = val[key] : temp[key] = val[key]
            }
            arr.push(temp)
        }
        return arr
    }

    /**
     * 时间戳转时间
     * @timeStamp   时间戳
     * @format      截取部分
     */
    static TimeStampTrans(timeStamp, format) {

        // 时间戳为10位需*1000，时间戳为13位的话不需要
        if ((timeStamp + '').length === 10) timeStamp = timeStamp * 1000;

        let time = new Date(timeStamp);

        switch (format) {
            case 'year':
                return time.getFullYear();
            case 'month':
                return time.getMonth() + 1;
            case 'day':
                return time.toLocaleString();
            case 'strDate':
                return getStr(time).date;
            case 'strTime':
                return getStr(time).time;
        }

        function getStr(time = +new Date()) {
            let date = new Date(time + 8 * 3600 * 1000);
            return {
                date: date.toJSON().substr(0, 19).replace('T', ',').split(',')[0],
                time: date.toString().substring(16, 24)
            }
        }

    }

    /**
     * Base64 转 Unicode
     */
    static b642Uni(base64) {
        return decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    /**
     * 获取 URL 参数
     */
    static getUrlPara(key) {
        let url = location.search,                         // url ? 后字符串
            urlPara = {}
        if (url.indexOf('?') !== -1) {
            let str = url.substr(1).split('&')             // 去除 ? 按 & 分割
            for (let val of str) {
                urlPara[val.split("=")[0]] = unescape(val.split("=")[1])
            }
        }
        if (key !== undefined) urlPara = urlPara[key]
        return urlPara
    }

    /**
     * AES 加密
     * @str     需要加密的字段
     * @key     加密 密钥
     * @iv      加密 向量
     */
    static encrypt(str, key, iv) {
        //密钥16位
        key = CryptoJS.enc.Utf8.parse(key);
        //加密向量16位
        iv = CryptoJS.enc.Utf8.parse(iv);
        let encrypted = CryptoJS.AES.encrypt(str, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return encrypted.toString();
    }

    /**
     * AES 解密
     * @str     需要解密的字段
     * @key     解密 密钥
     * @iv      解密 向量
     */
    static decrypt(str, key, iv) {
        //密钥16位
        key = CryptoJS.enc.Utf8.parse(key);
        //加密向量16位
        iv = CryptoJS.enc.Utf8.parse(iv);
        let decrypted = CryptoJS.AES.decrypt(str, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}