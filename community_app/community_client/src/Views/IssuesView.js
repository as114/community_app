import React, {Component} from 'react';
import Issues from '../Components/Issues';
import HomeHeader from '../Components/HomeHeader';

export default class IssuesView extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Issues/>
            </div>
        );
    }
}