import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from './Utils/AuthContext';


function SubscriptionItem({ subscription }) {
  const { title, description, thumbnails } = subscription.snippet;
  const [showMore, setShowMore] = useState(false);
  const textToShow = showMore ? description : `${description.substring(0, 200)}...`;

  return (
    <div className="my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1">
      <div className="cursor-pointer">
        <figure>
          <div style={{width: '100%', height: 0, paddingBottom: '100%', position: 'relative'}}>
            <img
              style={{position: 'absolute', height: '100%', width: '100%'}}
              src={thumbnails.default.url}
              alt=""
            />
          </div>
          <figcaption className="p-4">
            <p className="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
              {title}
            </p>
            <div className={`text-gray-500 dark:text-gray-400 overflow-hidden transition-all duration-500 ease-in-out ${showMore ? "max-h-full" : "max-h-12"}`}>
              <small className="leading-5">
                {textToShow}
              </small>
            </div>
            {description.length > 200 && (
              <button onClick={() => setShowMore(!showMore)}>
                {showMore ? "See less" : "See more"}
              </button>
            )}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

function SubscriptionCard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const { state } = useContext(AuthContext);
  const user = state?.user;
  const loader = useRef(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/subscriptions?limit=50`, {
          headers: {
            'Authorization': `Bearer ${user?.accessToken}`
          },
          credentials: 'include'
        });
        const { items, nextPageToken } = await response.json();
        setSubscriptions(items);
        setNextPageToken(nextPageToken);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if(user) {
      fetchSubscriptions();
    }
  }, [user]);

  useEffect(() => {
    const fetchMoreSubscriptions = async () => {
      if (!nextPageToken) return;
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/subscriptions?pageToken=${nextPageToken}`, {
        headers: {
          'Authorization': `Bearer ${user?.accessToken}`
        },
        credentials: 'include'
      });
      const { items, nextPageToken: newNextPageToken } = await response.json();
      setSubscriptions((prevSubscriptions) => [...prevSubscriptions, ...items]);
      setNextPageToken(newNextPageToken);
    };

    const observer = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        await fetchMoreSubscriptions();
      }
    }, {
      root: null,
      rootMargin: "200px",
      threshold: 1.0
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [nextPageToken, user]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
      <div className="container px-4 mx-auto">
        <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <h2>Total subscriptions: {subscriptions.length}</h2>
          {subscriptions.map((subscription, index) => (
            <SubscriptionItem key={index} subscription={subscription} />
          ))}
        </div>
      </div>
      <div ref={loader}>Loading more...</div>
    </div>
  );
}

export default SubscriptionCard;
