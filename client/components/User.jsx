User = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      user: Meteor.user()
    }
  },

  loginWithGithub() {
    const options = {
      requestPermissions: [
        "repo", // Access to public and private repositories
      ]
    };

    Meteor.loginWithGithub(options, (err) => {
      if (err) {
        // XXX error handling
        alert(err);
      }
    });
  },

  logout(event) {
    Meteor.logout((err) => {
      if (err) {
        // XXX error handling
        alert(err);
      }
    });
  },

  render() {
    // If not logged in, display login button
    if (! this.data.user) {
      return (
        <button className="ui primary button" onClick={this.loginWithGithub}>
          GitHub Login
        </button>
      )
    } else {
      return (
        <span className="ui label">
          <i className="user icon" />

          {this.data.user.profile.name + " "}

          <i className="delete icon" onClick={this.logout} />
        </span>
      )
    }
  }
});
