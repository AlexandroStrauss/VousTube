export const createLike = (value, likeable_id, likeable_type) => {
    return $.ajax({
        method: 'POST',
        url: `api/${likeable_type}s/${likeable_id}/likes`,
        data: {
            like: {
                value,
                likeable_id,
                likeable_type
            }
        },
    })
}

export const updateLike = (value, likeable_id, likeable_type, id) => {
    return $.ajax({
        method: 'PATCH',
        url: `api/${likeable_type}s/${likeable_id}/likes/${id}`,
        data: {
            like: {
                value,
                likeable_id,
                likeable_type
            }
        },
    })
}

export const deleteLike = (likeable_type, likeable_id, id) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/${likeable_type}s/${likeable_id}/likes/${id}`
    })
}

export const fetchLikes = (likeable_id, likeable_type) => {
    return $.ajax({
        method: 'GET',
        url: `api/${likeable_type}s/${likeable_id}/likes`
    })

}