const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

const pingServer = async () => {
    const response = await fetch(`${REMOTE_SERVER}/health`, {
        method: "GET",
    });

    return response;
};

const getLoginAuthUrl = () => {
    return `${REMOTE_SERVER}/auth/login`;
};

export const userLogin = async () => {
    try {
        const response = await pingServer();
        if (response.ok) {
            window.location.href = getLoginAuthUrl();
        } else {
            console.error('Server is not live', response.status);
            alert('Server is currently unavailable. Please try again later.');
        }
    } catch (error) {
        console.error('Error checking server status:', error);
        alert('Server is currently unavailable. Please try again later.');
    }
}

export const getUserProfile = async () => {
    const response = await fetch(`${REMOTE_SERVER}/user/profile`, {
        method: 'GET',
        credentials: 'include'
    });

    return response;
}