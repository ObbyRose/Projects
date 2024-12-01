import { useSnackbar } from "notistack";
import { useCallback } from "react";

const useShowSnackbar = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar = useCallback(
        (message, variant) => {
            enqueueSnackbar(message, {
                variant: variant || "default",
                autoHideDuration: 3000,
        });
    },
        [enqueueSnackbar]
    );

    return { showSnackbar };
};

export default useShowSnackbar;
