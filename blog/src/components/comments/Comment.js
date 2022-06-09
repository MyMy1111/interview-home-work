import React from 'react'
import CommentList from './CommentList'

const Comment = ({ comment }) => {
	return (<div className="my-3 d-flex">

	<CommentList comment={comment} />
</div>
)
}

export default Comment