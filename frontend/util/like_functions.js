import { updateLike, createLike, deleteLike } from "../actions/like_actions";

export const likeSplitter = (newLike, oldLike) => {
    debugger
    if (oldLike && newLike.value === oldLike.value) {
        debugger
        deleteLike(oldLike.id)
    } 
    else if (oldLike) {
        debugger
        updateLike(oldLike.id)
    }
    else {
        debugger
        createLike(newLike)
    }
}

export const likedOrDisliked = like => {
    if (like.value === 1) {
        return 'liked'
    } else {
        return 'disliked'
    }
}

export const commentLikeValue = likes => {
    var sum = 0; 
    likes.forEach(like => {
        sum += like.value;
    })
    if (sum > 0) {return sum} 
    else {return null}
}

export const videoLikeValue = likes => {
    var totalLikes = 0;
    var likeTotal = 0;
    var dislikeTotal = 0;
    likes.forEach(like => {
        sum += like.value;
        if (like.value === 1) {
            likeTotal += like.value
        } else if (like.value === -1) {
            dislikeTotal += like.value
        }
    })
    return {totalLikes: totalLikes, upvotes: likeTotal, downvotes: dislikeTotal}
}
