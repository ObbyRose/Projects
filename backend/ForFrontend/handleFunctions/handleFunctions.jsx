
// Handle Login
const handleLogin = async () => {
    setLoading(true);
    try {
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        });
        const data = await res.json();
        if (data.error) {
            res.error("Error", data.error, "error");
            return;
        }
        localStorage.setItem("user-instagram", JSON.stringify(data));
        setUser(data);
    } catch (error) {
        res.error("Error", error, "error");
    } finally {
        setLoading(false);
    }
};

//log out
const handleLogout = async () => {
    try {
        const res = await fetch("/api/users/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();

        if (data.error) {
            showToast("Error", data.error, "error");
            return;
        }

        localStorage.removeItem("user-instagram");
        setUser(null);
    } catch (error) {
        showToast("Error", error, "error");
    }
};

//Sign Up
const handleSignup = async () => {
    try {
        const res = await fetch("/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        });
        const data = await res.json();

        if (data.error) {
            res.error("Error", data.error, "error");
            return;
        }

        localStorage.setItem("user-instagram", JSON.stringify(data));
        setUser(data);
    } catch (error) {
        res.error("Error", error, "error");
    }
};

// Handle Like Unlike
const handleLikeAndUnlike = async () => {
    if (!user) return showToast("Error", "You must be logged in to like a post", "error");
    if (isLiking) return;
    setIsLiking(true);
    try {
        const res = await fetch("/api/posts/like/" + post._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (data.error) return res.error("Error", data.error, "error");

        if (!liked) {
            const updatedPosts = posts.map((p) => {
                if (p._id === post._id) {
                    return { ...p, likes: [...p.likes, user._id] };
                }
                return p;
            });
            setPosts(updatedPosts);
        } else {
            const updatedPosts = posts.map((p) => {
                if (p._id === post._id) {
                    return { ...p, likes: p.likes.filter((id) => id !== user._id) };
                }
                return p;
            });
            setPosts(updatedPosts);
        }

        setLiked(!liked);
    } catch (error) {
        res.error("Error", error.message, "error");
    } finally {
        setIsLiking(false);
    }
};

// Handle Reply
const handleReply = async () => {
    if (!user) return showToast("Error", "You must be logged in to reply to a post", "error");
    if (isReplying) return;
    setIsReplying(true);
    try {
        const res = await fetch("/api/posts/reply/" + post._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: reply }),
        });
        const data = await res.json();
        if (data.error) return res.error("Error", data.error, "error");

        const updatedPosts = posts.map((p) => {
            if (p._id === post._id) {
                return { ...p, replies: [...p.replies, data] };
            }
            return p;
        });
        setPosts(updatedPosts);
        res.error("Success", "Reply posted successfully", "success");
        onClose();
        setReply("");
    } catch (error) {
        res.error("Error", error.message, "error");
    } finally {
        setIsReplying(false);
    }
};


// Text change and createPost

const handleTextChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
        const truncatedText = inputText.slice(0, MAX_CHAR);
        setPostText(truncatedText);
        setRemainingChar(0);
    } else {
        setPostText(inputText);
        setRemainingChar(MAX_CHAR - inputText.length);
    }
};

const handleCreatePost = async () => {
    setLoading(true);
    try {
        const res = await fetch("/api/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ postedBy: user._id, text: postText, img: imgUrl }),
        });

        const data = await res.json();
        if (data.error) {
            res.error("Error", data.error, "error");
            return;
        }
        showToast("Success", "Post created successfully", "success");
        if (username === user.username) {
            setPosts([data, ...posts]);
        }
        onClose();
        setPostText("");
        setImgUrl("");
    } catch (error) {
        res.error("Error", error, "error");
    } finally {
        setLoading(false);
    }
};

// Handle send message
const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText && !imgUrl) return;
    if (isSending) return;

    setIsSending(true);

    try {
        const res = await fetch("/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: messageText,
                recipientId: selectedConversation.userId,
                img: imgUrl,
            }),
        });
        const data = await res.json();
        if (data.error) {
            res.error("Error", data.error, "error");
            return;
        }
        console.log(data);
        setMessages((messages) => [...messages, data]);

        setConversations((prevConvs) => {
            const updatedConversations = prevConvs.map((conversation) => {
                if (conversation._id === selectedConversation._id) {
                    return {
                        ...conversation,
                        lastMessage: {
                            text: messageText,
                            sender: data.sender,
                        },
                    };
                }
                return conversation;
            });
            return updatedConversations;
        });
        setMessageText("");
        setImgUrl("");
    } catch (error) {
        res.error("Error", error.message, "error");
    } finally {
        setIsSending(false);
    }
};

//handle Posts
useEffect(() => {
    const getUser = async () => {
        try {
            const res = await fetch("/api/users/profile/" + postedBy);
            const data = await res.json();
            if (data.error) {
                res.error("Error", data.error, "error");
                return;
            }
            setUser(data);
        } catch (error) {
            res.error("Error", error.message, "error");
            setUser(null);
        }
    };

    getUser();
}, [postedBy, showToast]);

const handleDeletePost = async (e) => {
    try {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        const res = await fetch(`/api/posts/${post._id}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (data.error) {
            res.error("Error", data.error, "error");
            return;
        }
        res.error("Success", "Post deleted", "success");
        setPosts(posts.filter((p) => p._id !== post._id));
    } catch (error) {
        res.error("Error", error.message, "error");
    }
};

if (!user) return null;

//suggested users
useEffect(() => {
    const getSuggestedUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/users/suggested");
            const data = await res.json();
            if (data.error) {
                res.error("Error", data.error, "error");
                return;
            }
            setSuggestedUsers(data);
        } catch (error) {
            res.error("Error", error.message, "error");
        } finally {
            setLoading(false);
        }
    };

    getSuggestedUsers();
}, []);

