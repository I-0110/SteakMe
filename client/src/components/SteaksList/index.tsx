import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_STEAK } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

interface SteaksListProps {
  steaks?: string[];
  isLoggedInUser: boolean;
}

const SteaksList: React.FC<SteaksListProps> = ({ steaks = [], isLoggedInUser }) => {
  const [removeSteak, { error }] = useMutation
  (REMOVE_STEAK, {
    refetchQueries: [
      QUERY_ME,
      'me'
    ]
  });

  const handleRemoveSteak = async (steak: any) => {
    try {
      await removeSteak({
        variables: { steak },
      });
    } catch (err) {
      console.error(err);
    }
  };
  if (!steaks.length) {
    return <h3>No Steaks Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {steaks &&
          steaks.map((steak) => (
            <div key={steak} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{steak}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveSteak(steak)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default SteaksList;
