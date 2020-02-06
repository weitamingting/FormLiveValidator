//移除所有子节点
export function removeAllChildren(dom) {
    const childs = dom.childNodes;
    for (let i = childs.length - 1; i >= 0; i--) {
        dom.removeChild(childs[i]);
    }
}

// 获取第一个非text类型元素
export function getFirstElement(dom) {
    return dom.firstElementChild ? dom.firstElementChild : dom.firstChild;
}

// 获取最后一个非text类型元素
export function getLastElement(dom) {
    return dom.lastElementChild ? dom.lastElementChild : dom.lastChild;
}

// 批量向dom添加class
export function addClassMulti(dom, classArray) {
    dom.classList.add.apply(dom.classList, classArray)
}
// 处理class
export function handleElementClass(element, instance, type) {
    let anothorType = type === 'success'? 'failed': 'success'
    element.classList.remove(...instance[anothorType + 'ClassList'])
    element.classList.add(...instance[type + 'ClassList'])

    element.firstChild.classList.remove(...instance[anothorType + 'IconClassList'])
    element.firstChild.classList.add(...instance[type + 'IconClassList'])
}
// 处理密码class
export function handlePasswordClass(element, instance, testResult, pwRank){
    // 添加成功/失败class
    let resultType = testResult? 'success': 'failed'
    let anothorType = resultType === 'success'? 'failed': 'success'
    element.classList.remove(...instance[anothorType + 'ClassList'])
    element.classList.add(...instance[resultType + 'ClassList'])

    // 处理图标class
    const iconDom = getFirstElement( getLastElement(element) )
    iconDom.classList.remove(...instance[anothorType + 'IconClassList'])
    iconDom.classList.add(...instance[resultType + 'IconClassList'])

    const classMap = ['lv-pw-too-short', 'lv-pw-too-long', 'lv-pw-weak', 'lv-pw-medium', 'lv-pw-strong', 'lv-pw-very-strong']
    element.classList.remove(...classMap)
    element.classList.add(classMap[pwRank])
}
export function getElementValue(currentElement){
    const _getValueByHtmlTag = {
        input: function (element) {
            return element.value
        },
        select: function (element) {
            const text = element.options[element.selectedIndex].text,
                  value = element.options[element.selectedIndex].value
            // value不为空时取value，否则取text
            return value ? value : text
        }
    }
    const htmlTag = currentElement.tagName.toLowerCase()
    return _getValueByHtmlTag[htmlTag](currentElement)
}

// 获取radio或checkbox值，如果为多选，则把获取到的多个值拼接为一个字符串
export function getCheckValue( nodeList ){
    let value = ''
    for(var i=0;i<nodeList.length;i++){
        if(nodeList[i].checked){
            value += nodeList[i].value;
        }
    }
    return value
}

// 绑定事件
export function addEventListner(element, type, fn) {
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    } else {
        element["on" + type] = fn;
    }
}

// 处理所有事件

export function bindNormalEvent( context, currentElement, tipsElement, item, index, support ){

    const _this = context,
          valideType = item.type

    addEventListner(currentElement, item.trigger, function () {
        for (var i = 0, l = valideType.length; i < l; i++){
            if( !support[valideType[i].slug] ){
                throw new Error("liveValidator暂不支持"+ valideType[i].slug +"类型验证")
            }
            if (valideType[i].slug === 'require' && !valideType[i].controller){
                break
            }
            // 该类型验证对应的提示文本p元素的id
            const tipIdOfThisType = 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i

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
            support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i])
        }
        tipsElement.style.display = 'block'
    })

    // 失去焦点时
    addEventListner(currentElement, 'blur', function () {

        let isAllOK = true
        for (let i = 0, l = valideType.length; i < l; i++){
            if( !support[valideType[i].slug] ){
                throw new Error("liveValidator暂不支持"+ valideType[i].slug +"类型验证")
            }
            if (valideType[i].slug === 'require' && !valideType[i].controller){
                break
            }
            // 该类型验证对应的提示文本p元素的id
            const tipIdOfThisType = 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i

            const isValide = support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i], 1)
            if(!isValide){
                isAllOK = false
            }
        }
        // 当有一个未验证通过时，显示出错误信息
        if(!isAllOK){
            tipsElement.style.display = 'block'
        }else{
            tipsElement.style.display = 'none'
        }
    })

    // 启用获取焦点时显示提示时执行
    if (_this.options.onFocusShowTips){
        addEventListner(currentElement, 'focus', function () {
            for (let i = 0, l = valideType.length; i < l; i++) {
                if (!support[valideType[i].slug]) {
                    throw new Error("liveValidator暂不支持"+ valideType[i].slug +"类型验证")
                    console.log("liveValidator暂不支持" + valideType[i].slug + "类型验证")
                    break
                }
                if (valideType[i].slug === 'require' && !valideType[i].controller) {
                    break
                }
                // 该类型验证对应的提示文本p元素的id
                const tipIdOfThisType = 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i

                support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i])
            }
            tipsElement.style.display = 'block'
        })
    }
}

export function bindCheckEvent( context, currentElement, tipsElement, item, index, support, elementCollection ){

    const _this = context,
          valideType = item.type

    addEventListner(currentElement, item.trigger, function () {
        for (var i = 0, l = valideType.length; i < l; i++){
            if( !support[valideType[i].slug] ){
                throw new Error("liveValidator暂不支持"+ valideType[i].slug +"类型验证")
            }
            if (valideType[i].slug === 'require' && !valideType[i].controller){
                break
            }
            // 该类型验证对应的提示文本p元素的id
            const tipIdOfThisType = 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i

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
            support[valideType[i].slug]['handler'](_this, elementCollection, tipIdOfThisType, valideType[i])
        }
        tipsElement.style.display = 'block'
    })

    // radio和checkbox不能使用获取焦点事件
    // 失去焦点时
    addEventListner(currentElement, 'blur', function () {

        let isAllOK = true
        for (let i = 0, l = valideType.length; i < l; i++){
            if( !support[valideType[i].slug] ){
                throw new Error("liveValidator暂不支持"+ valideType[i].slug +"类型验证")
            }
            if (valideType[i].slug === 'require' && !valideType[i].controller){
                break
            }
            // 该类型验证对应的提示文本p元素的id
            const tipIdOfThisType = 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i

            const isValide = support[valideType[i].slug]['handler'](_this, currentElement, tipIdOfThisType, valideType[i], 1)
            if(!isValide){
                isAllOK = false
            }
        }
        // 当有一个未验证通过时，显示出错误信息
        if(!isAllOK){
            tipsElement.style.display = 'block'
        }else{
            tipsElement.style.display = 'none'
        }
    })
}

// 计算密码强度
export function rankPassword( password, minLength, maxLength ) {
    if (minLength < 4){
        throw new Error('密码最小长度不可小于4')
    }
    if (maxLength < 6){
        throw new Error('密码最大长度不可小于6')
    }
    const rank = {
        too_short: 0,
        too_long: 1,
        weak: 2,
        medium: 3,
        strong: 4,
        very_strong: 5
    }

    let upper = /[A-Z]/,
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

export function isNode(o){
    return (
        typeof Node === "object" ? o instanceof Node : 
        o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
    );
  }
  
  //Returns true if it is a DOM element    
export function isElement(o){
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
}