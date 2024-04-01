import React from 'react';
import { Message } from 'semantic-ui-react';

const Snackbar = ({ token }) => {
  return (
    <Message negative hidden={token} style={{
        position: "fixed",
        width:"100%",
        bottom: 10,
        zIndex: 9999,
      }}>
      <Message.Header>Login Required</Message.Header>
      <p>Please login to access this feature.</p>
    </Message>
  );
};

export default Snackbar;