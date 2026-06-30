

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

// 4.6*: Helper Functions and Unit Tests, step 4

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  
  const authorCounts = {}

  blogs.forEach(blog => {
    authorCounts[blog.author] = (authorCounts[blog.author] || 0) + 1
  })


  let topAuthor = { author: '', blogs: 0 }
  
  for (const author in authorCounts) {
    if (authorCounts[author] > topAuthor.blogs) {
      topAuthor = { author: author, blogs: authorCounts[author] }
    }
  }

  return topAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}