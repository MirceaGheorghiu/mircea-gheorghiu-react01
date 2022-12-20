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
