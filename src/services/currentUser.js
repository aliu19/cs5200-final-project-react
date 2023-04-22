import { useState } from 'react';

function currentUser() {

  function getUser() {
    const currentUser = localStorage.getItem('user');
    return JSON.parse(currentUser)
  }

  function saveUser(currentUser) {
    localStorage.setItem('user', JSON.stringify(currentUser));
  };

  function removeUser() {
    localStorage.removeItem("user");
  }

  return {
    setCurrentUser: saveUser,
    removeUser,
    getUser
  }

}

export default currentUser;
