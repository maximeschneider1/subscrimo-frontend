import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  
  const [state, setState] = useState({ loggedIn: false, user: null });

  const updateState = (newValue) => {
    setState(newValue);
  };

  useEffect(() => {
    const getUser = () => { 
      fetch('http://localhost:3001/api/checkAuth', 
      { credentials: 'include' }
      ) 
        .then((response) => response.json())
        .then((data) => {
          if (data.loggedIn) {
            console.log('User is logged in:', data)
            updateState({ loggedIn: true, user: data.user });
          } else {
            updateState({ loggedIn: false, user: null });
          }
        })
        .catch((error) => {
          console.log('Error checking authentication:', error);
        });
    }
    getUser()
    // setTimeout(() => {
    //   window.close()
    // }, 1000)
    // console.log(state.loggedIn)
  }, []);

  return (
    <AuthContext.Provider value={{ state, updateState }}>
      {props.children}
    </AuthContext.Provider>
  );
};
