const formatDate = () => {
    const date = new Date(Date.now())
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    return `${year}-${month + 1}-${day}`
}

export default formatDate