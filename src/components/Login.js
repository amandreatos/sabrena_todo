import React, { Component } from "react";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null
  };


  handleSubmit = e => {
      e.preventDefault();
      const { email, password } = this.state;

      this.props.handleLogin(email, password);
  }

  render() {
    return (
        <div className="formContainer">
        <h4 style={{color: 'tomato'}}>{this.props.error}</h4>
      <form onSubmit={this.handleSubmit} className="f-labels with-icon">
        <div className="floating-label w-icon">
          <input onChange={e => this.setState({email: e.target.value})} id="email" placeholder="Email" type="email" name="email" />
          <label htmlFor="email">Email:</label>
          <div className="form-icon">
            <i className="far fa-envelope"></i>
          </div>
        </div>
        <div className="floating-label w-icon">
          <input
            onChange={e => this.setState({password: e.target.value})}
            id="password"
            placeholder="Password"
            type="password"
            name="password"
          />
          <label htmlFor="password">Password:</label>
          <div className="form-icon">
            <svg
              className="svg-inline--fa fa-unlock-alt fa-w-12"
              aria-hidden="true"
              data-prefix="fal"
              data-icon="unlock-alt"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              data-fa-i2svg=""
            >
              <path
                fill="currentColor"
                d="M336 256H96v-96c0-70.6 25.4-128 96-128s96 57.4 96 128v20c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12v-18.5C320 73.1 280.9.3 192.5 0 104-.3 64 71.6 64 160v96H48c-26.5 0-48 21.5-48 48v160c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm16 208c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16h288c8.8 0 16 7.2 16 16v160zm-160-32c-8.8 0-16-7.2-16-16v-64c0-8.8 7.2-16 16-16s16 7.2 16 16v64c0 8.8-7.2 16-16 16z"
              />
            </svg>
          </div>
        </div>
        <div className="button-container">
          <button className="button darkblue sm outline">Login <i className="fas fa-sign-in-alt"></i></button>
        </div>
      </form>
      </div>
    );
  }
}

export default Login;
