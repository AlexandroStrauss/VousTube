export const fetchVideos = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/videos'
    })
};

export const fetchVideo = id => {
    debugger
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

export const createComment = ({ body, video_id, parent_comment_id}) => {
    return $.ajax({
        method: 'POST',
        url: `api/videos/${video_id}/comments`,
        data: {
            comment: {
                body: body,
                video_id: video_id,
                parent_comment_id: parent_comment_id
            }
        },
    })
}