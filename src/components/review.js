import React ,{Component} from 'react';
import '../components_css/login.css'
import firebase from '../helper/firebase'
import { withRouter } from "react-router";


class Review extends Component{  

constructor(props){
      super(props);
      console.log(this.props.match.params.ID)
      this.state = {title:'',desc: '',amount:'',review:'',star:''};
      this.submitHandler = this.submitHandler.bind(this);
      this.loadUser=this.loadUser.bind(this);
      this.descOnChangeHandler = this.descOnChangeHandler.bind(this);
      this.amountOnChangeHandler = this.amountOnChangeHandler.bind(this);
      this.titleOnChangeHandler = this.titleOnChangeHandler.bind(this);
      this.reviewOnChangeHandler = this.reviewOnChangeHandler.bind(this);
      this.starOnChangeHandler = this.starOnChangeHandler.bind(this);

};
  
  
  
async componentWillMount(){
      await this.loadUser()
      
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
//update name
titleOnChangeHandler(event){
    this.setState({title: event.target.value});
}

//upadtes email
descOnChangeHandler(event){
    this.setState({desc: event.target.value});
}
//updates password
amountOnChangeHandler(event){
    this.setState({amount: event.target.value});
}

reviewOnChangeHandler(event){
    this.setState({review: event.target.value});
}

starOnChangeHandler(event){
    this.setState({star: event.target.value});
}
//manages registration and firestore 
submitHandler(event){
   document.getElementById('reviewSubmitButton').innerHTML="Loading..."

     //succcessfull registration
    const user = localStorage.getItem("user");
    const loggedInUser = user != null ? JSON.parse(user) : null;
    var currDate=new Date();
    var fdate=String(currDate.getDate())+'/'+String(currDate.getMonth())+'/'+String(currDate.getFullYear());
    

    firebase.firestore().collection('reviews').add({
    title: this.state.title,
    desc :this.state.desc,
    amount:this.state.amount,
    review: this.state.review,
    date:fdate,
    stars:this.state.star,
    userID:loggedInUser.userid,
    serviceProviderID :this.props.match.params.ID    //service provider id in url
    }).then((result)=>{
    console.log("result : "+result)
    alert("review successfully added")
    document.getElementById('reviewSubmitButton').innerHTML="Submit"
    window.location.reload();
    }).catch((err)=>{
        console.log("error : "+err)
        alert("Error occured")
        document.getElementById('reviewSubmitButton').innerHTML="Submit"
        window.location.reload();
    })



}


  
render(){
             
      return (
      <div>
             <form>
                <h3>Reviews</h3>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={this.state.title} required className="form-control" placeholder="Enter title" onChange={this.titleOnChangeHandler} />
                </div>
                <div className="form-group">
                    <label>desc</label>
                    <input type="text" value={this.state.desc} required  className="form-control" placeholder="Enter description" onChange={this.descOnChangeHandler} />
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input type="text" value={this.state.amount} required  className="form-control" placeholder="Enter amount in rupees" onChange={this.amountOnChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Reviews</label>
                    <input type="text" value={this.state.review} required  className="form-control" placeholder="Enter reviews" onChange={this.reviewOnChangeHandler} />
                </div>
                <div className="form-group">
                    <label>Stars</label>
                    <input type="number" value={this.state.star} required  className="form-control" placeholder="Enter star (0-5)" min="0" max="5" onChange={this.starOnChangeHandler} />
                </div>

            </form>
            <button id="reviewSubmitButton" className="btn btn-primary btn-block" onClick={this.submitHandler}>Submit</button>
      </div>
            );
  
}
   
}
  
  export default withRouter(Review);