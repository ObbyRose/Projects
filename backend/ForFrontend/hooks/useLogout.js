import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { logoutUser } from "../features/userSlice";

const useLogout = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };    

    const logout = async () => {
        try {
            const res = await fetch("/api/users/logout", {
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

        localStorage.removeItem("user-threads");
            dispatch(logoutUser());
        showSnackbar("Successfully logged out", "success");
    } catch (error) {
        showSnackbar(error.message, "error");
        }
    };

    return logout;
};

export default useLogout;
