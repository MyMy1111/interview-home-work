import React, { useState, useEffect, useMemo } from 'react'
import Spinner from '../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import BlogCard from '../components/BlogCard'
import axios from 'axios'
import Pagination from '../components/Pagination'
import { useLocation } from 'react-router-dom'
import { fetch_success } from '../redux/actions/blogAction'

const Home = () => {
	const [blogs, setBlogs] = useState({})
	const [limit, setLimit] = useState(5)
	const [page, setPage] = useState(1)

	const dispatch = useDispatch()
	const { data: blogsRedux, count } = useSelector(state => state.blogReducer)
	const { search } = useLocation()
	// console.log({blogsRedux, count})

  useEffect(() => {
		const pageAndLimit = {page, limit}
		dispatch({type:'blogs/fetch_request', payload: pageAndLimit})
		axios.get(`/blogs?page=${page}&limit=${limit}`)
		.then(res => 
			setBlogs(res.data)
			)
		
  }, [page, limit, dispatch])

	const totalPages = useMemo(() => {
    if(!blogs?.count) return 0;

    return Math.ceil(blogs?.count / limit)
  }, [blogs?.count, limit])
	
	useEffect(() => {
    const page = new URLSearchParams(search).get('page') || 1;
    setPage(Number(page))
  }, [search])

	return (
		<div>
			<div className='home_blogs'>
					{
						blogs?.blogs?.map(blog => (
							<BlogCard key={blog._id} blog={blog} />
						))
					}
					{/* {
						blogsRedux?.map(blog => (
							<BlogCard key={blog._id} blog={blog} />
						))
					} */}
			</div>
			<Pagination totalPages={totalPages} page={page} />			
			{/* { loading && <Spinner /> } */}
		</div>
	)
}

export default Home