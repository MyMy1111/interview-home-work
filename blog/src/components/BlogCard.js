import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link} from 'react-router-dom'
import axios from 'axios'
import Comment from './comments/Comment'


const BlogCard = ({ blog }) => {
	const [comments, setComments] = useState([])
	// eslint-disable-next-line
	const [limit, setLimit] = useState(5)
	const [page, setPage] = useState(1)
	const [stop, setStop] = useState(false)
	const [count, setCount] = useState(0)
	const [toggle, setToggle] = useState(false)

	const btnRef = useRef()

	const fetchComments = useCallback(async(id) => {
    
    axios.get(`/comments/blog/${id}?page=${page}&limit=${limit}`)
  	.then(res => {
			if(res?.data?.comments) {
				setComments(prev => [...prev, ...res.data.comments])
				setCount(res.data?.count)
			
				if(res.data?.comments.length < limit) setStop(true)
			}
		})	 
  },[limit, page])

	useEffect(() => {
    if(!blog?._id) return;
    fetchComments(blog._id)
  },[blog?._id, fetchComments])

	const handleLoadMore = useCallback(() => {
		if(stop) return;
		setPage(prev => prev + 1)
	}, [stop])

	useEffect(() => {
		const btn = btnRef.current

		const observer = new IntersectionObserver(entries => {
			if(entries[0].isIntersecting) {
				handleLoadMore()
			}
		})

		if(btn) observer.observe(btn)

		return () => {
			observer.unobserve(btn)
		}
	}, [btnRef, handleLoadMore])
	

	return (
    <div className="card">
      
      <div className="card-body ">
        <h1 className="card-title ">
          <Link to={`/blog/${blog._id}`}>
            {blog.title}
          </Link>
        </h1>

				<div className='d-flex justify-content-between'>
					<div className='w-50 pt-3 pb-5'>
						<p>
							Author: 			
							<small className="text-muted ms-3">
									{blog.user.username}
							</small>
						</p>

						<p>
							Created At: 			
							<small className="text-muted ms-3">
									{ new Date(blog.createdAt).toLocaleString() }
							</small>
						</p>
					</div>
					
					<div className='pt-3 pb-3' style={{'width': '350px'}}> 
					<button type="button" className="btn btn-outline-primary me-2 mb-2">Primary</button>
					<button type="button" className="btn btn-outline-secondary me-2 mb-2">Secondary</button>
					<button type="button" className="btn btn-outline-success me-2 mb-2">Success</button>
					<button type="button" className="btn btn-outline-danger me-2 mb-2">Danger</button>
					<button type="button" className="btn btn-outline-warning me-2 mb-2">Warning</button>
					<button type="button" className="btn btn-outline-info me-2 mb-2">Info</button>
					<button type="button" className="btn btn-outline-light me-2 mb-2">Light</button>
					<button type="button" className="btn btn-outline-dark me-2 mb-2">Dark</button>
					</div>
				</div>

        <p className="card-text">
          {
						blog.content.slice(0, 500) + '...'
					}
          
        </p>

				<div>
					<div className='d-flex justify-content-between'>
						<div>
							Comments: 			
							<small className="text-muted ms-3">
									{count > 0 ? count : 0}
							</small>
						</div>					
						<button type="button" className="btn btn-info" style={{'width': '150px'}}
						onClick={() => setToggle(prev => !prev)}>Toggle Comments</button>
					</div>
					
					{
						toggle && comments?.map(comment => (
							<Comment key={comment._id} comment={comment} />
						))
					}

				<div id='button'>
					<button style={{'width': '100%'}}			
							onClick={() => setPage(prev => prev + 1)}
							disabled={stop} ref={btnRef}
						>More comment
					</button>
				</div>
				</div>
      </div>
    </div>
  )
}


export default BlogCard