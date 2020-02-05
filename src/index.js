import { addClassMulti, addEventListner, bindNormalEvent, bindCheckEvent } from '@/utils'
import { username, email, password, require, equal } from '@/support'
import { valide } from '@/methods'


const support = {
    username,
    email,
    password,
    require,
    equal
}

export default class LiveValidator {
    constructor( options ) {
        if(!options || !options.needValide){
            return
        }
        this.needValide = options.needValide
        const defaults = {
            needValide: [],
            failedClass: 'lv-failed',                 // 验证失败class
            successClass: 'lv-success',             // 验证成功class
            failedIconClass: 'lv-failed-icon',      // 验证失败图标class
            successIconClass: 'lv-success-icon',
            onFocusShowTips: true
        }
        this.options = Object.assign({}, defaults, options)
        this.successClassList = this.options.successClass.split(' ')
        this.failedClassList = this.options.failedClass.split(' ')

        this.successIconClassList = this.options.successIconClass.split(' ')
        this.failedIconClassList = this.options.failedIconClass.split(' ')

        let _this = this

        this.needValide.forEach(function (item, index){
            const elementSelector = item.element.trim().substr(1),
                  elementQueryType = item.element.trim().substr(0, 1),
                  tipsSelector = item.tipsContainer.trim().substr(1),
                  tipsElement = document.getElementById(tipsSelector),
                  valideType = item.type
            
            if(!valideType){
                return
            }

            // 先隐藏提示
            tipsElement.style.display = 'none'
            // 插入验证提示
            const currentTipFragment = document.createDocumentFragment()
            for (let i = 0, l = valideType.length; i < l; i++){
                if( !support[valideType[i].slug] ){
                    throw new Error("liveValidator暂不支持"+ valideType[i].slug +"类型验证")
                    console.log("liveValidator暂不支持"+ valideType[i].slug +"类型验证")
                    break
                }
                if (valideType[i].slug === 'require' && !valideType[i].controller){
                    break
                }
                const createTips = document.createElement('div')
                const createTipsIcon = document.createElement('i')

                // 添加id属性
                createTips.setAttribute('id', 'lv-tips-' + valideType[i].slug + '-' + index + '-' + i)

                // 添加对应class，默认全部为验证失败的class
                addClassMulti(createTips, _this.failedClassList)
                addClassMulti(createTipsIcon, _this.failedIconClassList)

                // 根据不同验证形式插入不同文字
                let tipsContent
                switch (valideType[i].slug) {
                    case 'require':
                    case 'email':
                    case 'username':
                    case 'equal':
                        tipsContent = valideType[i].tipsText? valideType[i].tipsText: support[valideType[i].slug]['tips'](valideType[i].controller)
                        createTips.innerText = tipsContent
                        createTips.insertBefore(createTipsIcon, createTips.firstChild)
                        break
                    case 'password':
                        tipsContent = valideType[i].tipsText? valideType[i].tipsText: support[valideType[i].slug]['tips'](valideType[i].controller)
                        createTips.appendChild(tipsContent)
                        // 插入图标
                        createTips.lastChild.insertBefore(createTipsIcon, createTips.lastChild.firstChild)
                        break
                }
                currentTipFragment.appendChild(createTips)
            }
            tipsElement.appendChild(currentTipFragment)

            // 绑定验证事件
            switch (elementQueryType) {
                case '#':
                    let currentElement = document.getElementById(elementSelector)
                    bindNormalEvent( _this, currentElement, tipsElement, item, index, support )
                    break
                case '@':
                    let elementCollection = document.getElementsByName(elementSelector)
                    elementCollection.forEach( ( elementItem ) => {
                        bindCheckEvent( _this, elementItem, tipsElement, item, index, support, elementCollection )
                    } )
                    break
            }

        })
    }

    valide() {
        return valide( this )
    }
}