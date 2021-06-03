import React ,{Component} from 'react';
import '../components_css/help.css'
import firebase from '../helper/firebase'


class Help extends Component{  

constructor(props){
      super(props);
      this.state = {email: '',name:'',msg:''};
      this.nameHandler=this.nameHandler.bind(this);
      this.emailHandler=this.emailHandler.bind(this);
      this.msgHandler=this.msgHandler.bind(this);
      this.onSubmit=this.onSubmit.bind(this);

};
  
  
  
async componentWillMount(){
      //await this.loadWeb3()
      
}

nameHandler(e){
    this.setState({
        name:e.target.value
    })
}
emailHandler(e){
    this.setState({
        email:e.target.value
    })
}
msgHandler(e){
    this.setState({
        msg:e.target.value
    })
}

onSubmit(e){
  if(this.state.msg=='' || this.state.name=='' || this.state.email=='')
  {
      return;
  }
   
document.getElementById("helpSubmitButton").innerHTML="Sending...";

  firebase.firestore().collection('help').add({
    email: this.state.email,
    name :this.state.name,
    message:this.state.msg
    }).then((result)=>{
    console.log("result : "+result)
    alert("Message Sent successfully !")
    window.location.href='/help';

    }).catch((err)=>{
        console.log("error : "+err)
        alert("Error occured in updating Firestore collection !")
        window.location.href='/help';

    });

    


}



  
render(){
             
      return ( 
          <div> 

              <div id="header">
                  <h2>We will get back to you soon !</h2>
              </div>
              <br></br><br></br>
              <div>
                  <form id="inputForm" >
                      
                      <input class ="helpInput" type="text" placeholder="Enter Name" value={this.state.name} required onChange={this.nameHandler}/> <br></br><br></br>
                     
                      <input class ="helpInput" type="email" placeholder="Enter Email" value={this.state.email} required onChange={this.emailHandler}/> <br></br><br></br>
                      
                      <textarea  rows="6" cols="62" placeholder="Enter your concern here !" value={this.state.msg} required onChange={this.msgHandler}></textarea> <br></br><br></br>
         
                      
                  </form>
                  <div id="helpSubmit">
                         <button id="helpSubmitButton" type="submit" onClick={this.onSubmit}>SUBMIT</button>
                     </div>
                
                  
                  
              </div>

              
 


          </div>
      
            );
  
}
   
}
  
  export default Help;