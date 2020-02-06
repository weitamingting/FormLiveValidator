import { handleElementClass, handlePasswordClass, getElementValue, rankPassword, getCheckValue, isElement } from '@/utils'

export const username = {
    handler: function (context, currentElement, tipIdOfThisType, item, justValide) {
        const _this = context
        let value
        // 判断currentElement是不是collection形式
        // nodelist时认为是radio或者CheckBox
        if (currentElement.length) {
            value = getCheckValue(currentElement)
        } else {
            value = getElementValue(currentElement)
        }        // 是否允许中文
        const allowChinese = item.controller.allowChinese? '\\u4e00-\\u9fa5': ''
        const reg = new RegExp('^[a-zA-Z0-9'+ allowChinese +'_-]{' + item.controller.min + ',' + item.controller.max + '}$')

        const testResult = reg.test(value)
        // 仅验证模式
        if(justValide){
            return testResult
        }
        const tipWraper = document.getElementById(tipIdOfThisType)
        if( testResult ){
            handleElementClass(tipWraper, _this, 'success')
        }else{
            handleElementClass(tipWraper, _this, 'failed')
        }

        return testResult
    },
    tips: function ( controller ) {
        var string = '长度'+ controller.min + '到' + controller.max + '位，只能包含英文、数字、"_"或"-"'
        return string
    }
}

export const email = {
    handler: function (context, currentElement, tipIdOfThisType, item, justValide) {
        const _this = context
        let value
        // 判断currentElement是不是collection形式
        // nodelist时认为是radio或者CheckBox
        if (currentElement.length) {
            value = getCheckValue(currentElement)
        } else {
            value = getElementValue(currentElement)
        }
        const reg = new RegExp('^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$')
        const testResult = reg.test(value)
        // 仅验证模式
        if(justValide){
            return testResult
        }
        const tipWraper = document.getElementById(tipIdOfThisType)
        if( testResult ){
            handleElementClass(tipWraper, _this, 'success')
        }else{
            handleElementClass(tipWraper, _this, 'failed')
        }

        return testResult
    },
    tips: function ( controller ) {
        return '请输入正确的邮箱'
    },
}

export const password = {
    handler: function (context, currentElement, tipIdOfThisType, item, justValide) {
        const _this = context
        let value
        // 判断currentElement是不是collection形式
        // nodelist时认为是radio或者CheckBox
        if (currentElement.length) {
            value = getCheckValue(currentElement)
        } else {
            value = getElementValue(currentElement)
        }

        const controller = item.controller
        const strengthMap = {
            too_short: 0,
            too_long: 1,
            weak: 2,
            medium: 3,
            strong: 4,
            very_strong: 5
        }
        let min = controller.min? controller.min: 6,
            max = controller.max? controller.max: 32,
            lowest = controller.allowLowestLevel? controller.allowLowestLevel: 'weak'
        const testResult = rankPassword(value, min, max)
        // 仅验证模式
        if(justValide){
            // 结果不为
            return testResult > 1 && testResult >= strengthMap[lowest] ? true : false
        }
        const tipWraper = document.getElementById(tipIdOfThisType)
        if( testResult ){
            handlePasswordClass(tipWraper, _this, testResult)
        }else{
            handlePasswordClass(tipWraper, _this, testResult)
        }

        return testResult > 1 && testResult >= strengthMap[lowest] ? true : false
    },
    tips: function ( controller ) {
        const pwTip = document.createDocumentFragment(),
              indicator = controller.indicator ? controller.indicator : ['too_short', 'weak', 'medium', 'strong', 'very_strong', 'very_long'],
              min = controller.min? controller.min: 6,
              max = controller.max? controller.max: 32

        const inputTips = {
            weak: `密码长度为${min}到${max}，允许使用字母、数字、符号`,
            medium: `密码长度为${min}到${max}，必须包含字母、数字、符号至少2种`,
            strong: `密码长度为${min}到${max}，必须包含字母、数字、符号至少3种`,
            very_strong: `密码长度为${min}到${max}，必须包含字母、数字、符号至少3种`,
        }

        const symbolList = {
            too_short: {
                innerText: '太短',
                class: 'lv-indicator-too-short'
            },
            weak: {
                innerText: '弱',
                class: 'lv-indicator-weak'
            },
            medium: {
                innerText: '中等',
                class: 'lv-indicator-medium'
            },
            strong: {
                innerText: '强',
                class: 'lv-indicator-strong'
            },
            very_strong: {
                innerText: '非常强',
                class: 'lv-indicator-very-strong'
            },
            too_long: {
                innerText: '太长',
                class: 'lv-indicator-too-long'
            }
        }

        // 生成密码强度指示器
        const createSymbol = document.createElement('div')
        createSymbol.classList.add('lv-pw-strength')

        indicator.forEach( (item) => {
            const symbol = symbolList[item],
                  createIndicator = document.createElement('span')
            createIndicator.innerText = symbol.innerText
            createIndicator.classList.add(symbol.class)
            createSymbol.appendChild(createIndicator)
        } )

        pwTip.appendChild(createSymbol)

        // 生成密码填写文字提示
        const createTextTip = document.createElement('div')
        const lowest = controller.allowLowestLevel ? controller.allowLowestLevel : 'medium'
        createTextTip.innerText = inputTips[lowest]

        createTextTip.classList.add('lv-pw-text-tip')
        pwTip.appendChild(createTextTip)

        return pwTip
    },
}

export const require = {
    handler: function (context, currentElement, tipIdOfThisType, item, justValide) {
        const _this = context
        let value
        // 判断currentElement是不是collection形式
        // nodelist时认为是radio或者CheckBox
        if ( !isElement(currentElement) ) {
            value = getCheckValue(currentElement)
        } else {
            value = getElementValue(currentElement)
        }

        const testResult = value && value.length ? true : false
        // 仅验证模式
        if(justValide){
            return testResult
        }
        const tipWraper = document.getElementById(tipIdOfThisType)
        if( testResult ){
            handleElementClass(tipWraper, _this, 'success')
        }else{
            handleElementClass(tipWraper, _this, 'failed')
        }

        return testResult
    },
    tips: function ( controller ) {
        return '不能为空'
    }
}

export const equal = {
    handler: function (context, currentElement, tipIdOfThisType, item, justValide) {
        if ( !item.controller || !item.controller.compareTarget ) {
            throw new Error("equal类验证controller.compareTarget属性不可为空")
        }
        const _this = context,
              value = getElementValue(currentElement),
              compareElementSelector = item.controller.compareTarget.trim().substr(1),
              compareValue = getElementValue(document.getElementById(compareElementSelector)),
              testResult = value === compareValue
        // 仅验证模式
        if(justValide){
            return testResult
        }
        const tipWraper = document.getElementById(tipIdOfThisType)
        if( testResult ){
            handleElementClass(tipWraper, _this, 'success')
        }else{
            handleElementClass(tipWraper, _this, 'failed')
        }

        return testResult
    },
    tips: function ( controller ) {
        return '再次输入内容'
    }
}