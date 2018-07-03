import React, { Component } from 'react'

import Api from '@/tool/api.js'

import Header from '@/coms/header'

// 每一个 jsx 文件都得默认导出一个组件，格式如下
export default class Details extends Component {
    // 在这里，我们设置我们的初始数据，如，这里我们设置 dat 为一个空对象
    // 其他不用管，照抄，自己需要啥就写啥就可以了。
    constructor (props) {
        super(props)
        this.state = {
            dat: {},
            loading: true
        }
    }

    // 当组件加载时，执行一些内容，其他时机执行，请搜索 react 生命周期
    componentDidMount () {
        this.getData()
    }

    // 自定义一个方法，在其他地方用 this.方法名 来调用运行
    getData () {
        // 通过 props.match 来拿到 url 中的 id
        let id = this.props.match.params.id
        Api.get(`topic/${id}`, null, r => {
            this.setState({dat: r.data, loading: false})
        })
    }

    // 每一个 jsx 组件，都必须包含 render 函数，这里渲染出我们的 dom 结构
    render () {
        let { dat, loading } = this.state
        let dom = null
        let reDom = null
        // 我们用 loading 的值来判断是否请求到接口
        // 实际这里可以做更多的处理，比如做一个加载中的组件。
        if (!loading) {
            if (dat.replies.length !== 0) {
                let listDom = dat.replies.map((i, k) => {
                    return (
                        <li key={k}>
                            <h3>{i.author.loginname} 说：</h3>
                            <article dangerouslySetInnerHTML={{__html: i.content}}></article>
                        </li>
                    )
                })
                reDom = (
                    <div className='replies_list'>
                        <ol>{listDom}</ol>
                    </div>
                )
            }
            dom = (
                <div className="outer home">
                    <Header title='内容详情' />
                    <h2>{dat.title}</h2>
                    <p>
                        作者：{dat.author.loginname}
                        <br />
                        日期：{dat.create_at}
                    </p>
                    <article dangerouslySetInnerHTML={{__html: dat.content}}></article>
                    <hr />
                    {reDom}
                </div>
            )
        }
        // 最后，把结果 return 出去，即可。
        return dom
    }
}