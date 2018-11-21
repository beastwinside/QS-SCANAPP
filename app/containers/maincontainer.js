import React,{Component} from 'react'
import styles from '../styles/maincontainer.css';//导入
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
import { Carousel } from 'antd';
import { Collapse } from 'antd';
import { Tabs } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import { List, Card,Table} from 'antd';

import Login from './login.js'
import Tmlist from './tmlist.js'



class Maincontainer  extends Component{
	render(){
		return(

			<div style={{position:'absolute',Left:'0',Right:'0',margin:'auto',width:'100%',height:'100%'}}>
			<HashRouter history={hashHistory}>
			<div>
			<Route  exact path="/" component={Tmlist} />
			<Route  exact path="/login" component={Login} />
	
			</div>
			</HashRouter>
			</div>
			);
	}

}

export default Maincontainer