import * as LikeActions from "../util/like_actions";

export default likeSplitter = (newLike, oldLike) => {
    if (oldLike && newLike.value === oldLike.value) {
        LikeActions.deleteLike(oldLike)
    } 
    else if (oldLike) {
        LikeActions.updateLike(newLike)
    }
    else {
        LikeActions.createLike(newLike)
    }
}

export default likedOrDisliked = like => {
    if (like.value === 1) {
        return 'liked'
    } else {
        return 'disliked'
    }
}

export default commentLikeValue = likes => {
    var sum = 0; 
    likes.forEach(like => {
        sum += like.value;
    })
    if (sum > 0) {return sum} 
    else {return null}
}

export default videoLikeValue = likes => {
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
