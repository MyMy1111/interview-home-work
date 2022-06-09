import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'
import BlogCard from '../components/BlogCard'

const DetailBlog = () => {
  const id = useParams().id

  const [blog, setBlog] = useState()

  useEffect(() => {
    if(!id) return;

    axios.get(`blog/${id}`)
    .then(res => {
      setBlog(res.data)
    })
    .catch(err => {
      console.log(err.response.data.msg)
    })

    return () => setBlog(undefined)
  },[id])


  return (
    <div className="my-4">    
			<div>
			<h1 className="text-center my-3 text-capitalize fs-1"
						style={{ color: '#ff7a00' }}>
					{blog?.title}
			</h1>

			<div className='d-flex justify-content-between'>
					<div className='w-50 pt-3 pb-5'>
						<p>
							Author: 			
							<small className="text-muted ms-3">
									{blog?.user.username}
							</small>
						</p>

						<p>
							Created At: 			
							<small className="text-muted ms-3">
									{ new Date(blog?.createdAt).toLocaleString() }
							</small>
						</p>					
					</div>	
				</div>

			<p className="card-text">
				{
					blog?.content
				}
			</p>
			</div>
    </div>
  )
}

export default DetailBlog