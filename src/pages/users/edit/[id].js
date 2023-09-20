import FormUser from '@components/FormUser';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import endPoints from '@services/api';

export default function Edit() {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getUser() {
      const response = await axios.get(endPoints.users.getOneUser(id));
      setUser(response.data);
    }
    getUser();
  }, [router?.isReady]);

  return <FormUser user={user} />;
}