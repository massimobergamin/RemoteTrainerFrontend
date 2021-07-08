import { useEffect, useState } from 'react';
import { useAuth } from '../../firebase/contextAuth';
import { useDispatch } from 'react-redux';
import NavigationClient from '../../components/navigationBar/navigationClient';
import { getUser } from '../../redux/client';
import UpdateClientProfileForm from '../../components/updateClientProfileForm';
import Loader from '../../components/loader';


const EditProfile = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getUser(currentUser.uid))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <div className="loader_wrapper_100">
          <Loader/>
        </div>
        <NavigationClient></NavigationClient>
      </div>
    )
  }

  return (
    <div>
      <div className="page_container">
        <UpdateClientProfileForm/>
      </div>
      <NavigationClient></NavigationClient>
    </div>
  )
}

export default EditProfile;
