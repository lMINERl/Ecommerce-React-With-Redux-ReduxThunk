import React from 'react';
import {connect} from 'react-redux';

const Filters = (props) => {

  let categories = [];
  if(props.categories && props.categories.length > 0)
  {
      categories = props.categories.map((c,index)=>{
          return(<li className="link list__item" key={index}><i className="link__icon fas fa-angle-right"></i>{c}</li>);
      })
  }
  return (
    <section className="filters">
      <div className="search-box">
        <input className="search-box__input" placeholder="Search..." type="text" name="txt_search" id="" />
        <button type="submit" className="search-box__btn"><i className="fas fa-search"></i></button>

      </div>
      <div>
        <h5>Categories</h5>
        <ul className="list list--vr-separator">
          {categories}
        </ul>
      </div>
      <div>

        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div>

        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
}

const mapStateToProps = state => {
  return{
    categories: state.categories
  }
}

export default connect(mapStateToProps)(Filters);