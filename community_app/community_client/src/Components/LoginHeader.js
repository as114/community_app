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
            <div style={{height: '100px', backgroundColor: 'cyan', overflow:'auto'}}>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={8}>
                        <h3 style={{
                            fontFamily: 'sans-serif',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>Milega! <br/>dhoondte raho bas.....</h3>
                    </Col>
                </Row>
            </div>
        );
    }
}