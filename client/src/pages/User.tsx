import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SteaksList from '../components/SteaksList';
import SteakForm from '../components/SteakForm';

import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const User = () => {
  const { userId } = useParams();

  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : QUERY_ME,
    userId ? 
    {
      variables: { userId }
    } : {}
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_USER` query
  const user = data?.me || data?.user;

  // Use React Router's `<Navigate />` component to redirect to personal user page if username is yours
  if (!loading && Auth.loggedIn() && Auth.getUser().data._id === userId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.name) {
    return (
      <h4>
        You need to be logged in to see your user page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <h2 className="card-header">
        {userId ? `${user.name}'s` : 'Your'} friends have add these
        steaks...
      </h2>

      {user.steaks?.length > 0 && (
        <SteaksList
          steaks={user.steaks}
          isLoggedInUser={!userId}
        />
      )}

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <SteakForm userId={user._id} />
      </div>
    </div>
  );
};

export default User;
