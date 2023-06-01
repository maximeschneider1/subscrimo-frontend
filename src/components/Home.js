import React, { useEffect, useState } from 'react';
import SubscriptionCard from './SubscriptionCard';
import { AuthContext } from './Utils/AuthContext';

function Home() {
  const [subscriptions, setSubscriptions] = useState([]);
  const { state } = React.useContext(AuthContext);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/subscriptions', {
          headers: {
            'Authorization': `Bearer ${state?.user?.accessToken}`
          },
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if(state?.user) {
      fetchSubscriptions();
    }
  }, [state?.user]);

  if (!state.user) return <div>Loading...</div>;

  return (
<div className="my-component">
      <h1>Welcome, {state.user?.name}!</h1>
      <p>Your email: {state.user?.email}</p>
      <SubscriptionCard /> 
    </div>
  );
}

export default Home;
