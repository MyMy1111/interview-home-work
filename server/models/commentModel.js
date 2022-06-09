import mongoose from "mongoose"


const commentSchema = new mongoose.Schema({
	user: { type: mongoose.Types.ObjectId, ref: 'user' },
	blog_id: mongoose.Types.ObjectId,
	blog_user_id: mongoose.Types.ObjectId,
	content: { type: String, required: true },
}, {
	timestamps: true
})


const Comments = mongoose.model('comment', commentSchema)

export default Comments