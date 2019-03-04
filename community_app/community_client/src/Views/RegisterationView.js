import React,{Component} from 'react';
import LoginHeader from '../Components/LoginHeader';
import RegistrationForm from '../Components/RegisterationForm';
import PageFooter from '../Components/PageFooter';
import Redirect from 'react-router-dom';

export default class RegisterationView extends Component{

    render(){
        return(
            <div>
                <LoginHeader/>
                <RegistrationForm/>
                <PageFooter/>
            </div>
        );
    }

}