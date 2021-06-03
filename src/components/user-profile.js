import React ,{Component} from 'react';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import { withRouter } from "react-router";
import firebase from '../helper/firebase'

class UserProfile extends Component{  

constructor(props){
      super(props);

      this.state = {
        userInfo: {},
        docID:'',
        userid: null,
        email: null,
        isProvider: false,
        editable :false,
        
         
      };
 
      this.loadUserDetails=this.loadUserDetails.bind(this);
      this.loadUser=this.loadUser.bind(this);
      this.editButton=this.editButton.bind(this);
      this.nameHandler=this.nameHandler.bind(this);
      this.emailHandler=this.emailHandler.bind(this);

      
    
    
     

};
  
  
  
componentDidMount(){
   
 this.loadUserDetails();
 this.loadUser();
      
}

nameHandler(event){
  this.setState({
    userInfo:{
      name:event.target.value,
      email:this.state.userInfo.email,
      

      
    }
  });

}
emailHandler(event){
  this.setState({
    userInfo:{
      name:this.state.userInfo.name,
      email:event.target.value,
      
    }
  });
}

loadUserDetails(){
    
    
    firebase.firestore().collection('users').where('uid','==',String(this.props.match.params.ID)).get().then((snapshot=>{
        let localUser;
        let docid;
        snapshot.docs.forEach(function(doc){
            
            localUser=doc.data();
            docid=doc.id;
           
            
        })
        this.setState({docID:docid})
        this.setState({ userInfo: localUser });
    
       
          })).catch((err)=>{
              console.log("error : "+err)
              alert("err");
          })

}

async loadUser() {
  const user = localStorage.getItem("user");
  const loggedInUser = user != null ? JSON.parse(user) : null;
  if (loggedInUser == null) {
    window.location.href = "/login";
  } else {
    this.setState({
      email: loggedInUser.email,
      isProvider: loggedInUser.isProvider,
      userid: loggedInUser.userid,
    });
  }
}



async editButton(){

  var buttonText=document.getElementById("EditSubmitButton1").innerHTML;
  if(buttonText=='Edit'){

    
          const user = localStorage.getItem("user");
          const loggedInUser = user != null ? JSON.parse(user) : null;

          if(loggedInUser.userid!=String(this.props.match.params.ID)){

            alert("You don't have permission to edit ")
            return ;
          }
          else{

            this.setState({
              editable:true
            })

            document.getElementById("EditSubmitButton1").innerHTML="Update";
            
          }

  }else{

    //update function firbase

  var query= await firebase.firestore().collection("users").doc(this.state.docID);
     
      query.update({
          name:this.state.userInfo.name,
          email:this.state.userInfo.email,
      

      })
      .then((query)=>{
        
        alert("successfully Updated");
        document.getElementById("EditSubmitButton1").innerHTML="Edit";
        this.setState({
          editable:false
        })
      })
      .catch(err=>{
        console.log(err);
        alert("err")
      })

  }


}




  
render(){
             
      return (
            <div> 
            
            
            <div id="accountHeader">
                   <h3>Account Information</h3>
            </div>
            <br></br>

            
        <div id="profileDiv">
          <form>
            <label>Name </label> <br></br>
            {this.state.editable ?
                <input id="formName" type="text"  onChange={this.nameHandler} value={this.state.userInfo.name}/>
                :
                <input id="formName" type="text" readOnly onChange={this.nameHandler} value={this.state.userInfo.name}/> 
            }
            <br></br><br></br>
            
            <label>Email </label> <br></br>
            {this.state.editable ?
                <input id="formEmail" type="text"  onChange={this.emailHandler} value={this.state.userInfo.email}/>
                :
                <input id="formEmail" type="text" readOnly onChange={this.emailHandler} value={this.state.userInfo.email}/>
            }
            <br></br><br></br>



          </form>
          {
            this.state.userid==String(this.props.match.params.ID)?
            <button id="EditSubmitButton1" onClick={this.editButton}>Edit</button>
            :
            <span></span>

          }
         
           

        </div>
            

            </div>
            );
  
}
   
}
  
  export default withRouter(UserProfile);