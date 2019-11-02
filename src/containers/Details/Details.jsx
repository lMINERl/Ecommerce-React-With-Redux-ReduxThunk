import React from "react";
import { connect } from "react-redux";
import {
  getProductDispatch,
  DispatchChangeCache
} from "../../store/actions/actions";
import { withRouter } from "react-router-dom";

import dataComp from "../../Helpers/compToStates";
import Cockpit from "../../components/Cockpit";
import userAPI from "../../API/userAPI";
import accessToken from "../../db/localStorage";

class Details extends React.Component {
  state = {
    allowUser: false
  };
  componentWillMount = () => {
    this.props.onLoad(this.props.match.params.id);
  };
  //bug you need to changed props.data state when entring the condition of set state
  componentDidMount = () => {
    // console.log(`component mount with allowuser${this.state.allowUser} and cache${this.props.data}`);
    if (!this.state.allowUser) {
      // console.log("request sent for authurization");
      userAPI
        .check(accessToken.authorization(), !this.state.allowUser)
        .then(res => {
          if (!this.props.data) {
            this.setState({ allowUser: true });
            this.props.changeCahe();
          } else {
            // console.log("request sent for data");
          }
        })
        .catch(err => {
          console.error("UnAuthurized" + err);
        });
    }
  };
  componentWillUnmount = () => {
    // console.log(`terminating product listing`);
    this.props.changeCahe();
  };
  shouldComponentUpdate = (prevProps, prevState) => {
    // console.log(`comparing 2 props`);
    const isSame =
      dataComp(prevProps.product, this.props.product) &&
      dataComp(this.state, prevState);
    return !isSame;
  };
  render() {
    // console.log(`render Details and allow user is ${this.state.allowUser}`);
    let details = (
      <>
        <h1>Waiting For authurization</h1>
      </>
    );
    if (this.state.allowUser) {
      let price = <span>${this.props.product.price}</span>;
      if (this.props.product.isOnSale) {
        price = (
          <>
            <span
              style={{ color: "lightgray", textDecoration: "line-through" }}
            >
              ${this.props.product.price}
            </span>
            &nbsp;
            <span>
              $
              {(
                parseInt(this.props.product.price) -
                parseInt(this.props.product.discount)
              ).toString()}
            </span>
          </>
        );
      }

      let tags = null;
      if (this.props.product.id && this.props.product.tags.length > 0) {
        tags = this.props.product.tags.map((t, index) => {
          return (
            <span key={index} rel="tag">
              , {t}
            </span>
          );
        });
      }
      let category = null;
      if (this.props.product.category) {
        category = <span rel="tag">{this.props.product.category.name}</span>;
      }
      details = (
        <>
          <Cockpit />
          <div className="product-details container">
            <section className="product-details__main">
              <div className="slider">
                <div className="slider__items">
                  <div
                    className="slider__item active"
                    style={{
                      backgroundImage: `url(${this.props.product.image})`
                    }}
                  ></div>
                </div>
              </div>
              <div className="product-details__info">
                <h1>{this.props.product.name}</h1>
                <div className="rating">
                  <div className="rating__stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                  <div className="rating__data">2 reviews</div>
                </div>
                <div className="product-details__amount">{price}</div>
                <p className="product-details__desc">
                  {this.props.product.description}
                </p>
                <div className="product-details__meta">
                  Category: {category}
                  {tags}.
                </div>
              </div>
            </section>
            <section className="tabs">
              <div className="tabs__headers">
                <div className="tabs__header active">Description</div>
                <div className="tabs__header">Additional Information</div>
                <div className="tabs__header">Reviews (2)</div>
              </div>
              <div className="tabs__bodies">
                <div className="tabs__body active">
                  <div className="product-details__desc">
                    <p>{this.props.product.description}</p>
                    <p>{this.props.product.description}</p>
                  </div>
                </div>
                <div className="tabs__body ">tab2</div>
                <div className="tabs__body">tab3</div>
              </div>
            </section>
          </div>
        </>
      );
    }
    return details;
  }
}
const mapStateToProps = state => {
  return {
    product: state.selectedProduct,
    data: state.isListingCached
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoad: id => {
      dispatch(getProductDispatch(id));
    },
    changeCahe: () => {
      dispatch(DispatchChangeCache());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Details));
