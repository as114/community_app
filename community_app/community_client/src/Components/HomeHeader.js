import React, {Component} from "react";
import { Row, Col, Menu, Icon } from 'antd';

export default class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      user: this.props.user
    };
  }
  render() {
    return (
      <div>
          <div style={{height:'100px', backgroundColor:'cyan'}}>
              <Row type="flex" justify="space-around" align="middle">
                  <Col span={8}>
                    <h3 style={{fontFamily:'sans-serif', fontWeight:'bold', textAlign:'center'}}>Milega! <br/>dhoondte raho bas.....</h3>
                  </Col>
              </Row>
          </div>
          <Row type="flex" justify="center">
          <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
          >
              <Menu.Item key="mail">
                  <Icon type="mail" />Navigation One
              </Menu.Item>
              <Menu.Item key="app">
                  <Icon type="appstore" />Navigation Two
              </Menu.Item>
              <Menu.Item key="alipay">
                  <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
              </Menu.Item>
          </Menu>
          </Row>
      </div>
    );
  }
}
