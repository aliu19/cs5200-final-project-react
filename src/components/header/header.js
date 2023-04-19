import {Button} from 'antd';
import {logout} from "../../services/services";

const Header = (props) => {
  const headerLogout = () => {
    logout(props.token).then(r =>
        window.location = "/"
    )
  }

  return(
      <header style={{"padding-top": "10px"}}>
        <Button type="primary" onClick={headerLogout} style={{float: 'right'}}>
          Logout
        </Button>
        <a href="/" style={{"font-size": 24, "text-decoration": "none"}}>Trip Planner!</a>
        <Button  href="/profile" style={{float: 'right', "margin-right": "10px"}}>Profile</Button>
      </header>
  )
}

export default Header
