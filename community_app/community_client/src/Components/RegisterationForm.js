import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Row, Col, Card, Form, Input, Checkbox, Button, Select, message } from 'antd';
import Icon from "antd/es/icon/index";
import {register_url} from '../static/config';
import axios from 'axios';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            password: '',
            passwordStrength: '',
            strengthIcon: '',
            passwordStrengthColor: '',
            confirmPassword: '',
            agreement: false,
            agreementError: '',
            error: null,
            serverSuccess: '',
            serverEror: ''
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!this.state.agreement) {
                this.setState({ agreementError: 'Please read agreement and agree to proceed.', error: true });
            }
            else {
                this.setState({ agreementError: '', error: false });
            }
            if (!err && !this.state.error) {
                const { firstName, lastName, email, gender, password, agreement } = this.state;
                console.log(register_url);
                axios.post(register_url, 
                { firstName, lastName, email, password, agreement}
                   
                    )
                    .then(response => {
                        if (response.status == 200 && response.data.data == 'exists') {
                            message.error('Email ' + this.state.email + ' already exists.');
                        }
                        else if (response.status == 200 && response.data.data == 'success') {
                            message.success('User successfully registered.');
                            this.props.form.resetFields();
                            this.props.history.push('/');
                        }
                    })
                    .catch(error => {
                        message.error("Error"+ error.message);
                    });
            }
        });
    }

    handleChange = (e) => {
        const fieldname = e.target.name;
        const value = e.target.value
        this.setState({ [fieldname]: value, passwordStrength: '', passwordStrengthColor: '', strengthIcon: '' });

        if (fieldname === 'password') {
            const weakPatternletters = RegExp("^(?=.*[a-z])(?=.{6,})");//atleast one character one number and 6 character long
            const weakPattern = RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{6,})");//atleast one character one number and 6 character long
            const mediumPattern = RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})"); //Minimum 6 characters, at least one uppercase letter, one lowercase letter and one number:
            const strongPattern = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"); //Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:

            if (weakPatternletters.test(value) || weakPattern.test(value)) {
                this.setState({ passwordStrength: 'Weak', passwordStrengthColor: 'red', strengthIcon: 'close-circle' });
            }
            if (mediumPattern.test(value)) {
                this.setState({ passwordStrength: 'Medium', passwordStrengthColor: 'orange', strengthIcon: 'exclamation-circle' });
            }
            if (strongPattern.test(value)) {
                this.setState({ passwordStrength: 'Strong', passwordStrengthColor: 'green', strengthIcon: 'check-circle' });
            }


        }
    }

    handleCheck = (e, name) => {
        this.setState({ [name]: e.target.checked });
        if (e.target.checked) {
            this.setState({ agreementError: '', error: false });
        }
        else {
            this.setState({ agreementError: 'Please read agreement and agree to proceed.', error: true });
        }
    }

    handleSelectChange = (value, name) => {
        this.setState({ [name]: value });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Passwords entered do not match!');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (
            <div style={{ marginTop: '20px' }}>
                <Row type="flex" justify="center">
                    <Col xs={12} >
                        <Card>
                            <Row type="flex" justify="center" align='middle' style={{ height: '40px', fontSize: '25px', backgroundColor: 'cyan', fontFamily: 'san-serif', fontWeight: 'bold', margin: '0px 0px 30px 0px' }}>
                                <Col><Icon type="user-add" style={{ fontSize: '25px', color: '#08c' }} />       Register here!</Col>
                            </Row>
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Item
                                    {...formItemLayout}
                                    label="First Name"
                                >
                                    {getFieldDecorator('firstName', {
                                        rules: [{
                                            required: true, message: 'Please input your First Name!',
                                        }],
                                        onChange: this.handleChange
                                    })(
                                        <Input name='firstName' placeholder='first name' />
                                    )}
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    label="Last Name"
                                >
                                    {getFieldDecorator('lastName', {
                                        rules: [{
                                            required: true, message: 'Please input your last Name!',
                                        }],
                                        onChange: this.handleChange
                                    })(
                                        <Input name='lastName' placeholder='last name' />
                                    )}
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    label={'Gender'}
                                >
                                    {getFieldDecorator('gender', {
                                        rules: [{
                                            required: true, message: 'Please input your E-mail!',
                                        }],
                                        initialValue: "",
                                    })(
                                        <Select placeholder='Select Gender' style={{ width: '100%' }} onChange={(value) => this.handleSelectChange(value, 'gender')}>
                                            <Select.Option value="Male">Male</Select.Option>
                                            <Select.Option value="Female">Female</Select.Option>
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout}
                                    label="E-mail"
                                >
                                    {getFieldDecorator('email', {
                                        rules: [{
                                            type: 'email', message: 'The input is not valid E-mail!',
                                        }, {
                                            required: true, message: 'Please input your E-mail!',
                                        },
                                        ],
                                        onChange: this.handleChange
                                    })(
                                        <Input name='email' placeholder='enter email' />
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="Password"
                                >
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true, message: 'Please input your password!'
                                        },
                                        {
                                            min: 6, message: 'password must be at least 6 characters long.'
                                        },
                                        {
                                            validator: this.validateToNextPassword,
                                        }],
                                        onChange: this.handleChange
                                    })(
                                        <Input name='password' type="password" placeholder='enter password' />
                                    )}
                                    <Row type="flex" justify="center" align='middle'>
                                        {this.state.passwordStrength && <span style={{ color: this.state.passwordStrengthColor }}>
                                            <Icon type={this.state.strengthIcon} style={{ color: this.state.passwordStrengthColor }} />
                                            {this.state.passwordStrength}</span>}
                                    </Row>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    label="Confirm Password"
                                >
                                    {getFieldDecorator('confirmPassword', {
                                        rules: [{
                                            required: true, message: 'Please confirm your password!'
                                        },
                                        {
                                            min: 6, message: 'password must be at least 6 characters long.'

                                        },
                                        {
                                            validator: this.compareToFirstPassword,
                                        }],
                                        onChange: this.handleChange
                                    })(
                                        <Input name='confirmPassword' type="password" placeholder='re-enter password' onBlur={this.handleConfirmBlur} />
                                    )}

                                </Form.Item>


                                <Form.Item {...tailFormItemLayout}>
                                    {getFieldDecorator('agreement', {
                                        valuePropName: 'checked',
                                    })(
                                        <Checkbox onChange={(e) => this.handleCheck(e, 'agreement')}>
                                            I have read the <a href="">agreement</a>
                                        </Checkbox>
                                    )}
                                    <Row type="flex" justify="center" align='middle'>
                                        {this.state.agreementError && <span style={{ color: 'red' }}>{this.state.agreementError}</span>}
                                    </Row>
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">Register</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(Form.create()(RegistrationForm));