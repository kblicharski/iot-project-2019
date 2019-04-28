import React from 'react';

import withAuth from './withAuth';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>Welcome {this.props.user.username}</h2>
      </div>
    );
  }
}

export default withAuth(Home)