import Blogs from '../models/blogModel.js'
import Users from '../models/userModel.js'

const blogCtrl = {
	getBlogs: async (req, res) => {
		try {
			const page = req.query.page * 1 || 1
			const limit = req.query.limit * 1 || 5
			const skip = limit * (page - 1)
			const search = req.query.search
			let blogs 
			if(search){
				blogs = await	Blogs.find({$text: { $search: search }})	
			}else{
				blogs = await Blogs.find().limit(limit).skip(skip).populate('user', '-password')			
			}
			const result = await Promise.allSettled([
        blogs,
        Blogs.countDocuments() 
      ])

			blogs = result[0].status === 'fulfilled' ? result[0].value : [];
      const count = result[1].status === 'fulfilled' ? result[1].value : 0;
			return res.status(200).json({ blogs, count})			
		} catch (err) {
			return res.status(500).json({ msg: err.message })
		}
	},
	getBlog: async (req, res) => {
		try {
			const blog = await Blogs.findById(req.params.id).populate('user', '-password')		

			if(!blog) 
				return res.status(404).json({ msg: 'This blog does not exist!' })

			return res.status(200).json(blog)
		} catch (err) {
			return res.status(500).json({ msg: err.message })
		}
	},
	addBlog: async (req, res) => {
		try {
			const { user, title, content } = req.body

			// const _id = req.header('_id')
			// if(!_id) return res.status(400).json({msg: 'please add user to header'})
			// const user = await Users.findOne({_id})
			// req.user = user

			const newBlog = new Blogs({
				user,
				title,
				content
			})
			await newBlog.save()

			return res.status(200).json(newBlog)
		} catch (err) {
			return res.status(500).json({ msg: err.message })
		}
	}
}

export default blogCtrl