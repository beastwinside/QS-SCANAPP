// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon,Menu,Radio,Checkbox} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
import styles from '../styles/animate.css';

class Tmlist extends Component{

  constructor(props){
    super(props);
    this.state={
      name:"33773",
      data:[],
      id:'',
       creator:""
  }
    this.start=this.start.bind(this);
    this.showEdit=this.showEdit.bind(this);
        this.getuser=this.getuser.bind(this);
    this.savecode=this.savecode.bind(this);

}

  savecode(){
    var searchstr=( window.location.href);1
    var str1=searchstr.split('&');
    var str2=str1[0].split('=');
    var  codestr=str2[1];


    if(this.state.code!==codestr)
    {  
     this.getuser(codestr);

   }

   else ;

 }

  getuser(code){



    let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=getUser&code='+code+'&time=';
    fetch(URL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => response.text())
    .then(dataa => {
      var jsonobj=JSON.parse(dataa);
   
    this.setState({
      creator:jsonobj.data[0].USERNAME
    })

    });


  }


showEdit(id){


    let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=ifdt&id='+id+'&creator='+this.state.creator;
    fetch(URL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => response.text())
    .then(dataa => {
      var jsonobj=JSON.parse(dataa);
    var num=jsonobj.total;
   if(num==1)
    {
     alert('你已经做过这套题目');
    }
    else 
    {
    this.props.history.push({pathname:'./login',state:{mainid:id,creator:this.state.creator}});
}
    });
  };



start(){
 var now = new Date();   
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;
            if (month >= 1 && month <= 9) {
            month = "0" + month;
        }     //月
            var day = now.getDate();            //日  
            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var ss = now.getSeconds();           //秒

            var time=year+"-"+month+"-"+day;

 let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=getTikuList&time='+time;
  fetch(URL, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }).then(response => response.text())
  .then(dataa => {
   var jsonobj=JSON.parse(dataa);
 
   this.setState({
    data:jsonobj.data,
  });

 });

}


componentDidMount(){
   this.savecode();
this.start();
 


}


render(){
  return(
   <div >

  <List

   bordered
   dataSource={this.state.data}
   renderItem={item => (<List.Item>
    <div>
     <div>
    <strong>创建时间</strong>:{item.MODEDATACREATEDATE}
     </div>
      <div>
    <strong>问卷名称</strong>:{item.WJLX1}
     </div> 
  <div>
      <strong>答题时间范围</strong>：{item.KSRQ} 日{item.KSSJ}分~~~{item.JSRQ} 日{item.JSSJ}分
       </div>
    </div>
    <div>
      &nbsp;&nbsp;&nbsp;<Button type="primary"  ><div onClick={this.showEdit.bind(this,item.ID)}>点击做题</div> </Button>
 </div>
    </List.Item>)}
   />


   </div>


   );
}


}

export default Tmlist
