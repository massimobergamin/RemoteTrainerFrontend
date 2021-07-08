import React, { useEffect, useState } from 'react';
import { useAuth } from '../../firebase/contextAuth';
import { useDispatch, useSelector } from 'react-redux';
import NavigationClient from '../../components/navigationBar/navigationClient';
import { getUser } from '../../redux/client';
import UpdateClientProfileForm from '../../components/updateClientProfileForm';
import Loader from '../../components/loader';


const Editprofile = () => {
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
        <div className="loader_wrapper">
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

export default Editprofile
