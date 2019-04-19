import React from 'react';
import userAPI from '../../API/userAPI';
import { withRouter, NavLink } from 'react-router-dom';
import accessToken from '../../db/localStorage';


const Login = (props) => {

  const loginHandler = async (e) => {
    e.preventDefault();
    const { username: { value: username }, password: { value: password } } = e.target.elements;
    userAPI.login({ username, password }).then(
      res => {
        
        if (res.token) {
          if (res.token !== accessToken.authorization()) {
            console.log(`clearing storage`);
            localStorage.clear();
            localStorage.setItem('authorization', res.token);
            localStorage.setItem('username', res.user.username);
          }
          console.log(res.token);
          props.history.push('/products');
          alert("login successfull");
        }
      }
    ).catch(
      err => {
        alert("register failed please check your username or password");
      }
    );
  }

  return (
    <>
      <form onSubmit={loginHandler} style={{ width: `27%`, margin: `0 auto` }}>
        <fieldset>
          <div className="add-product__data">
            <div className="form-controls"><section className="tabs">
              <div className="tabs__headers">
                <div className="tabs__header active">Login
            </div>
                <div className="tabs__header">
                  <NavLink className="" exact to="/users/register"> Register </NavLink>
                </div>
              </div>
              <div className="tabs__bodies">
                <div className="tabs__body active">
                  <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" name="username" placeholder="User Name" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="text" name="password" placeholder="Password" />
                  </div>
                </div>
              </div>
            </section>
              <div className="add-product__actions">
                <button type="submit" className="btn btn--primary">Login</button>
              </div>

            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default withRouter(Login);
