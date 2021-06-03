import React, { Component } from "react";
import DataListInput from "react-plain-datalist-input";

import firebase from "../helper/firebase";
import { Result } from "./Result";
import "../components_css/explore.css";

class Explore extends Component {
  constructor(props) {
    super(props);
    this.state = { occupation: "", keywords: "", providers: [], found: 1 ,pinCode:''};

    this.loadkeywords = this.loadkeywords.bind(this);
    this.occupationOnChangeHandler = this.occupationOnChangeHandler.bind(this);
    this.go = this.go.bind(this);
    this.pinCodeHandler= this.pinCodeHandler.bind(this);
  }

  async componentWillMount() {
    var items = [{ item: "fetching.." }];
    this.setState({ keywords: items });
    await this.loadkeywords();
  }

  async loadkeywords() {
    firebase
      .firestore()
      .collection("occupations")
      .get()
      .then((snapshot) => {
        let array = [];
        snapshot.docs.forEach((doc) => {
          var Item = {
            key: doc.data().key,
            item: doc.data().item,
          };
          array.push(Item);
        });

        this.setState({
          keywords: array,
        });
      })
      .catch((err) => {
        console.log("error : " + err);
      });
  }

  occupationOnChangeHandler(event) {
    this.setState({ occupation: event.target.value });
    console.log(this.state.occupation);
  }
  pinCodeHandler(event) {
    this.setState({ pinCode: event.target.value });
    
  }

  go() {
    if (this.state.occupation === "" || this.state.pinCode==="" || this.state.pinCode.length!=6) {
      alert("Please Provide Valid deatils !");
    } else {
      console.log(this.state.occupation);
      firebase
        .firestore()
        .collection("serviceProviders")
        .where("occupation", "==", this.state.occupation.toLowerCase()).where("pincode","==",this.state.pinCode)
        .get()
        .then((snapshot) => {
          console.log("exce");

          var array1 = [];
          console.log("LENGTH" + snapshot.docs.length);
          if (snapshot.docs.length === 0) {
            this.setState({ found: 0 });
          } else {
            this.setState({ found: 1 });

            snapshot.docs.forEach((doc) => {
              console.log(doc.data());
              var provider = {
                name: doc.data().name,
                location: doc.data().location,
                phone: doc.data().phone,
                uid: doc.data().uid,
              };
              array1.push(provider);
              // this.state.providers.push(provider)
              console.log("exce1");
              console.log("name:" + doc.data().name);
              //code to show service providers
              this.setState({ providers: array1 });
            });
          }
        })
        .catch((err) => {
          console.log("error : " + err);
        });
    }
  }

  render() {
    return (
      <div>
        <div className="form">
          <form>
            <input
              list="occupation" placeholder="Enter Occupation"
              value={this.state.occupation}
              onChange={this.occupationOnChangeHandler}
            />
            <datalist id="occupation">
              {this.state.keywords.map((t) => (
                <option key={t.key} value={t.item} />
              ))}
            </datalist><br></br><br></br>
            <input type="text" placeholder="Enter Pincode" onChange={this.pinCodeHandler}></input>
          </form>
          <button className="Search" onClick={this.go}>
            <i class="fas fa-search fa-2x"></i>
          </button>
        </div>

        <div className="results">
          {this.state.found == 0
            ? "No Service Provide available"
            : this.state.providers.map((provider) => {
                return <Result provider={provider} />;
              })}
        </div>
      </div>
    );
  }
}

export default Explore;
