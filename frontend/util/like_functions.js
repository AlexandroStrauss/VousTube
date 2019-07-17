export const commentLikeValue = likes => {
    var sum = 0; 
    if(likes) {
        Object.values(likes).forEach(like => {
            if (like.value === 1 && like.likeable_type === "Comment") {sum += like.value;}
        })
    }
    if (sum > 0) {return sum} 
    else {return ""}
}

export const videoLikeValue = likes => {
    var totalLikes = 0;
    var likeTotal = 0;
    var dislikeTotal = 0;
    if (likes) {
        Object.values(likes).forEach(like => {
            if (like.likeable_type === "Video") {
                totalLikes += 1;
                if (like.value === 1) {
                    likeTotal += like.value
                } else if (like.value === -1) {
                    dislikeTotal -= like.value
                }
            }
        })
    }
    return {totalLikes: totalLikes, upvotes: likeTotal, downvotes: dislikeTotal}
}
