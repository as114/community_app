import React, {Component} from 'react';
import {Layout} from 'antd';

const {Footer} = Layout;
export default class PageFooter extends Component{
    render(){
        return(
            <div>
                <Footer style={{textAlign: 'center', marginTop:'15px'}}>
                    Milega Real estate ©2019 Created by RAS technologies.
                </Footer>
            </div>
        );
    }
}