export const getAllOpinions = async () => {
    const response = await fetch(`http://localhost:4000/opinions`);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data.opinions;
};

export const getOpinion = async (id) => {
    const response = await fetch(`http://localhost:4000/opinions/${id}`);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};

export const registerUser = async (
    name,
    lastName,
    email,
    password,
    userName,
    gender,
    image
) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('lastName', lastName);
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('gender', gender);

    const response = await fetch(`http://localhost:4000/user`, {
        method: 'POST',
        body: formData,
    });

    const json = await response.json();
    if (json.status === 'Error') {
        throw new Error(json.message);
    }
    return json.message;
};

export const loginUser = async (email, password) => {
    const response = await fetch(`http://localhost:4000/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const json = await response.json();

    if (json.status === 'Error') {
        throw new Error(json.message);
    }
    return json.data.token;
};

export const getMyData = async ({ token }) => {
    const response = await fetch(`http://localhost:4000/user`, {
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (json.status === 'Error') {
        throw new Error(json.message);
    }
    return json.data.user;
};

export const getUser = async ({ id }) => {
    const response = await fetch(`http://localhost:4000/user/${id}`);

    const json = await response.json();

    if (json.status === 'Error') {
        throw new Error(json.message);
    }
    return json.data.user;
};

export const updateUser = async ({ token, email, password }) => {
    const response = await fetch(`http://localhost:4000/user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const json = await response.json();

    if (json.status === 'Error') {
        throw new Error(json.message);
    }
    return json;
};

export const createOpinion = async ({ token, text, title }) => {
    const response = await fetch(`http://localhost:4000/opinions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({
            text,
            title,
        }),
    });

    const json = await response.json();

    console.log(json);

    if (json.status === 'Error') {
        throw new Error(json.message);
    }
    return json.data;
};

export const deleteMyOpinion = async ({ token, id }) => {
    const response = await fetch(`http://localhost:4000/opinions/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (json.status === 'Error') {
        throw new Error(json.message);
    }
};

export const updateMyOpinion = async ({ token, id, text, title }) => {
    const response = await fetch(`http://localhost:4000/opinions/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({
            text,
            title,
        }),
    });

    const json = await response.json();

    if (json.status === 'Error') {
        throw new Error(json.message);
    }
};

export const addLike = async ({ token, id }) => {
    const response = await fetch(`http://localhost:4000/opinions/${id}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    });

    const json = await response.json();

    if (json.status === 'Error') {
        throw new Error(json.message);
    }

    return json;
};

export const disLike = async ({ token, id }) => {
    const response = await fetch(
        `http://localhost:4000/opinions/${id}/dislike`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        }
    );

    const json = await response.json();

    if (json.status === 'Error') {
        throw new Error(json.message);
    }
    return json;
};
