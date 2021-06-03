import React ,{Component} from 'react';
import '../components_css/login.css'
import firebase from '../helper/firebase'


class Login extends Component{  

constructor(props){
      super(props);
      this.state = {email: '',password:'',isProvider:false};
      this.submitHandler = this.submitHandler.bind(this);
      this.emailOnChangeHandler = this.emailOnChangeHandler.bind(this);
      this.passwordOnChangeHandler = this.passwordOnChangeHandler.bind(this);
      this.checkboxChangeHandler = this.checkboxChangeHandler.bind(this);
      this.setLocalStorage = this.setLocalStorage.bind(this);
     

};
  
  
  
async componentWillMount(){
      //await this.loadWeb3()
      
}



emailOnChangeHandler(event){
    this.setState({email: event.target.value});
}

passwordOnChangeHandler(event){
    this.setState({password: event.target.value});
}

setLocalStorage(response){
    const {user}=response;
    const data={
        userid:user.uid,
        email:user.email,
        isProvider:this.state.isProvider

    };
    
    localStorage.setItem('user',JSON.stringify(data));
    const storage =localStorage.getItem('user');
    const loggedInUser=  storage !=null?JSON.parse(storage):null;
    console.log("loggedInUser : "+loggedInUser.email)
    document.getElementById('loginSubmitButton').innerHTML="Submit"
    alert("Successfull Login")
    window.location.href="/home"
}

checkboxChangeHandler = () => {
    this.setState({isProvider:!this.state.isProvider});
    console.log(this.state.isProvider);
  }

submitHandler(){
document.getElementById('loginSubmitButton').innerHTML="Loading..."
firebase.auth()
.signInWithEmailAndPassword(this.state.email,this.state.password)
.then(response=>{ 
     console.log(response.user.uid)

    if(this.state.isProvider==true){
       
        
        firebase.firestore().collection('serviceProviders').where('uid','==',response.user.uid).get().then((snapshot)=>{
            console.log(snapshot,"first")
            if(snapshot.empty){
                console.log("unmatched error");
                return ;
            }
            this.setLocalStorage(response);
      
        }).catch(err=>{
            console.log("error occured in block1")
            alert("Error Occured")
            return ;
        })


    }else{
        firebase.firestore().collection('users').where('uid','==',response.user.uid).get().then((snapshot)=>{
            console.log(snapshot,"second")
            if(snapshot.empty){
                console.log("unmatched error");
                alert("Error Occured")
                return;
            }
            this.setLocalStorage(response);
            

        }).catch(err=>{ 
            console.log("error occured in block2",err)
            alert("Error Occured")
            return ;
        })
    }
     
    

    

}).catch(err=>{
    console.log(err);
    alert("Error Occured")
})





}


  
render(){
             
      return (
      <div>
             <form>
                <h3>Sign In</h3>
               
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={this.state.email} className="form-control" placeholder="Enter email" onChange={this.emailOnChangeHandler} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={this.state.password} className="form-control" placeholder="Enter password" onChange={this.passwordOnChangeHandler} />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" checked={this.state.isProvider} onChange={this.checkboxChangeHandler} className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">I'm a service provider</label>
                    </div>
                </div>

                <a id="loginSubmitButton" className="btn btn-primary btn-block" onClick={this.submitHandler} >Submit</a>
                <p className="forgot-password text-right">
                   Don't have account ? <a href="/register">Register here</a>
                </p>
            </form>
      </div>
            );
  
}
   
}
  
  export default Login;