import  React,{ Component } from  'react'

class Header extends Component {
    render(){
         let {title} = this.props
        return (
            <div>
                 <h1>{title}</h1>
            </div>
        )
    }
}


export  default Header;