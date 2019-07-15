export const createLike = ({value, likeable_type, likeable_id}) => {
    return $.ajax({
        method: 'POST',
        url: `api/${likeable_type.toLowerCase()}s/${likeable_id}/likes`,
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
        url: `api/${likeable_type.toLowerCase()}s/${likeable_id}/likes/${id}`,
        data: {
            like: {
                value,
                likeable_id,
                likeable_type
            }
        },
    })
}

export const deleteLike = like => {
    return $.ajax({
        method: 'DELETE',
        url: `api/${like.likeable_type.toLowerCase()}s/${like.likeable_id}/likes/${like.id}`
    })
}

export const fetchLikes = (likeable_type, likeable_id) => {
    return $.ajax({
        method: 'GET',
        url: `api/${likeable_type.toLowerCase()}s/${likeable_id}/likes`
    })

}