import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_STEAK } from '../../utils/mutations';

import Auth from '../../utils/auth';

interface SteakFormProps {
  userId: string;
}

const SteakForm: React.FC<SteakFormProps> = ({ userId }) => {
  const [steak, setSteak] = useState('');

  const [addSteak, { error }] = useMutation(ADD_STEAK);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addSteak({
        variables: { userId, steak },
      });

      setSteak('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Add your favorite steaks below.</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Add your favorite steaks..."
              value={steak}
              className="form-input w-100"
              onChange={(event) => setSteak(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Add Steak
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to add your favorite steaks. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SteakForm;
