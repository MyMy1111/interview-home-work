import mongoose from "mongoose"


const blogSchema = new mongoose.Schema({
	user: { type: mongoose.Types.ObjectId, ref: 'user' },
	title: {
		type: String,
		require: true,
		trim: true,
	},
	content: {
		type: String,
		require: true,
		trim: true,
	},

},{
	timestamps: true
})

blogSchema.index({title: 'text'})

const Blogs = mongoose.model('blog', blogSchema)

Blogs.createIndexes({title: 'text'})

export default Blogs