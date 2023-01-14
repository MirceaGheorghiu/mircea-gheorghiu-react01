const ADD_TO_CART_EVENT = 'cart/productAdded';
const REMOVE_FROM_CART_EVENT = 'cart/productRemoved';
const ADD_TO_WL_EVENT = 'wl/productAdded';
const REMOVE_FROM_WL_EVENT = 'wl/productRemoved';

class NewsletterForm extends React.Component {
  state = {
    email: '',
    formMessage: '',
    busy: false,
    submitted: false,
    successMessage: '',
  };

  // cred ca are si browser-ul o validare implicita de la type="email" din input
  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  onSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;

    this.setState({
      formMessage: '',
    });

    if (!this.validateEmail(email)) {
      this.setState({
        formMessage: 'Please use a valid email',
      });

      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        email: '',
        submitted: true,
        successMessage: `${this.state.email} subscribed`,
      });
    }, 3000);

    if (this.state.submitted) {
      return <div className="success-message">{this.state.successMessage}</div>;
    }
  };

  onInputChange = (event) => {
    const email = event.target.value;

    this.setState({
      email,
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="email-newsletter">sign up for our newsletter</label>
        <input
          type="email"
          name="email"
          id="email-newsletter"
          value={this.state.email}
          onChange={this.onInputChange}
          placeholder="Email"
        ></input>
        <button type="submit">
          {this.state.busy ? (
            <i className="fas fa-spinner loader"></i>
          ) : (
            'SUBMIT'
          )}
        </button>

        <div className="form-message">{this.state.formMessage}</div>

        <div className="success-message">{this.state.successMessage}</div>
      </form>
    );
  }
}

const newsletterContainer = document.querySelector(
  '.footer-sign-up-newsletter',
);
ReactDOM.createRoot(newsletterContainer).render(
  <NewsletterForm></NewsletterForm>,
);

class AddToCartButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      busy: false,
      inCart: false,
    };
  }

  onClick = () => {
    this.setState({
      busy: true,
    });

    setTimeout(() => {
      dispatchEvent(
        new CustomEvent(
          this.state.inCart ? REMOVE_FROM_CART_EVENT : ADD_TO_CART_EVENT,
          {
            detail: {
              productId: this.props.productId,
            },
          },
        ),
      );

      this.setState({
        busy: false,
        inCart: !this.state.inCart,
      });
    }, 1000);
  };

  render() {
    const productInCart = this.state.inCart;

    return (
      <a
        onClick={this.onClick}
        href="#"
        title={`${productInCart ? 'Remove from' : 'Add to'} cart`}
        className={`product-control ${productInCart ? 'added' : ''}`}
        disabled={this.state.busy}
      >
        {productInCart ? (
          <i className="far fa-minus-square"></i>
        ) : (
          <i className="far fa-plus-square"></i>
        )}
        {this.state.busy ? <i className="fas fa-spinner"></i> : <></>}
      </a>
    );
  }
}

class AddToWishlistButton extends React.Component {
  state = {
    inWl: false,
    busy: false,
  };

  onClick = () => {
    this.setState({
      busy: true,
    });

    setTimeout(() => {
      dispatchEvent(
        new CustomEvent(
          this.state.inWl ? REMOVE_FROM_WL_EVENT : ADD_TO_WL_EVENT,
          {
            detail: {
              productId: this.props.productId,
            },
          },
        ),
      );

      this.setState({
        busy: false,
        inWl: !this.state.inWl,
      });
    }, 1000);
  };

  render() {
    const productInWl = this.state.inWl;

    return (
      <a
        onClick={this.onClick}
        href="#"
        title={`${productInWl ? 'Remove from' : 'Add to'} wishlist`}
        className={`product-control ${productInWl ? 'added' : ''}`}
        disabled={this.state.busy}
      >
        {productInWl ? (
          <i className="fas fa-heart"></i>
        ) : (
          <i className="far fa-heart"></i>
        )}
        {this.state.busy ? <i className="fas fa-spinner"></i> : <></>}
      </a>
    );
  }
}

class ProductTileControls extends React.Component {
  render() {
    return (
      <>
        <AddToCartButton productId={this.props.productId}></AddToCartButton>
        <AddToWishlistButton
          productId={this.props.productId}
        ></AddToWishlistButton>
      </>
    );
  }
}

const productTileControls = document.querySelectorAll('.product-tile-controls');
productTileControls.forEach((productTileControl, index) => {
  ReactDOM.createRoot(productTileControl).render(
    <ProductTileControls productId={index}></ProductTileControls>,
  );
});

class CartCounter extends React.Component {
  state = {
    cartItemsCount: 0,
    cartItems: [],
  };

  productCartAction = (event) => {
    const { detail, type: eventType } = event;
    const { productId } = detail;
    const cartItems = this.state.cartItems.slice();

    switch (eventType) {
      case ADD_TO_CART_EVENT:
        cartItems.push(productId);
        this.setState({
          cartItems,
          cartItemsCount: this.state.cartItemsCount + 1,
        });
        break;

      case REMOVE_FROM_CART_EVENT:
        this.setState({
          cartItemsCount: this.state.cartItemsCount - 1,
          cartItems: cartItems.filter((productId) => {
            return productId !== detail.productId;
          }),
        });
        break;
    }
  };

  componentDidMount() {
    addEventListener(ADD_TO_CART_EVENT, this.productCartAction);
    addEventListener(REMOVE_FROM_CART_EVENT, this.productCartAction);
  }

  render() {
    return (
      <div
        className="header-counter"
        onClick={() => {
          alert(this.state.cartItems);
        }}
      >
        {this.state.cartItemsCount > 0 ? (
          <span className="qty">{this.state.cartItemsCount}</span>
        ) : (
          <span className="qty">0</span>
        )}
        <i className="fas fa-shopping-bag" title="Cart"></i>
      </div>
    );
  }
}

class WishlistCounter extends React.Component {
  state = {
    items: [],
    itemsCount: 0,
  };

  wishlistAction = (event) => {
    const { detail, type: eventType } = event;
    const { productId } = detail;

    if (eventType === ADD_TO_WL_EVENT) {
      const items = this.state.items.slice();
      items.push(productId);

      this.setState({
        items,
        itemsCount: this.state.itemsCount + 1,
      });

      return;
    }

    if (eventType === REMOVE_FROM_WL_EVENT) {
      this.setState({
        items: this.state.items.filter((productId) => {
          return productId !== detail.productId;
        }),
        itemsCount: this.state.itemsCount - 1,
      });

      return;
    }
  };

  componentDidMount() {
    addEventListener(ADD_TO_WL_EVENT, this.wishlistAction);
    addEventListener(REMOVE_FROM_WL_EVENT, this.wishlistAction);
  }

  render() {
    return (
      <div
        className="header-counter"
        onClick={() => {
          alert(this.state.items);
        }}
      >
        {this.state.itemsCount > 0 ? (
          <span className="qty">{this.state.itemsCount}</span>
        ) : (
          <span className="qty">0</span>
        )}
        <i className="far fa-heart" title="Wishlist"></i>
      </div>
    );
  }
}

class HeaderCounters extends React.Component {
  render() {
    return [
      <CartCounter key={0}></CartCounter>,
      <WishlistCounter key={1}></WishlistCounter>,
    ];
  }
}

const headerCounters = document.querySelector('.header-counters');
const root = ReactDOM.createRoot(headerCounters);
root.render(<HeaderCounters></HeaderCounters>);
