import React from "react";
import userAPI from "../../API/userAPI";
import { withRouter, NavLink } from "react-router-dom";

const Register = props => {
  const registerHandelr = async e => {
    e.preventDefault();
    const {
      username: { value: username },
      password: { value: password }
    } = e.target.elements;
    console.log(username, password);

    userAPI
      .register({ username, password })
      .then(res => {
        if (res.data._id && res.status === 200);
        alert("register successful");
        props.history.push("/users/login");
      })
      .catch(err => {
        alert("register failed please check your username or password");
      });
  };
  return (
    <>
      <form
        onSubmit={registerHandelr}
        style={{ width: `27%`, margin: `0 auto` }}
      >
        <fieldset>
          <div className="add-product__data">
            <div className="form-controls">
              <section className="tabs">
                <div className="tabs__headers">
                  <div className="tabs__header active">Register</div>
                  <div className="tabs__header">
                    <NavLink className="" exact to="/users/login">
                      {" "}
                      Login{" "}
                    </NavLink>
                  </div>
                </div>
                <div className="tabs__bodies">
                  <div className="tabs__body active">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="username"
                        placeholder="User Name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        className="form-control"
                        type="text"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
              </section>
              <div className="add-product__actions">
                <button type="submit" className="btn btn--primary">
                  Register
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default withRouter(Register);
