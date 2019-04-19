import React from 'react';
import Filters from '../../components/Filters/Filters';
import ListingItems from '../../components/ListingItems/ListingItems';
import { connect } from 'react-redux';
import { getAllProductsDispatch, DispatchChangeCache } from '../../store/actions/actions';
import Cockpit from '../../components/Cockpit'
import dataComp from '../../Helpers/compToStates';
import accessToken from '../../db/localStorage';
import userAPI from '../../API/userAPI';




class ProductListing extends React.Component {

  state = {
    Page: 1,
    max_items: 6,
    products: [],
    allowUser: false
  }
  pageChanedHndlr = (page) => {
    let numOfPages = (this.props.products.length % this.state.max_items === 0) ? Math.floor(this.props.products.length / this.state.max_items) : Math.floor(this.props.products.length / this.state.max_items) + 1;
    if (page <= numOfPages && page > 0) {
      this.setState({ Page: page });
    }

  }
  componentDidMount = () => {
    // console.log(`component mount with allowuser${this.state.allowUser} and cache${this.props.data.isListingCached}`);
    if (!(this.state.allowUser && this.props.data.isListingCached)) {
      // console.log("request sent for authurization");
      userAPI.check(accessToken.authorization(), !this.state.allowUser).then(
        res => {
          if (!this.props.data.isListingCached) {
            this.props.OnLoad();
            this.setState({ allowUser: true });
            this.props.changeCahe();
          } else {
            // console.log("request sent for data");
          }
        }
      ).catch(err => {
        console.error("UnAuthurized" + err);
      });
    }
    //1st load cache prevent requests if no data changed
    // reqest data if and only if you are authurized
  }
  componentWillUnmount = () => {
    // console.log(`terminating product listing`);
    this.props.changeCahe();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (dataComp([...this.props.data.products], [...prevProps.data.products])) {
      // console.log("request sent");
      this.props.OnLoad(false);
    }
  }

  shouldComponentUpdate = (prevProp, prevState) => {
    // console.log(`comparing 2 props`);

    const isSame = dataComp(this.props, prevProp) && dataComp(this.state,prevState);
    return !isSame;
  }


  render() {
    // console.log(`render productListing and allow user is ${this.state.allowUser}`);
    let listing = (<><h1>Waiting For authurization</h1></>);

    // access guard
    if (this.state.allowUser) {
      listing = (
        <>
          <Cockpit />
          <div className="container" >
            <Filters />
            <ListingItems max_items={this.state.max_items} pageChanedHndlr={this.pageChanedHndlr.bind(this)} page={this.state.Page} products={this.props.data.products} />
          </div>
        </>
      );
    }
    return (
      listing
    );
  }
}

const mapStateToProps = state => ({

  data: { products: state.products, isListingCached: state.isListingCached }

});

const mapDispatchToProps = dispatch => {
  return {
    OnLoad: () => { dispatch(getAllProductsDispatch()) },
    changeCahe: () => { dispatch(DispatchChangeCache()) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
