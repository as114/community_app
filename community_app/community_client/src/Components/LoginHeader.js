import React, {Component} from "react";
import { Row, Col} from 'antd';

export default class LoginHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            user: this.props.user
        };
    }
    render() {
        return (
            <div style={{height: '100px', backgroundColor: '#66cc00', overflow:'auto'}}>
                <Row type="flex" justify="center" align="middle">
                    <Col span={12} offset={6}>
                        <img src='../src/logo.png' alt="Community Logo" height='100px' width='300px'></img>
                    </Col>
                </Row>     
            </div>
        );
    }
}