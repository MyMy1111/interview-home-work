// Fetch Blogs
export const fetch_success = (blogs) => {
  return { type: 'blogs/fetch_success', payload: blogs }
}

export const fetch_error = (err) => {
  return { type: 'blogs/fetch_error', payload: err  }
}
