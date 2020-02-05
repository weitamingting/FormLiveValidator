import { username, email, password, require, equal } from '@/support'

const support = {
    username,
    email,
    password,
    require,
    equal
}

export function valide ( context ) {
    const liveValidator = context
    let result = true
    for (let i = 0, l = liveValidator.needValide.length; i < l; i++){
        // 有验证未通过时停止继续验证
        if (!result){
            break
        }

        const elementSelector = liveValidator.needValide[i].element.trim().substr(1),
              elementQueryType = liveValidator.needValide[i].element.trim().substr(0, 1),
              tipsSelector = liveValidator.needValide[i].tipsContainer.trim().substr(1),
              tipsElement = document.getElementById(tipsSelector),
              valideType = liveValidator.needValide[i].type

        // 没有需验证的内容
        if(!valideType){
            return true
        }
        for (let j = 0, k = valideType.length; j < k; j++){
            if (!support[valideType[j].slug]) {
                throw new Error("liveValidator暂不支持"+ valideType[j].slug +"类型验证")
            }
            // 当验证类型是必填项时特殊处理，controller为false时不进行验证
            if (valideType[j].slug === 'require' && !valideType[j].controller){
                break
            }

            // 该类型验证对应的提示文本p元素的id
            const tipIdOfThisType = 'lv-tips-' + valideType[j].slug + '-' + i + '-' + j
            let isValide

            switch (elementQueryType) {
                case '#':
                    let currentElement = document.getElementById(elementSelector)
                    isValide = support[valideType[j].slug]['handler'](liveValidator, currentElement, tipIdOfThisType, valideType[j])
                    break
                case '@':
                    let elementCollection = document.getElementsByName(elementSelector)
                    isValide = support[valideType[j].slug]['handler'](liveValidator, elementCollection, tipIdOfThisType, valideType[j])
                    break
            }


            // 当有表单未验证通过时，停止继续验证并且显示出错误信息
            if(!isValide){
                result = false
                tipsElement.style.display = 'block'
                break
            }else{
                tipsElement.style.display = 'none'
            }
        }
    }
    return result
}
