import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();

        if (data.error) {
          showSnackbar(data.error, "error");
          return;
        }

        setUser(data);
      } catch (error) {
        showSnackbar(error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username]);

  return { loading, user };
};

export default useGetUserProfile;
