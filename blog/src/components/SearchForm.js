import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard'

const Search = () => {
	const [search, setSearch] = useState('')
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		if(!search) return;

		const delayDebounce = setTimeout(async () => {
      if(search.length < 2) return setBlogs([]);

      try {
        const res = await axios.get(`/blogs?search=${search}`)
        setBlogs(res.data.blogs)
      } catch (err) {
        console.log(err)
      }
    }, 400)

    return () => clearTimeout(delayDebounce)
	
	},[search])
 
	return (
		<div className='search w-100 position-relative me-4'>
			<input type='text' className='form-control me-2 w-100 my-2'
			 placeholder='Enter your search...' value={search}
			 onChange={e => setSearch(e.target.value)} />

{
        search.length >= 2 &&
        <div className="position-absolute pt-2 px-1 w-100 rounded"
        style={{
          background: '#eee', zIndex: 10,
          maxHeight: 'calc(100vh - 100px)',
          overflow: 'auto'
        }}>
          {
            blogs.length
            ? blogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))
            : <h3 className="text-center">No Blogs</h3>
          }
        </div>
      }
		</div>
	)
}

export default Search