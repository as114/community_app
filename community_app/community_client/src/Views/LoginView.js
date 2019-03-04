import React, {Component} from 'react';
import LoginHeader from '../Components/LoginHeader';
import LoginForm from '../Components/LoginForm';

export default class LoginView extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <LoginHeader/>
                <LoginForm/>
            </div>
        );
    }
}

