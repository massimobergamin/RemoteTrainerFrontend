import { useState, useEffect } from 'react';
import { useAuth } from '../../firebase/contextAuth';
import UpdateProfileForm from '../../components/updateProfileForm';
import NavigationTrainer from '../../components/navigationBar/navigationTrainer';
import { getUserById } from '../../redux/trainer';
import { useDispatch } from 'react-redux';
import Loader from '../../components/loader';

const EditProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getUserById(currentUser.uid))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [])

  if (loading) {
    return (
      <div>
        <div className="loader_wrapper">
          <Loader/>
        </div>
        <NavigationTrainer/>
      </div>
    )
  }

  return (
    <div>
      <div className="page_container">
      <UpdateProfileForm></UpdateProfileForm>
      </div>
      <NavigationTrainer></NavigationTrainer>
    </div>
  )
}

export default EditProfile;