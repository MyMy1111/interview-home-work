import Blogs from '../models/blogModel.js'
import Users from '../models/userModel.js'
import Comments from '../models/commentModel.js'
import mongoose from 'mongoose'

const commentCtrl = {
	getComments: async (req, res) => {
		const page = req.query.page * 1 || 1
		const limit = req.query.limit * 1 || 5
		const skip = limit * (page - 1)

		try {
      const data = await Comments.aggregate([
        {
          $facet: {
            totalData:[
              { $match: {
                blog_id: mongoose.Types.ObjectId(req.params.id)
              }},
              {
                $lookup: {
                  "from": "users",
                  "localField": "user",
                  "foreignField": "_id",
                  "as": "user"
                }
              },
              { $unwind: "$user" },
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit }
            ],
            totalCount: [
              { $match: {
                blog_id: mongoose.Types.ObjectId(req.params.id)
              }},
              { $count: 'count' }
            ]
          }
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1
          }
        }
      ])

			const comments = data[0].totalData;
      const count = data[0].count;

		
			let total = 0;

      if(count % limit === 0){
        total = count / limit;
      }else{
        total = Math.floor(count / limit) + 1;
      }

      return res.json({ comments, total, count })
		} catch (err) {
			return res.status(500).json({ msg: err.message })
		}
	},
	addComment: async (req, res) => {
		try {
			const {user, content,	blog_id,	blog_user_id } = req.body

			const newComment = new Comments({
				user,
				content,
				blog_id,
				blog_user_id
			})

			await newComment.save()

			return res.json(newComment)
		} catch (err) {
			return res.status(500).json({ msg: err.message })
		}
	}
}

export default commentCtrl