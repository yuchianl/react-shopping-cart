import React, {Component} from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: [],
      size:"",
      sort:""
    };
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems: cartItems});
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({cartItems: cartItems.filter(
      (item) => item._id !== product._id
    )});
    
    
  }

  sortProducts = (e) => {
    const sort = e.target.value;
    this.setState({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => {
        if (sort === "Lowest") {
          return a.price - b.price;
        } else if (sort === "Highest") {
          return b.price - a.price;
        } else {
          return a._id - b._id;
        }
      })
    });
  }
  filterProducts = (e) => {
    if (e.target.value === "") {
      this.setState({size: e.target.value, products: data.products})
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >= 0)
      });
    }
  }
  render () {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                      size={this.state.size}
                      sort={this.state.sort}
                      filterProducts={this.filterProducts}
                      sortProducts={this.sortProducts}     
              ></Filter>
              <Products 
                products={this.state.products} 
                addToCart={this.addToCart}>
                
              </Products>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}></Cart>
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
    );
  }
}

export default App;
