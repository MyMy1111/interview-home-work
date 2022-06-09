import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
	name: {
		type: String,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add your password'],
    minLength: [6, 'Password must be at least 6 chars.'],
  },
	dob: {
		type: String,
	}
},{
	timestamps: true
})

const Users = mongoose.model('user', userSchema)

export default Users