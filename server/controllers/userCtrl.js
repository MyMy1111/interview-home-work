import Users from '../models/userModel.js'

const userCtrl = {
	register: async (req, res) => {
		try {
			const { name, username, password, dob } = req.body
			const user = await Users.findOne({username})
      if(user) return res.status(400).json({msg: 'Username already exists.'})

			const newUser = new Users({ name, username, password, dob })
			await newUser.save()

			return res.status(200).json(newUser)
		} catch (err) {
			return res.status(500).json({ msg: err.message })
		}
	}
}

export default userCtrl