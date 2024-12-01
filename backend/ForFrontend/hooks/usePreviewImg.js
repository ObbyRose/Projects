import { useState } from "react";
import { useSnackbar } from "notistack";

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar = (message, variant) => {
        enqueueSnackbar(message, { variant });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onloadend = () => {
            setImgUrl(reader.result);
        };

        reader.readAsDataURL(file);
    } else {
        showSnackbar("Invalid file type. Please select an image file.", "error");
        setImgUrl(null);
        }
    };

    return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
