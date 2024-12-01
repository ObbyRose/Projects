import { Box, Container } from "@mui/material";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/slices/userSlice";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";

function App() {
    const user = useSelector(selectUser);
    const { pathname } = useLocation();

    return (
        <Box sx={{ position: "relative", width: "100%" }}>
            <Container maxWidth={pathname === "/" ? { xs: "620px", md: "900px" } : "620px"}>
            <Header />
        <Routes>
            <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
            <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
            <Route path="/update" element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
            
            <Route
            path="/:username"
            element={user ? (
                <>
                    <UserPage />
                    <CreatePost />
                </>
            ) : (
                <UserPage />
                )}
            />
            <Route path="/:username/post/:pid" element={<PostPage />} />
            <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/auth" />} />
        </Routes>
            </Container>
    </Box>
    );
}

export default App;
