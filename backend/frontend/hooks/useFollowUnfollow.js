import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

const useFollowUnfollow = (user) => {
  const currentUser = useSelector((state) => state.user.user);
  const [following, setFollowing] = useState(user.followers.includes(currentUser?._id));
  const [updating, setUpdating] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = useCallback((message, variant) => {
    enqueueSnackbar(message, { variant });
  }, [enqueueSnackbar]);

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showSnackbar("Please login to follow", "error");
      return;
    }
    if (updating) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        showSnackbar(data.error, "error");
        return;
      }

      if (following) {
        showSnackbar(`Unfollowed ${user.name}`, "success");
        user.followers = user.followers.filter((id) => id !== currentUser?._id);
      } else {
        showSnackbar(`Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id);
      }

      setFollowing(!following);
      console.log(data);
    } catch (error) {
      showSnackbar(error.message, "error");
    } finally {
      setUpdating(false);
    }
  };

  return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;
