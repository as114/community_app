import React, {Component} from 'react';
import { Menu, Icon, Row } from 'antd';
import {Link, withRouter, Route} from 'react-router-dom';
import {HomeView, IssuesView} from '../Views/HomeView';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HomeHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'home',
    }
  
  }
  

  handleClick = (e) => {
    sessionStorage.setItem('tabKey', e.key);
    this.setState({current: sessionStorage.getItem('tabKey')});
  }

  // componentDidUpdate() {
  //   var tabKey = sessionStorage.getItem('tabKey');
  //   if (tabKey==null){
  //     this.setState({current:'home'});
  //     }
  //   else if(sessionStorage.getItem('tabKey')!=null){
  //     this.setState({current:sessionStorage.getItem('tabKey')});
  //   }
  // }

  render() {
    
    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
        <Menu
          onClick={this.handleClick}
          selectedKeys={sessionStorage.getItem('tabKey')}
          mode="horizontal"
          style={{backgroundColor: 'orange'}}
        >
    
          <Menu.Item key="home">
            <Link to="/home"><Icon type="home" />Community Home</Link>
            
          </Menu.Item>
        
      
          <Menu.Item key="issues">
            <Link to="/open_issues"><Icon type="fire" />Issues</Link>
          </Menu.Item>
      
      
          <Menu.Item key="about">
            <Link to="/about"><Icon type="read" />About</Link>
          </Menu.Item>
        
        
          <Menu.Item key="account">
            <Link to="/account"><Icon type="logout" />Account</Link>
          </Menu.Item>
      </Menu>
    </Row>
    </div>
    );
  }
}

export default HomeHeader;