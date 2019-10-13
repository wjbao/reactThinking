import React from 'react';
import './App.css';
const products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function App() {
  return (
    <FilterableProductTable products={products}/>
  );
}


class ProductCategoryRow extends React.Component {
  render () {
    const category = this.props.category
    return (
      <div> {category} </div>
    )
  }
}

class ProductRow extends React.Component {
  render () {
    let { price, stocked, name } = this.props.product
    name = stocked ? name : <span style={{color: '#f00'}}> { name }</span>
    return (
      <div>
        <span>{ name }</span>
        <span>{ price }</span>
      </div>
    )
  }
}

class ProductTable extends React.Component {
  render () {
    const filterText = this.props.filterText
    const inStockOnly = this.props.inStockOnly

    const rows = []
    let lastCategory = null

    this.props.products.forEach(product => {
      if (product.name.indexOf(filterText) === -1) { return }
      if (inStockOnly && !product.stocked) { return }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        )
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      )
      lastCategory = product.category
    })
    return (
      <div>
        <div>
          <span>Name</span>
          <span>Price</span>
        </div>
        {rows}
      </div>
    )
  }
}

class SearchBar extends React.Component {
  constructor (props) {
    super(props)
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  handleFilterTextChange ({target}) {
    this.props.onFilterTextChange(target.value)
  }

  handleInStockChange ({target}) {
    this.props.onInStockChange(target.checked)
  }

  render () {
    const filterText = this.props.filterText
    const inStockOnly = this.props.inStockOnly

    return (
      <form>
        <input
          type="text"
          value={filterText}
          onChange={this.handleFilterTextChange}
          placeholder="Search..." />
        <p>
          <input
            type="checkbox"
            onChange={this.handleInStockChange}
            checked={inStockOnly}  />
          only show product in stock
        </p>
      </form>
    )
  }
}

class FilterableProductTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: '',
      inStockOnly: false  
    }
  }
  render () {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={filterText => this.setState({filterText})} 
          onInStockChange={inStockOnly => this.setState({inStockOnly})} 
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}/>
      </div>
    )
  }
}

export default App;
