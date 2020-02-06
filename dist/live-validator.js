(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LiveValidator"] = factory();
	else
		root["LiveValidator"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(1);

var _support = __webpack_require__(2);

var _methods = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var support = {
    username: _support.username,
    email: _support.email,
    password: _support.password,
    require: _support.require,
    equal: _support.equal
};

var LiveValidator = function () {
    function LiveValidator(options) {
        _classCallCheck(this, LiveValidator);

        if (!options || !options.needValide) {
            return;
        }
        this.needValide = options.needValide;
        var defaults = {
            needValide: [],
            failedClass: 'lv-failed', // 验证失败class
            successClass: 'lv-success', // 验证成功class
            failedIconClass: 'lv-failed-icon', // 验证失败图标class
            successIconClass: 'lv-success-icon',
            onFocusShowTips: true
        };
        this.options = Object.assign({}, defaults, options);
        this.successClassList = this.options.successClass.split(' ');
        this.failedClassList = this.options.failedClass.split(' ');

        this.successIconClassList = this.options.successIconClass.split(' ');
        this.failedIconClassList = this.options.failedIconClass.split(' ');

        var _this = this;

        this.needValide.forEach(function (item, index) {
            var elementSelector = item.element.trim().substr(1),
                elementQueryType = item.element.trim().substr(0, 1),
                tipsSelector = item.tipsContainer.trim().substr(1),
                tipsElement = document.getElementById(tipsSelector),
                valideType = item.type;

            if (!valideType) {
                return;
            }

            // 先隐藏提示
            tipsElement.style.display = 'none';
            // 插入验证提示
            var currentTipFragment = document.createDocumentFragment();
            for (var i = 0, l = valideType.length; i < l; i++) {
                if (!support[valideType[i].slug]) {
                    throw new Error("liveValidator暂不支持" + valideType[i].slug + "类型验证");
                    console.log("liveValidator暂不支持" + valideType[i].slug + "类型验证");
                    break;
                }
                if (valideType[i].slug === 'require' && !valideType[i].controller) {
                    break;
                }
                var createTips = document.createElement('div');
                var createTipsIcon = document.createElement('i');

                // 添加id属性
                createTips.setAttribute('id', 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i);

                // 添加对应class，默认全部为验证失败的class
                (0, _utils.addClassMulti)(createTips, _this.failedClassList);
                (0, _utils.addClassMulti)(createTipsIcon, _this.failedIconClassList);

                // 根据不同验证形式插入不同文字
                var tipsContent = void 0;
                switch (valideType[i].slug) {
                    case 'require':
                    case 'email':
                    case 'username':
                    case 'equal':
                        tipsContent = valideType[i].tipsText ? valideType[i].tipsText : support[valideType[i].slug]['tips'](valideType[i].controller);
                        createTips.innerText = tipsContent;
                        createTips.insertBefore(createTipsIcon, createTips.firstChild);
                        break;
                    case 'password':
                        tipsContent = valideType[i].tipsText ? valideType[i].tipsText : support[valideType[i].slug]['tips'](valideType[i].controller);
                        createTips.appendChild(tipsContent);
                        // 插入图标
                        createTips.lastChild.insertBefore(createTipsIcon, createTips.lastChild.firstChild);
                        break;
                }
                currentTipFragment.appendChild(createTips);
            }
            tipsElement.appendChild(currentTipFragment);

            // 绑定验证事件
            switch (elementQueryType) {
                case '#':
                    var currentElement = document.getElementById(elementSelector);
                    (0, _utils.bindNormalEvent)(_this, currentElement, tipsElement, item, index, support);
                    break;
                case '@':
                    var elementCollection = document.getElementsByName(elementSelector);
                    elementCollection.forEach(function (elementItem) {
                        (0, _utils.bindCheckEvent)(_this, elementItem, tipsElement, item, index, support, elementCollection);
                    });
                    break;
            }
        });
    }

    _createClass(LiveValidator, [{
        key: 'valide',
        value: function valide() {
            return (0, _methods.valide)(this);
        }
    }]);

    return LiveValidator;
}();

exports.default = LiveValidator;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.removeAllChildren = removeAllChildren;
exports.getFirstElement = getFirstElement;
exports.getLastElement = getLastElement;
exports.addClassMulti = addClassMulti;
exports.handleElementClass = handleElementClass;
exports.handlePasswordClass = handlePasswordClass;
exports.getElementValue = getElementValue;
exports.getCheckValue = getCheckValue;
exports.addEventListner = addEventListner;
exports.bindNormalEvent = bindNormalEvent;
exports.bindCheckEvent = bindCheckEvent;
exports.rankPassword = rankPassword;
exports.isNode = isNode;
exports.isElement = isElement;
//移除所有子节点
function removeAllChildren(dom) {
    var childs = dom.childNodes;
    for (var i = childs.length - 1; i >= 0; i--) {
        dom.removeChild(childs[i]);
    }
}

// 获取第一个非text类型元素
function getFirstElement(dom) {
    return dom.firstElementChild ? dom.firstElementChild : dom.firstChild;
}

// 获取最后一个非text类型元素
function getLastElement(dom) {
    return dom.lastElementChild ? dom.lastElementChild : dom.lastChild;
}

// 批量向dom添加class
function addClassMulti(dom, classArray) {
    dom.classList.add.apply(dom.classList, classArray);
}
// 处理class
function handleElementClass(element, instance, type) {
    var anothorType = type === 'success' ? 'failed' : 'success';
    element.classList.add.apply(element.classList, instance[type + 'ClassList']);
    element.classList.remove.apply(element.classList, instance[anothorType + 'ClassList']);

    element.firstChild.classList.add.apply(element.firstChild.classList, instance[type + 'IconClassList']);
    element.firstChild.classList.remove.apply(element.firstChild.classList, instance[anothorType + 'IconClassList']);
}
// 处理密码class
function handlePasswordClass(element, instance, type) {
    // 添加成功/失败class
    var resultType = type > 1 ? 'success' : 'failed';
    var anothorType = resultType === 'success' ? 'failed' : 'success';
    element.classList.remove.apply(element.classList, instance[anothorType + 'ClassList']);
    element.classList.add.apply(element.classList, instance[resultType + 'ClassList']);

    // 处理图标class
    var iconDom = getFirstElement(getLastElement(element));
    iconDom.classList.add.apply(iconDom.classList, instance[resultType + 'IconClassList']);
    iconDom.classList.remove.apply(iconDom.classList, instance[anothorType + 'IconClassList']);

    var classMap = ['too_short', 'too_long', 'weak', 'medium', 'strong', 'very_strong'];
    element.classList.remove.apply(element.classList, classMap);
    element.classList.add(classMap[type]);
}
function getElementValue(currentElement) {
    var _getValueByHtmlTag = {
        input: function input(element) {
            return element.value;
        },
        select: function select(element) {
            var text = element.options[element.selectedIndex].text,
                value = element.options[element.selectedIndex].value;
            // value不为空时取value，否则取text
            return value ? value : text;
        }
    };
    var htmlTag = currentElement.tagName.toLowerCase();
    return _getValueByHtmlTag[htmlTag](currentElement);
}

// 获取radio或checkbox值，如果为多选，则把获取到的多个值拼接为一个字符串
function getCheckValue(nodeList) {
    var value = '';
    for (var i = 0; i < nodeList.length; i++) {
        if (nodeList[i].checked) {
            value += nodeList[i].value;
        }
    }
    return value;
}

// 绑定事件
function addEventListner(element, type, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    } else {
        element["on" + type] = fn;
    }
}

// 处理所有事件

function bindNormalEvent(context, currentElement, tipsElement, item, index, support) {

    var _this = context,
        valideType = item.type;

    addEventListner(currentElement, item.trigger, function () {
        for (var i = 0, l = valideType.length; i < l; i++) {
            if (!support[valideType[i].slug]) {
                throw new Error("liveValidator暂不支持" + valideType[i].slug + "类型验证");
            }
            if (valideType[i].slug === 'require' && !valideType[i].controller) {
                break;
            }
            // 该类型验证对应的提示文本p元素的id
            var tipIdOfThisType = 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i;

            // switch (valideType[i].slug) {
            //     case 'require':
            //     case 'email':
            //     case 'username':
            //     case 'equal':
            //         support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i])
            //         break
            //     case 'password':
            //         support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i])
            //         break
            // }
            support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i]);
        }
        tipsElement.style.display = 'block';
    });

    // 失去焦点时
    addEventListner(currentElement, 'blur', function () {

        var isAllOK = true;
        for (var i = 0, l = valideType.length; i < l; i++) {
            if (!support[valideType[i].slug]) {
                throw new Error("liveValidator暂不支持" + valideType[i].slug + "类型验证");
            }
            if (valideType[i].slug === 'require' && !valideType[i].controller) {
                break;
            }
            // 该类型验证对应的提示文本p元素的id
            var tipIdOfThisType = 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i;

            var isValide = support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i], 1);
            if (!isValide) {
                isAllOK = false;
            }
        }
        // 当有一个未验证通过时，显示出错误信息
        if (!isAllOK) {
            tipsElement.style.display = 'block';
        } else {
            tipsElement.style.display = 'none';
        }
    });

    // 启用获取焦点时显示提示时执行
    if (_this.options.onFocusShowTips) {
        addEventListner(currentElement, 'focus', function () {
            for (var i = 0, l = valideType.length; i < l; i++) {
                if (!support[valideType[i].slug]) {
                    throw new Error("liveValidator暂不支持" + valideType[i].slug + "类型验证");
                    console.log("liveValidator暂不支持" + valideType[i].slug + "类型验证");
                    break;
                }
                if (valideType[i].slug === 'require' && !valideType[i].controller) {
                    break;
                }
                // 该类型验证对应的提示文本p元素的id
                var tipIdOfThisType = 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i;

                support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i]);
            }
            tipsElement.style.display = 'block';
        });
    }
}

function bindCheckEvent(context, currentElement, tipsElement, item, index, support, elementCollection) {

    var _this = context,
        valideType = item.type;

    addEventListner(currentElement, item.trigger, function () {
        for (var i = 0, l = valideType.length; i < l; i++) {
            if (!support[valideType[i].slug]) {
                throw new Error("liveValidator暂不支持" + valideType[i].slug + "类型验证");
            }
            if (valideType[i].slug === 'require' && !valideType[i].controller) {
                break;
            }
            // 该类型验证对应的提示文本p元素的id
            var tipIdOfThisType = 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i;

            // switch (valideType[i].slug) {
            //     case 'require':
            //     case 'email':
            //     case 'username':
            //     case 'equal':
            //         support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i])
            //         break
            //     case 'password':
            //         support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i])
            //         break
            // }
            support[valideType[i].slug]['handler'](_this, elementCollection, tipIdOfThisType, valideType[i]);
        }
        tipsElement.style.display = 'block';
    });

    // radio和checkbox不能使用获取焦点事件
    // 失去焦点时
    addEventListner(currentElement, 'blur', function () {

        var isAllOK = true;
        for (var i = 0, l = valideType.length; i < l; i++) {
            if (!support[valideType[i].slug]) {
                throw new Error("liveValidator暂不支持" + valideType[i].slug + "类型验证");
            }
            if (valideType[i].slug === 'require' && !valideType[i].controller) {
                break;
            }
            // 该类型验证对应的提示文本p元素的id
            var tipIdOfThisType = 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i;

            var isValide = support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i], 1);
            if (!isValide) {
                isAllOK = false;
            }
        }
        // 当有一个未验证通过时，显示出错误信息
        if (!isAllOK) {
            tipsElement.style.display = 'block';
        } else {
            tipsElement.style.display = 'none';
        }
    });
}

// 计算密码强度
function rankPassword(password, minLength, maxLength) {
    if (minLength < 4) {
        throw new Error('密码最小长度不可小于4');
    }
    if (maxLength < 6) {
        throw new Error('密码最大长度不可小于6');
    }
    var rank = {
        too_short: 0,
        too_long: 1,
        weak: 2,
        medium: 3,
        strong: 4,
        very_strong: 5
    };

    var upper = /[A-Z]/,
        lower = /[a-z]/,
        number = /[0-9]/,
        special = /[^A-Za-z0-9]/,

    // 记录符号种类个数
    charTypeScore = 0,
        score = 0;

    if (password.length < minLength) {
        return rank.too_short; // End early
    }

    if (password.length > maxLength) {
        return rank.too_long; // End early
    }

    // Increment the score for each of these conditions
    if (upper.test(password)) score++;
    if (lower.test(password)) score++;
    if (number.test(password)) score++;
    if (special.test(password)) score++;

    charTypeScore = score;
    // Penalize if there aren't at least three char types
    if (score < 3) score--;

    if (password.length > minLength) {
        // Increment the score for every 2 chars longer than the minimum
        score += Math.floor((password.length - minLength) / 2);
    }

    // 如果只包含一种符号，永远只能是弱密码
    if (charTypeScore < 2) return rank.weak;

    // Return a ranking based on the calculated score
    // score is 2 or lower
    if (score < 3) return rank.weak;
    // 只包含2中符号的，永远只能是中等强度密码
    if (score < 4 || charTypeScore < 3) return rank.medium;
    // score is 4 or 5
    if (score < 6) return rank.strong;
    // score is 6 or higher
    return rank.very_strong;
}

function isNode(o) {
    return (typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === "object" ? o instanceof Node : o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
}

//Returns true if it is a DOM element    
function isElement(o) {
    return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
    o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.equal = exports.require = exports.password = exports.email = exports.username = undefined;

var _utils = __webpack_require__(1);

var username = exports.username = {
    handler: function handler(context, currentElement, tipIdOfThisType, item, justValide) {
        var _this = context;
        var value = void 0;
        // 判断currentElement是不是collection形式
        // nodelist时认为是radio或者CheckBox
        if (currentElement.length) {
            value = (0, _utils.getCheckValue)(currentElement);
        } else {
            value = (0, _utils.getElementValue)(currentElement);
        } // 是否允许中文
        var allowChinese = item.controller.allowChinese ? '\\u4e00-\\u9fa5' : '';
        var reg = new RegExp('^[a-zA-Z0-9' + allowChinese + '_-]{' + item.controller.min + ',' + item.controller.max + '}$');

        var testResult = reg.test(value);
        // 仅验证模式
        if (justValide) {
            return testResult;
        }
        var tipWraper = document.getElementById(tipIdOfThisType);
        if (testResult) {
            (0, _utils.handleElementClass)(tipWraper, _this, 'success');
        } else {
            (0, _utils.handleElementClass)(tipWraper, _this, 'failed');
        }

        return testResult;
    },
    tips: function tips(controller) {
        var string = '长度' + controller.min + '到' + controller.max + '位，只能包含英文、数字、"_"或"-"';
        return string;
    }
};

var email = exports.email = {
    handler: function handler(context, currentElement, tipIdOfThisType, item, justValide) {
        var _this = context;
        var value = void 0;
        // 判断currentElement是不是collection形式
        // nodelist时认为是radio或者CheckBox
        if (currentElement.length) {
            value = (0, _utils.getCheckValue)(currentElement);
        } else {
            value = (0, _utils.getElementValue)(currentElement);
        }
        var reg = new RegExp('^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$');
        var testResult = reg.test(value);
        // 仅验证模式
        if (justValide) {
            return testResult;
        }
        var tipWraper = document.getElementById(tipIdOfThisType);
        if (testResult) {
            (0, _utils.handleElementClass)(tipWraper, _this, 'success');
        } else {
            (0, _utils.handleElementClass)(tipWraper, _this, 'failed');
        }

        return testResult;
    },
    tips: function tips(controller) {
        return '请输入正确的邮箱';
    }
};

var password = exports.password = {
    handler: function handler(context, currentElement, tipIdOfThisType, item, justValide) {
        var _this = context;
        var value = void 0;
        // 判断currentElement是不是collection形式
        // nodelist时认为是radio或者CheckBox
        if (currentElement.length) {
            value = (0, _utils.getCheckValue)(currentElement);
        } else {
            value = (0, _utils.getElementValue)(currentElement);
        }

        var controller = item.controller;
        var strengthMap = {
            too_short: 0,
            too_long: 1,
            weak: 2,
            medium: 3,
            strong: 4,
            very_strong: 5
        };
        var min = controller.min ? controller.min : 6,
            max = controller.max ? controller.max : 32,
            lowest = controller.allowLowestLevel ? controller.allowLowestLevel : 'weak';
        var testResult = (0, _utils.rankPassword)(value, min, max);
        // 仅验证模式
        if (justValide) {
            // 结果不为
            return testResult > 1 && testResult >= strengthMap[lowest] ? true : false;
        }
        var tipWraper = document.getElementById(tipIdOfThisType);
        if (testResult) {
            (0, _utils.handlePasswordClass)(tipWraper, _this, testResult);
        } else {
            (0, _utils.handlePasswordClass)(tipWraper, _this, testResult);
        }

        return testResult > 1 && testResult >= strengthMap[lowest] ? true : false;
    },
    tips: function tips(controller) {
        var pwTip = document.createDocumentFragment(),
            min = controller.min ? controller.min : 6,
            max = controller.max ? controller.max : 32;

        var inputTips = {
            weak: '\u5BC6\u7801\u957F\u5EA6\u4E3A' + min + '\u5230' + max + '\uFF0C\u5141\u8BB8\u4F7F\u7528\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u7B26\u53F7',
            medium: '\u5BC6\u7801\u957F\u5EA6\u4E3A' + min + '\u5230' + max + '\uFF0C\u5FC5\u987B\u5305\u542B\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u7B26\u53F7\u81F3\u5C112\u79CD',
            strong: '\u5BC6\u7801\u957F\u5EA6\u4E3A' + min + '\u5230' + max + '\uFF0C\u5FC5\u987B\u5305\u542B\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u7B26\u53F7\u81F3\u5C113\u79CD',
            very_strong: '\u5BC6\u7801\u957F\u5EA6\u4E3A' + min + '\u5230' + max + '\uFF0C\u5FC5\u987B\u5305\u542B\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u7B26\u53F7\u81F3\u5C113\u79CD'

            // 生成密码强度指示器
        };var createSymbol = document.createElement('div');
        createSymbol.classList.add('lv-pw-strength');
        pwTip.appendChild(createSymbol);

        // 生成密码填写文字提示
        var createTextTip = document.createElement('div');
        var lowest = controller.allowLowestLevel ? controller.allowLowestLevel : 'medium';
        createTextTip.innerText = inputTips[lowest];

        createTextTip.classList.add('lv-pw-text-tip');
        pwTip.appendChild(createTextTip);

        return pwTip;
    }
};

var _require = {
    handler: function handler(context, currentElement, tipIdOfThisType, item, justValide) {
        var _this = context;
        var value = void 0;
        // 判断currentElement是不是collection形式
        // nodelist时认为是radio或者CheckBox
        if (!(0, _utils.isElement)(currentElement)) {
            value = (0, _utils.getCheckValue)(currentElement);
        } else {
            value = (0, _utils.getElementValue)(currentElement);
        }

        var testResult = value && value.length ? true : false;
        // 仅验证模式
        if (justValide) {
            return testResult;
        }
        var tipWraper = document.getElementById(tipIdOfThisType);
        if (testResult) {
            (0, _utils.handleElementClass)(tipWraper, _this, 'success');
        } else {
            (0, _utils.handleElementClass)(tipWraper, _this, 'failed');
        }

        return testResult;
    },
    tips: function tips(controller) {
        return '不能为空';
    }
};

exports.require = _require;
var equal = exports.equal = {
    handler: function handler(context, currentElement, tipIdOfThisType, item, justValide) {
        if (!item.controller || !item.controller.compareTarget) {
            throw new Error("equal类验证controller.compareTarget属性不可为空");
        }
        var _this = context,
            value = (0, _utils.getElementValue)(currentElement),
            compareElementSelector = item.controller.compareTarget.trim().substr(1),
            compareValue = (0, _utils.getElementValue)(document.getElementById(compareElementSelector)),
            testResult = value === compareValue;
        // 仅验证模式
        if (justValide) {
            return testResult;
        }
        var tipWraper = document.getElementById(tipIdOfThisType);
        if (testResult) {
            (0, _utils.handleElementClass)(tipWraper, _this, 'success');
        } else {
            (0, _utils.handleElementClass)(tipWraper, _this, 'failed');
        }

        return testResult;
    },
    tips: function tips(controller) {
        return '再次输入内容';
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.valide = valide;

var _support = __webpack_require__(2);

var support = {
    username: _support.username,
    email: _support.email,
    password: _support.password,
    require: _support.require,
    equal: _support.equal
};

function valide(context) {
    var liveValidator = context;
    var result = true;
    for (var i = 0, l = liveValidator.needValide.length; i < l; i++) {
        // 有验证未通过时停止继续验证
        if (!result) {
            break;
        }

        var elementSelector = liveValidator.needValide[i].element.trim().substr(1),
            elementQueryType = liveValidator.needValide[i].element.trim().substr(0, 1),
            tipsSelector = liveValidator.needValide[i].tipsContainer.trim().substr(1),
            tipsElement = document.getElementById(tipsSelector),
            valideType = liveValidator.needValide[i].type;

        // 没有需验证的内容
        if (!valideType) {
            return true;
        }
        for (var j = 0, k = valideType.length; j < k; j++) {
            if (!support[valideType[j].slug]) {
                throw new Error("liveValidator暂不支持" + valideType[j].slug + "类型验证");
            }
            // 当验证类型是必填项时特殊处理，controller为false时不进行验证
            if (valideType[j].slug === 'require' && !valideType[j].controller) {
                break;
            }

            // 该类型验证对应的提示文本p元素的id
            var tipIdOfThisType = 'lv-tips-' + valideType[j].slug + '-' + i + '-' + j;
            var isValide = void 0;

            switch (elementQueryType) {
                case '#':
                    var currentElement = document.getElementById(elementSelector);
                    isValide = support[valideType[j].slug]['handler'](liveValidator, currentElement, tipIdOfThisType, valideType[j]);
                    break;
                case '@':
                    var elementCollection = document.getElementsByName(elementSelector);
                    isValide = support[valideType[j].slug]['handler'](liveValidator, elementCollection, tipIdOfThisType, valideType[j]);
                    break;
            }

            // 当有表单未验证通过时，停止继续验证并且显示出错误信息
            if (!isValide) {
                result = false;
                tipsElement.style.display = 'block';
                break;
            } else {
                tipsElement.style.display = 'none';
            }
        }
    }
    return result;
}

/***/ })
/******/ ])["default"];
});