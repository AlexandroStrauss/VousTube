export const fetchVideos = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/videos'
    })
};

export const fetchVideo = (id) => {
    return $.ajax({
        method: 'GET',
        url: `/api/videos/${id}`
    })
};

export const createVideo = formData => {
    return $.ajax({
        method: 'POST',
        url: `/api/videos/${id}`,
        data: {
            formData
        },
        contentType: false,
        processData: false
    })
};