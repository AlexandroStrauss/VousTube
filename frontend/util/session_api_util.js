export const signup =({username, email, password}) => {
    return $.ajax({
        method: 'POST',
        url: '/api/users',
        data: {
            user: {
                username, 
                email, 
                password
            }
        }
    })
}

export const login =({identifier, password}) => {
    return $.ajax({
        method: 'POST',
        url: '/api/session',
        data: {
            user: {
                identifier,
                password
            }
        }
    })
}

export const logout = () => {
    return $.ajax({
        method: 'DELETE',
        url: '/api/session'
    })
}

export const check = identifier => {
    return $.ajax({
        method: 'POST',
        url: '/session',
        data: {
            user: {
                identifier
            }
        }
    })
}