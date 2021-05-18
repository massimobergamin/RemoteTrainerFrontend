import React, { useEffect } from 'react';
import { useAuth } from '../../firebase/contextAuth';
import { useDispatch, useSelector } from 'react-redux';
import NavigationClient from '../../components/navigationBar/navigationClient';
import { getUser } from '../../redux/client';



const Editprofile = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(currentUser.uid));
  }, []);


  return (
    <div>
      <NavigationClient></NavigationClient>
    </div>
  )
}

export default Editprofile