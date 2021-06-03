import React ,{Component} from 'react';
import '../components_css/aboutUs.css'
import firebase from '../helper/firebase'
import prakx from '../prakx.jpg'
import yash from '../yash.jpg'


class About extends Component{  

constructor(props){
      super(props);
      this.state = {email: '',name:'',msg:''};
      
};
  
  
  
async componentWillMount(){
      //await this.loadWeb3()
      
}




  
render(){
             
      return ( 
          <div> 
                
<div class="about-section">
  <h1>About Us Page</h1>
  <p>Some text about who we are and what we do.</p>
  <p>Resize the browser window to see that this page is responsive by the way.</p>
</div>

<h2 id="ourteam">Our Team</h2>
<div class="row">
  <div class="column">
    <div class="card">
    
      <div class="container">
        <h2>Yash Bhange</h2>
        <p class="title">Developer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>yashbhange888@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
    
      <div class="container">
        <h2>Tavishi Suvarna</h2>
        <p class="title">Developer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>suvarnatavishi7@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
    
      <div class="container">
        <h2>Prakash Singh</h2>
        <p class="title">Developer</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        <p>prakx@gmail.com</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
</div>

          </div>
      
            );
  
}
   
}
  
  export default About;