const videoAge = (secondsOld) => {
    if (secondsOld < 60) {
        return "Less than a minute ago"
    } else if (secondsOld < 3600) {
        var minutes = Math.floor(secondsOld / 60)
        return (minutes + (minutes === 1 ? " minute ago" : " minutes ago"))
    } else if (secondsOld < 86400) {
        var hours = Math.floor(secondsOld / 3600)
        return (hours + (hours === 1 ? " hour ago" : " hours ago"))
    } else if (secondsOld < 604800) {
        var days = Math.floor(secondsOld / 86400)
        return (days + (days === 1 ? " day ago" : " days ago"))
    } else if (secondsOld < 2678400) {
        var weeks = Math.floor(secondsOld / 604800)
        return (weeks + (weeks === 1 ? " week ago" : " weeks ago"))
    } else if (secondsOld < 31557600) {
        var months = Math.floor(secondsOld /2678400)
        return (months + (months === 1 ? " month ago" : " months ago"))
    }
    else {
        var years = Math.floor(secondsOld / 31557600)
        return (years + (years === 1 ? "year ago" : "years ago"))
    }
}

export default videoAge