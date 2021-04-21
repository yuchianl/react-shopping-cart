import React, {Component} from 'react';
import formatCurrency from '../util';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCheckout: false,
            name: "",
            email: "",
            address: ""
        };
    }
    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems
        };
        this.props.createOrder(order);
    }
    render () {
        const {cartItems} = this.props;
        return (
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Cart is empty!</div>
                : <div className="cart cart-header">You have {cartItems.length} in the cart{" "}</div>
                }
                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        <div>{formatCurrency(item.price)}x{item.count}</div>
                                        <button className="button" onClick={()=>this.props.removeFromCart(item)}>
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {cartItems.length!==0 && (
                        <div>
                            <div className="cart">
                            <div className="total">
                                <div>
                                    Total: {" "}
                                    {formatCurrency(
                                        cartItems.reduce((a,c)=>a+c.price*c.count,0)
                                    )}
                                </div>
                                <button onClick={()=>{this.setState({showCheckout: true})}} className="button primary">
                                    Proceed
                                </button>
                            </div>
                        </div>
                        {this.state.showCheckout && (
                            <div className="cart">
                                <form onSubmit={this.createOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Email</label>
                                            <input type="email" name="email" onChange={this.handleInput} required></input>
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input type="text" name="name" onChange={this.handleInput} required></input>
                                        </li> 
                                        <li>
                                            <label>Address</label>
                                            <input type="text" name="address" onChange={this.handleInput} required></input>
                                        </li>   
                                        <li>
                                            <button className="button primary" type="submit">Checkout</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        )}
                        </div>  
                    )}
                </div>
            </div>
        );
    }
}