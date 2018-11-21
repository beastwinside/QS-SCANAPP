// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon,Menu,Radio,Checkbox} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
import Background from './img/bg.jpg'
import styles from '../styles/animate.css';
var devheight=document.documentElement.clientHeight;
var devwidth=document.documentElement.clientWidth;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
var xuhao=1;

class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      name:"33773",
      data:[],
      result:{},
      creator:"",
      time:'timestr',
      ifsubmit:'false'



    };
    this.start=this.start.bind(this);
    this.danxuanstore=this.danxuanstore.bind(this);
    this.dynrender=this.dynrender.bind(this);
    this.dynrendercheck=this.dynrendercheck.bind(this);
    this.ttt=this.ttt.bind(this);
    this.duoxuanstore=this.duoxuanstore.bind(this);
    this.panduanstore=this.panduanstore.bind(this);
    this.submit=this.submit.bind(this);
    this.getuser=this.getuser.bind(this);
    this.savecode=this.savecode.bind(this);
    this.showright=this.showright.bind(this);


  }



  showright()
  {
    for(var i in this.state.result)
  {var val=this.state.result[i]
    if(val=="错误判断"||val=="错误单选"||val=="错误多选")
      {
  document.getElementById(i).style.visibility="visible";
   document.getElementById(i).style.color="red";
  }
  else{
     document.getElementById(i).style.visibility="visible";
   document.getElementById(i).style.color="green";
  }

  }

  }

    savecode(){
    var searchstr=( window.location.href);
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


  submit(){
      var now = new Date();   
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日  
            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
            var ss = now.getSeconds();           //秒

            var time=year+"年"+month+"月"+day+"日"+hh+"时"+mm+"分"+ss+"秒";
   var count = 0;
   var wrongnumduoxuan=0;
   var wrongnumdanxuan=0;
   var wrongnumpanduan=0;
   var obj=this.state.result;
   var totalnum=this.state.data.length;
   for(var i in obj){
    if(obj[i]=="正确"||obj[i]=="错误单选"||obj[i]=="错误多选"||obj[i]=="错误判断")
    count ++;
  }

  if(count!=totalnum)
  {
    alert('请做完题目再提交');
  }

  else{
   for(var i in obj){
    if(obj[i]=="错误单选")
    {
      wrongnumduoxuan++;
    }
    if(obj[i]=="错误多选")
    {
      wrongnumdanxuan++;
    }
    if(obj[i]=="错误判断")
    {
      wrongnumpanduan++;
    }
  }

var rightnum=totalnum-wrongnumpanduan-wrongnumduoxuan-wrongnumdanxuan;
var score=0;
  let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=savedtresult&wrongnumdanxuan='+wrongnumdanxuan+'&rightnum='+rightnum
  +'&creator='+this.state.creator+'&time='+time+'&score='+score+'&questionid='+this.props.location.state.mainid+'&wrongnumduoxuan='+wrongnumduoxuan+'&wrongnumpanduan='+wrongnumpanduan;
  fetch(URL, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }).then(response => response.text())
  .then(dataa => {
     this.setState({
      ifsubmit:"true"
    });

    alert('答卷提交成功');
   

 });}}

ttt(e){
  alert(e.target.getAttribute("data-value"));
}

dynrendercheck(tm,a,b,id,type,zqda){


  return(
   <div>
   <div><span>判断题: {tm.replace(/&nbsp;/g, "_")}</span></div>
   <input type="radio" onClick={this.panduanstore}  name={id} data-value="A" data-answer={zqda}  data-id={id} />A:{a.replace(/&nbsp;/g, "")}<br/>
   <input type="radio" onClick={this.panduanstore}  name={id} data-value="B" data-answer={zqda}  data-id={id} />B:{b.replace(/&nbsp;/g, "")}<br/>
   <span id={id} style={{ visibility:'hidden'}}>正确答案为:{zqda}</span>
   </div>
   )

}


dynrender(tm,a,b,c,d,id,type,zqda){

  if(type==0)
   {return(
    <div>
    <div><span>单选题:{tm.replace(/&nbsp;/g, "_")}</span></div>
    <input type="radio" onClick={this.danxuanstore} data-value="A" name={id} data-answer={zqda} data-id={id} />A:{a.replace(/&nbsp;/g, "")}<br/>
    <input type="radio" onClick={this.danxuanstore} data-value="B" name={id} data-answer={zqda} data-id={id} />B:{b.replace(/&nbsp;/g, "")}<br/>
    <input type="radio" onClick={this.danxuanstore} data-value="C" name={id} data-answer={zqda} data-id={id} />C:{c.replace(/&nbsp;/g, "")}<br/>
    <input type="radio" onClick={this.danxuanstore} data-value="D" name={id} data-answer={zqda} data-id={id} />D:{d.replace(/&nbsp;/g, "")}<br/>
    <span id={id} style={{ visibility:'hidden'}}>正确答案为:{zqda}</span>

    </div>
    )}

 if(type==2)
  {return(
   <div>
   <div><span>多选题:{tm.replace(/&nbsp;/g, "_")}</span></div>
   <input type="checkbox" onClick={this.duoxuanstore}  data-value="A" name={id}data-id={id} data-answer={zqda}/>A:{a.replace(/&nbsp;/g, "")}<br/>
   <input type="checkbox" onClick={this.duoxuanstore} data-value="B" name={id} data-id={id} data-answer={zqda}/>B:{b.replace(/&nbsp;/g, "")}<br/>
   <input type="checkbox" onClick={this.duoxuanstore} data-value="C" name={id} data-id={id} data-answer={zqda}/>C:{c.replace(/&nbsp;/g, "")}<br/>
   <input type="checkbox" onClick={this.duoxuanstore} data-value="D" name={id} data-id={id} data-answer={zqda}/>D:{d.replace(/&nbsp;/g, "")}<br/>
   <span id={id} style={{ visibility:'hidden'}}>正确答案为:{zqda}</span>
   </div>
   )}
}


duoxuanstore(e){
  var wrongid=e.target.getAttribute("data-id");
  var val=e.target.getAttribute("data-value");
  var zqdastr=e.target.getAttribute("data-answer");
  var tempobjj=this.state.checkobj;

  var box=document.getElementsByName(wrongid);
  var value="";
  for (var i=0;i<box.length;i++ ){
if(box[i].checked){ //判断复选框是否选中
value=value+box[i].getAttribute("data-value") + ""; //值的拼凑 .. 具体处理看你的需要,
}

}

var tempobj=this.state.result;

if(value==zqdastr)
{
  tempobj[wrongid]="正确";
  this.setState({
    result:tempobj
  });
}
else  if(value!=zqdastr)
{if(value!=""){
 tempobj[wrongid]="错误多选";
 this.setState({
  result:tempobj
});
}
else tempobj[wrongid]="没做"
}


}

panduanstore(e){

  var wrongid=e.target.getAttribute("data-id");
  var tempobj=this.state.result;
  if(e.target.getAttribute("data-answer")==e.target.getAttribute("data-value"))
   {tempobj[wrongid]="正确";
 this.setState({
  result:tempobj
});
}

else if(e.target.getAttribute("data-answer")!=e.target.getAttribute("data-value"))
{
  tempobj[wrongid]="错误判断";
  this.setState({
    result:tempobj
  });

}


}



danxuanstore(e){

  var wrongid=e.target.getAttribute("data-id");
  var tempobj=this.state.result;
  if(e.target.getAttribute("data-answer")==e.target.getAttribute("data-value"))
   {tempobj[wrongid]="正确";
 this.setState({
  result:tempobj
});
}

else if(e.target.getAttribute("data-answer")!=e.target.getAttribute("data-value"))
{
  tempobj[wrongid]="错误单选";
  this.setState({
    result:tempobj
  });

}



}





start(){
  let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=getTiku&mainid='+this.props.location.state.mainid;
  fetch(URL, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }).then(response => response.text())
  .then(dataa => {

   var jsonobj=JSON.parse(dataa);


   var randomdata=jsonobj.data.sort(function(){return 0.5-Math.random()})
   this.setState({
    data:randomdata,

  });

 });
}


componentDidMount(){
  
  this.setState({
    creator:this.props.location.state.creator

  });
  this.start();

}


render(){
  return(
   <div >
   <div style={{position:'fixed',width:"100%",height:"40px",zIndex:'10',backgroundColor:"#F2FEBD"}}>
   {this.state.ifsubmit=="false"?(<Button style={{marginLeft:"5px"}} onClick={this.submit}>提交</Button>):( <Button style={{marginLeft:"5px"}} onClick={this.showright}>批改</Button>)}

  </div>

    <div style={{width:"100%",height:"40px"}}>
    </div>
   <List
   bordered
   dataSource={this.state.data}
   renderItem={item => (<List.Item>
    {item.XXC==null?this.dynrendercheck(item.TM,item.XXA,item.XXB,item.ID,item.TMLX,item.ZQDA):this.dynrender(item.TM,item.XXA,item.XXB,item.XXC,item.XXD,item.ID,item.TMLX,item.ZQDA)}
    </List.Item>)}
   />

   </div>


   );
}


}

export default Login
