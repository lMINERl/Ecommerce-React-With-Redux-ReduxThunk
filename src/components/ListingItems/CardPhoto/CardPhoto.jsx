import React from 'react';

import { connect } from 'react-redux';
import { deleteProductDispatch } from '../../../store/actions/actions';
import { Link } from 'react-router-dom';

const CardPhoto = (props) => {

  let Sale = null;
  if (props.product.isOnSale) {
    Sale = (
      <>
        <div className="item-medium-1__alert" >Sale</div>
      </>
    );
  }
  return (
    <>

      {Sale}

      <div className="item-medium-1__image image" style={{ backgroundImage: `url(${props.product.image})` }}>
        <span href="#" className="item-medium-1__action">Add to Cart</span>
      </div>

      <span href="#">
        <h4>{props.product.name}</h4>
        <div className="flex-row">
          <div>
            <del>${props.product.price}</del>

            <span to="/" className="lable" >${props.product.price-props.product.discount}</span>

          </div>
        </div>
      </span>
      <div className="crud-actions">
        <Link to={`/products/${props.product._id}`}><i className="far fa-eye"></i></Link>
        <Link to={`/edit/${props.product._id}`}><i className="fas fa-edit"></i></Link>
        <span onClick={() => { props.deleteProduct(props.product._id) }} ><i className="fas fa-trash-alt"></i></span>
      </div>

    </>
  );
}

const mapDispachToProps = (dispach) => {
  return {
    deleteProduct: (_id) => {
      dispach(deleteProductDispatch({ _id }))
    }
  }
};

export default connect(null, mapDispachToProps)(CardPhoto);
