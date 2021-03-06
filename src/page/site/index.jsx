import React  from 'react'
import {Link} from 'react-router-dom'
import Api from '@/tool/api.js'
import Header from '@/coms/header'

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list:[]
        }
    }
    componentDidMount(){
        this.getData()
    }
    getData(){
       Api.get('topics',null,r=>{
           this.setState({list:r.data})
       })
    }
    render(){
        let {list} = this.state ;
        let dom = null ;

        if(list.length !== 0){
            let listDom = list.map((i,k) => {
                return (
                    <li key={k}><Link to={`/details/${i.id}`}>{i.title}</Link></li>
                )
            })

            dom = (
                <div className="tipics_list">
                    <ul>{listDom}</ul>
                </div>
            )
        }

      return (
          <div className="outer home">
              <Header title="这是首页"/>
              {dom}
          </div>
      )

    }
}

export  default Index