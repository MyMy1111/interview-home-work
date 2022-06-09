import React from 'react'

const CommentList = ({comment}) => {
	
	return (
    <div className="w-100">
      <div className="comment_box ">
			<div className='d-flex '>			
				<h5>Username: </h5>
				<span className='ps-3 dt'>       
						{comment.user.username}
				</span>
	
			</div>

        <div className="p-2">
						{comment.content}
				</div>

        <div className="d-flex justify-content-between p-2">
          <small style={{cursor: 'pointer'}}>
            - Reply -
          </small>

          <small>
            { new Date(comment.createdAt).toLocaleString() }
          </small>
        </div>

      </div>
      
    </div>
  )
}

export default CommentList