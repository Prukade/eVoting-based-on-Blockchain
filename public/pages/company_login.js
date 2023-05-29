import React, { Component } from "react";
import {
  Button,
  Divider,
  Transition,
  Form,
  Grid,
  Segment,
  Message,
} from "semantic-ui-react";
import { Router } from "../routes";
import web3 from "../Ethereum/web3";
import Election_Factory from "../Ethereum/election_factory";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";

class DividerExampleVerticalForm extends Component {
  state = { visible: true, email: "" };
  toggleVisibility = () => this.setState({ visible: !this.state.visible });
  returnBackImage = () => (
    <div className="login-form">
      <style jsx>{`
        .login-form {
          width: 100vw;
          height: 100vh;
          position: absolute;
          background: url("../../static/blockchain.jpg") no-repeat;
          z-index: -1;
        }
      `}</style>
<<<<<<< HEAD
    </div>
  );
  //validation
  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };
  //validation

  signup = (event) => {
    const email = document.getElementById("signup_email").value;
    const password = document.getElementById("signup_password").value;
    const repeat_password = document.getElementById(
      "signup_repeat_password"
    ).value;
    //validation for mail
    if (!this.validateEmail(email)) {
      const emailError = "Email must be of the form username@email.com";
      alert(emailError);
    } else if (!this.validatePassword(password)) {
      const passwordError =
        "Password must contain at least one uppercase, one special character, and on numeric character";
      alert(passwordError);
=======
  </div>
  )
  	//validation 
	validateEmail = (email) => {
		
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	validatePassword = (password) => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
		return passwordRegex.test(password);
	};
//validation

  
  signup = event => {
    const email = document.getElementById('signup_email').value;
  
    const password = document.getElementById('signup_password').value;
    const repeat_password = document.getElementById('signup_repeat_password').value;
//validation for mail
if (!this.validateEmail(email)) {
  emailError = 'Invalid email address';
}

if (!this.validatePassword(password)) {
  passwordError = 'Password must contain at least one uppercase and one lowercase character';
}
//validation for password

    if(password!=repeat_password){
		alert("Passwords do not match");		
	}
	else {
    var http = new XMLHttpRequest();
    var url = 'company/register';
    var params = 'email='+email+'&password='+password;
    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            var responseObj = JSON.parse(http.responseText)
            if(responseObj.status=="success") {					                    
                    Cookies.set('company_email', encodeURI(responseObj.data.email));                    				                    
                    alert("Added!");
                    Router.pushRoute(`/company_login`);
			}
			else {
				alert(responseObj.message);
			}
		}
	
>>>>>>> 44646a8467b37cf5cb197212ae1b845786d832a2
    }
    //validation for password
    else if (password != repeat_password) {
      alert("Passwords do not match");
    } else {
      var http = new XMLHttpRequest();
      var url = "company/register";
      var params = "email=" + email + "&password=" + password;
      http.open("POST", url, true);
      //Send the proper header information along with the request
      http.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded"
      );
      http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
          var responseObj = JSON.parse(http.responseText);
          if (responseObj.status == "success") {
            Cookies.set("company_email", encodeURI(responseObj.data.email));
            alert("Added!");
            Router.pushRoute(`/company_login`);
          } else {
            alert(responseObj.message);
          }
        }
      };
      http.send(params);
    }
  };
  signin = async (event) => {
    const email = document.getElementById("signin_email").value;
    this.setState({ email: document.getElementById("signin_email").value });
    const password = document.getElementById("signin_password").value;
    var http = new XMLHttpRequest();
    var url = "company/authenticate";
    var params = "email=" + email + "&password=" + password;
    http.open("POST", url, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = async function () {
      //Call a function when the state changes.

      if (http.readyState == 4 && http.status == 200) {
        var responseObj = JSON.parse(http.responseText);
        if (responseObj.status == "success") {
          Cookies.set("company_id", encodeURI(responseObj.data.id));
          Cookies.set("company_email", encodeURI(responseObj.data.email));
          // Router.pushRoute(`/election/create_election`);
        } else {
          alert(responseObj.message);
        }
      }
    };
    http.send(params);
    try {
      console.log("in try block");
      const accounts = await web3.eth.getAccounts();
      console.log("account------------------------:" + accounts[0]);
      console.log(this.state.email);
      const summary = await Election_Factory.methods
        .getDeployedElection(this.state.email)
        .call({ from: accounts[0] });
      console.log(summary);
      const summaryStatus = summary[2]; // Save the summary status in a separate variable
      if (summaryStatus == "Create an election.") {
        Router.pushRoute(`/election/create_election`);
      } else {
        Cookies.set("address", summary[0]);
        Router.pushRoute(`/election/${summary[0]}/company_dashboard`);
      }
    } catch (err) {
      console.log("in catch block: " + err.Message);
    }
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <Helmet>
          <title>Company Login</title>
        </Helmet>
        <div>
          {this.returnBackImage()}

          <Button.Group style={{ marginLeft: "43%" }}>
            <Button
              primary
              content={visible ? "Sign in" : "Sign Up"}
              onClick={this.toggleVisibility}
            />
          </Button.Group>
          <Divider style={{ zIndex: "-10" }} />
          <Grid className="grid1">
            <Grid.Row>
              <Grid.Column
                width={5}
                style={{ marginLeft: "33%", marginTop: "10%" }}
                verticalAlign="middle"
              >
                <Segment placeholder className="segment">
                  <Transition
                    visible={!this.state.visible}
                    animation="scale"
                    duration={300}
                  >
                    <Form size="large">
                      <h3 style={{ textAlign: "center" }}>Sign in</h3>
                      <Form.Input
                        fluid
                        id="signin_email"
                        icon="user"
                        iconPosition="left"
                        placeholder="Email"
                        style={{ padding: 5 }}
                      />
                      <Form.Input
                        style={{ padding: 5 }}
                        fluid
                        id="signin_password"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                      />

                      <Button
                        onClick={this.signin}
                        color="blue"
                        fluid
                        size="large"
                        style={{ marginBottom: 15 }}
                      >
                        Submit
                      </Button>
                    </Form>
                  </Transition>

                  <Transition
                    visible={this.state.visible}
                    animation="scale"
                    duration={300}
                  >
                    <Form size="large">
                      <h3 style={{ textAlign: "center" }}>Sign up</h3>
                      <Form.Input
                        fluid
                        id="signup_email"
                        icon="user"
                        iconPosition="left"
                        placeholder="Email"
                        style={{ padding: 5 }}
                      />
                      <Form.Input
                        style={{ padding: 5 }}
                        fluid
                        id="signup_password"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                      />
                      <Form.Input
                        style={{ padding: 5 }}
                        fluid
                        id="signup_repeat_password"
                        icon="lock"
                        iconPosition="left"
                        placeholder="Repeat Password"
                        type="password"
                      />
                      <Button
                        onClick={this.signup}
                        color="blue"
                        fluid
                        size="large"
                        style={{ marginBottom: 15 }}
                      >
                        Submit
                      </Button>
                    </Form>
                  </Transition>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}
export default DividerExampleVerticalForm;
