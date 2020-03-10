# FormLiveValidator

一个非常简洁轻量的表单验证插件，可以实时监测表单输入是否合规，提供了用户名、密码、邮箱等验证，带密码强度指示器，无js库依赖。

[效果演示](https://weitamingting.github.io/FormLiveValidator/ "效果演示")

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
## 选项说明

| 选项 | 类型 | 说明 | 示例 |
| ---------- | ----------- | ----------- | ----------- |
| needValide | Array | 一个对象数组，记录了所有需要验证的表单和验证类型等信息，每个对象含有四个属性`element`、`type`、`trigger`、`tipsContainer`；| ... |
| needValide[n].element | String | 需要验证的表单元素的id或name，当表单元素为input，并且type为text/email/number等单行文本或select时使用id选择器，以#号开头，例如"#test"，当表单元素为radio、checkbox时，使用name选择器，以@开头，例如"@test" | "#element-id"/"@element-name" |
| needValide[n].type | String | 该表单元素需要进行的验证类型，是一个对象数组，每个对象由三个属性构成:slug、controller、tipsText | ... |
| needValide[n].type[n].slug | String | 验证类型名称，例如必填项："require"，目前支持必填项、用户名、密码强度等验证类型，将在下方详细介绍 | 'require' |
| needValide[n].type[n].controller | Object/Boolean | 当前验证类型的控制器，例如验证类型为密码强度时，你可以在controller中规定密码最短位数、最长位数等信息，下方会详细介绍每个验证类型的controller | ... |
| needValide[n].type[n].tipsText | String | 当前验证类型的提示文本 | '必填项目' |
| needValide[n].trigger | String | 触发验证的事件； | 'change'/'input'/'click'等 |
| needValide[n].tipsContainer | String | 当前验证类型的提示文本的容器id，needValide[n].type[n].tipsText中设置的文本将显示在这里，当needValide[n].type元素不止一个时会为每种验证类型创建提示； | '#test' |
| failedClass | String | 当验证失败时为tipsText所在的DOM添加的class，可以多个，中间用空格隔开 | 'lv-failed' |
| successClass | String | 当验证成功时为tipsText所在的DOM添加的class，可以多个，中间用空格隔开 | 'lv-success' |
| failedIconClass | String | LiveValidator会在每条验证提示前面添加一个```html<i></i>```元素，并且会根据验证成功/失败添加不同的class，你可以利用字体图标或背景图为不同验证状态添加不同的图标，failedIconClass为验证失败时在```html<i></i>```元素添加的class，可以多个，中间用空格隔开 | 'lv-failed-icon' |
| successIconClass | String | LiveValidator会在每条验证提示前面添加一个```html<i></i>```元素，并且会根据验证成功/失败添加不同的class，你可以利用字体图标或背景图为不同验证状态添加不同的图标，successIconClass为验证成功时在```html<i></i>```元素添加的class，可以多个，中间用空格隔开 | 'lv-success-icon' |
| onFocusShowTips | Boolean | 获取焦点时是否对当前表单验证 | true |

### 支持的验证类型
#### username
用户名验证，对字符串进行长度、字符类型验证；
##### 支持的controller
`min` 最短长度

`max` 最长长度

`allowChinese` 是否允许含有中文

例如：
```js
{
    slug: 'username',
    controller: {
        min: 4,
        max: 10,
        allowChinese: true
    }
}
```
***
#### require
是否必填，对表单的值长度进行验证，长度为0时验证失败，反之成功
##### 支持的controller
controller值为true时，是必填项，值为false时，是非必填项，缺省表示必填项

例如：
```js
{
    slug: 'require',
    controller: true
}
```
***
#### password
对密码的长度、强度进行验证，可以随用户输入自动计算密码强度并实时显示出来

密码提示由两部分构成：密码强度指示器、文本提示

LiveValidator会随用户输入自动计算密码强度，并将密码强度对应的class添加到密码强度指示器上，密码强度可能的class有：`lv-pw-too-short`（密码太短）、`lv-pw-weak`（弱）、`lv-pw-medium`（中等）、`lv-pw-strong`（强）、`lv-pw-very-strong`（非常强）

密码验证是否通过也会实时的显示反应到强度指示器上，具体来说就是将选项中规定的`successClass`/`failedClass`添加到强度指示器DOM

你可以根据这些实时的class做出非常多有意思的提示效果
##### 支持的controller
`min` 密码最短长度

`max` 密码最长长度

`allowLowestLevel` 允许密码的最低强度，允许的值有：`weak`, `medium`, `strong`, `very_strong`

`indicator`: 密码强度指示器显示的强度类型，一个数组，允许的值：`weak`, `medium`, `strong`, `very_strong`

例如：
```js
{
    slug: 'password',
    controller: {
        min: 4,
        max: 20,
        allowLowestLevel: 'weak',
        indicator: ['weak', 'medium', 'strong', 'very_strong']
    }
}
```
***
#### equal
判断与某表单元素值是否相等
##### 支持的controller
`compareTarget` 需要对比的表单元素的id

例如：
```js
{
    slug: 'equal',
    controller: {
        compareTarget: '#test3'
    }
}
```
***
#### email
对邮箱格式进行验证，暂不支持自定义controller

例如：
```js
{
    slug: 'email',
    controller: {}
}
```



## 方法
`valide()`
### 说明：
对表单进行验证
### 返回值：
`Boolean`，验证成功时为true，验证失败为false