

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.lenght === 0) return 0

    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// 4.5*: Helper Functions and Unit Tests, step 3

const favoriteBlog = (blogs) => {
    if (blogs.lenght === 0) return null

    return blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}