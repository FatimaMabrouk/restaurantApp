import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ItemForm extends Component {
  state = {
    _id: this.props.selectedItem && this.props.selectedItem._id || '',
    name: this.props.selectedItem && this.props.selectedItem.name || '',
    img: this.props.selectedItem && this.props.selectedItem.img || '',
    price: this.props.selectedItem && this.props.selectedItem.price || '',
    categoryId: this.props.selectedItem &&
      this.props.ItemCategory[0]._id || ''
  };

  onChangeNameHandler = (e) => {
    let name = e.target.value;
    this.setState(() => ({ name }));
  };

  onChangeImgHandler = (e) => {
    let img = e.target.value;
    this.setState(() => ({ img }));
  };

  onChangePriceHandler = (e) => {
    let price = e.target.value;
    this.setState(() => ({ price }));
  };

  onChangeSelectHandler = (e) => {
    let categoryId = e.target.value;
    this.setState(() => ({ categoryId }));
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    let item = {
      ...this.state,
      categoryId: this.props.ItemCategory.filter((item) => item._id === this.state.categoryId)[0]
    }
    this.props.onSubmit(item);
    this.setState(() => ({
      _id: '',
      name: '',
      img: '',
      price: '',
      categoryId: ''
    }));
  };

  render() {

    return (
      <form onSubmit={this.onSubmitHandler}>
        <input type="text" placeholder="Item Name" value={this.state.name} onChange={this.onChangeNameHandler} />

        <input type="text" placeholder="Price" value={this.state.price} onChange={this.onChangePriceHandler} />

        <input type="text" placeholder="Image Source" value={this.state.img} onChange={this.onChangeImgHandler} />

        <select onChange={this.onChangeSelectHandler}>
          {this.props.ItemCategory.map(category => {
            return <option key={category._id} value={category._id}>{category.name}</option>
          })}
        </select>

        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  ItemCategory: state.cateogries.map(category => category)
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm)
