import React, {Component} from 'react';
import {Row, Col, Card, Form, Icon, Input, Button, Checkbox, Modal, message} from 'antd';
import {withRouter } from 'react-router';
import {Link} from 'react-router-dom';
import {login_url} from '../static/config';
import axios from 'axios';

class LoginForm extends Component {
        constructor(props){
                super(props);
                this.state = {
                        'username' : '',
                        'password' : '',
                        'loading' : false
                }
        }

    handleChange = (e) => {
        const fieldname = e.target.name;
        const value = e.target.value
        this.setState({ [fieldname]: value});
        
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading:true});
                const {username, password} = this.state;
                axios.post(login_url,this.state)
                .then(response =>{
                    console.log(response);
                        if (response.data.valid == 'does not exist'){
                            this.setState({'loading':false});
                            Modal.error({
                                title: 'Login Error',
                                content: 'User ' + this.state.username + ' does not exist!',
                            });
                                
                        }
                        if (response.data.valid == 0){
                            this.setState({'loading': false})
                            Modal.error({
                                title: 'Login Error',
                                content: 'Username or Password is invalid!',
                            });
                        }
                        if (response.data.valid == 1){
                            this.setState({'loading': false})
                            this.props.form.resetFields();
                            sessionStorage.setItem('key', response.data.token);
                            this.props.history.push('/community_home');
                        }
                    })
                    .then(error=>{
                        if (error){
                            this.setState({'loading':false});
                            Modal.error({
                                title: 'Login Error',
                                content: 'Sorry! Server returned an error:\n'+ error.message,
                            });
                        }
                });
            }
            });
           }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Col>
                    <Card style={{marginTop:'150px', marginRight:'30%', marginLeft:'30%', marginBottom:'100px', maxWidth:'40%'}}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                {
                                        type: 'email', message: 'The input is not valid E-mail!',       
                                }, 
                                { 
                                        required: true, message: 'Please input your email!' 
                                }],
                                onChange: this.handleChange
                            })(
                                <Input name='username' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Username" />
                            )
                        }

                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: 
                                [{ 
                                        required: true, message: 'Please input your Password!' 
                                }],
                                onChange: this.handleChange
                            })(
                                <Input name='password' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Row type="flex" justify="center" align="middle">
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Row>
                            <Row type="flex" justify="center" align="middle">
                                <Link to="/about">Forgot password</Link>
                            </Row>
                            <Row type="flex" justify="center" align="middle">
                                <Link to="/register">Register Now!</Link>
                            </Row>
                        </Form.Item>
                    </Form>
                    </Card>
                </Col>
            </Row>
        );
    }
}
export default withRouter(Form.create()(LoginForm));