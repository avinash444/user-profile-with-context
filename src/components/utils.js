const compareFunction = (key) => {
    return (a,b) => {
        if(a[key].toLowerCase() < b[key].toLowerCase()) return -1;
        if(a[key].toLowerCase() > b[key].toLowerCase()) return 1;
        return 0
    }
}

export const sortData = (data, sortBy) => {
    switch (sortBy.trim().toLowerCase()) {
        case 'name': {
            return data.sort(compareFunction('name'))
        }
        case 'username': {
            return data.sort(compareFunction('username'))
        }
        case 'email': {
            return data.sort(compareFunction('email'))
        }
    }
}