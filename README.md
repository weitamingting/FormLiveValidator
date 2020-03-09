# FormLiveValidator

一个非常简洁轻量的表单验证插件，可以实时监测表单输入是否合规，提供了用户名、密码、邮箱等验证，带密码强度指示器，无js库依赖
--------
A very simple javascript form validator with live tips, indicator of password strength, email validate, username, etc

## 安装

```sh
npm install --save form-live-validator
```

或者使用dist中已经编译好的js文件：

```html
<script src="/path/to/live-validator.min.js"></script>
```
## 使用

```html
<script src="/path/to/live-validator.min.js"></script>
```

```js
// ES6 Modules or TypeScript
import LiveValidator from 'form-live-validator'

// CommonJS
const LiveValidator = require('form-live-validator')
```

```js
var test = new LiveValidator({
            // needValide：一个对象数组，记录了所有需要验证的表单和验证类型等信息
            needValide: [
                {
                    // element：表单（input、radio、select等）的id或name属性，id以#号开头，name以@开头，例如：#test、@test 
                    element: '#test1',
                    // type：一个对象数组，记录了当前element需要执行的验证类型
                    type: [
                        {
                            // slug：验证类型，例如：require(必填)、username(用户名)、password(密码)
                            slug: 'require',
                            // controller：该验证类型的控制器
                            controller: true,
                            // tipsText：该验证类型的信息提示语，为空则使用默认提示语
                            tipsText: '用户名不能为空'
                        },
                        {
                            slug: 'username',
                            controller: {
                                min: 4,
                                max: 10,
                                allowChinese: true
                            }
                        }
                    ],
                    // 触发验证的事件，如input、change
                    trigger: 'input',
                    // 提示信息的容器id
                    tipsContainer: '#tips'
                },
                {
                    element: '#test2',
                    type: [
                        {
                            slug: 'require',
                            controller: true
                        },
                        {
                            slug: 'email',
                            controller: {}
                        }
                    ],
                    trigger: 'input',
                    tipsContainer: '#tips2'
                },
                {
                    element: '#test3',
                    type: [
                        {
                            slug: 'require',
                            controller: true
                        },
                        {
                            slug: 'password',
                            controller: {
                                min: 4,
                                max: 20,
                                allowLowestLevel: 'weak'    // weak, medium, strong, very_strong
                            }
                        }
                    ],
                    trigger: 'input',
                    tipsContainer: '#tips3'
                },
                {
                    element: '#test4',
                    type: [
                        {
                            slug: 'equal',
                            controller: {
                                compareTarget: '#test3'
                            },
                            tipsText: '再次输入密码'
                        }
                    ],
                    trigger: 'input',
                    tipsContainer: '#tips4'
                },
                {
                    element: '#test5',
                    type: [
                        {
                            slug: 'require',
                            controller: true,
                            tipsText: '必填项目'
                        }
                    ],
                    trigger: 'input',
                    tipsContainer: '#tips7'
                },
                {
                    element: '@radio',
                    type: [
                        {
                            slug: 'require',
                            controller: {
                            },
                            tipsText: '必填项目'
                        }
                    ],
                    trigger: 'change',
                    tipsContainer: '#tips5'
                },
                {
                    element: '@checkbox',
                    type: [
                        {
                            slug: 'require',
                            controller: {
                            },
                            tipsText: '必填项目'
                        }
                    ],
                    trigger: 'change',
                    tipsContainer: '#tips6'
                }

            ],
            failedClass: 'lv-failed',               // 验证失败class，多个用空格隔开
            successClass: 'lv-success',             // 验证成功class，多个用空格隔开
            failedIconClass: 'lv-failed-icon',      // 验证失败图标class，多个用空格隔开
            successIconClass: 'lv-success-icon',    // 验证成功图标class，多个用空格隔开
            onFocusShowTips: true                   // 获取焦点时显示提示信息
        })
    document.getElementById('valid').onclick = function(){
        // 使用valide()方法获取验证结果，成功返回true，失败返回false
        let a= test.valide()
        console.log(a)
        if (a) {
            // 验证通过执行表单提交...
            formSubmit()
        }
    }
```
