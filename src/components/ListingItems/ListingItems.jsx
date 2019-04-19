import React from 'react';
import CardPhoto from './CardPhoto/CardPhoto';


const ListingItems = (props) => {



  //page listing numbers
  const pageNumration = () => {
    let pageNum = [];
    let numOfPages = (props.products.length % props.max_items === 0) ? Math.floor(props.products.length / props.max_items) : Math.floor(props.products.length / props.max_items) + 1;
    for (let index = 0; index < numOfPages; index++) {
      if (index + 1 === props.page) {
        pageNum.push((<div key={index} className="paging__number active">{index + 1}</div>));
      }
      else {
        pageNum.push((<div key={index} className="paging__number">{index + 1}</div>));
      }
    }
    return pageNum;
  }

  let listingItems = (<></>);
  const productsList = props.products.map((p, index) => {
    if (index >= ((props.page - 1) * props.max_items) && index < (props.page * props.max_items)) {
      return (
        <div key={p._id} className="item-medium-1">
          <CardPhoto product={p} key={p._id} />
        </div>
      );
    } else {
      return null;
    }
  });
  listingItems = (
    <section className="item-listing">
      <div className="item-listing__tools">
        <select className="form-control" name="" id="">
          <option value="1">Featured</option>
          <option value="2">Price low to high</option>
          <option value="3">Price high to low</option>
          <option value="4">Name</option>
        </select>
        <span className="action-btn" href="#">
          <i className="fas fa-plus"></i>
        </span>
      </div>

      <div className="item-listing__items item-listing--3items">
        {productsList}
      </div>

      <div className="paging">

        <div onClick={() => { props.pageChanedHndlr(props.page - 1) }} className="paging__arrow">
          <i className="fas fa-angle-left"></i>
        </div>

        {pageNumration()}

        <div onClick={() => { props.pageChanedHndlr(props.page + 1) }} className="paging__arrow">
          <i className="fas fa-angle-right"></i>
        </div>
      </div>
    </section>

  )

  return (
    listingItems
  );

}






export default ListingItems;
