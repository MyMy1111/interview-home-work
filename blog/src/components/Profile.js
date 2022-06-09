import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
	// eslint-disable-next-line
	const [user, setUser] = useState({	
		username: "meowmeow",
		name: "Cat face",
		dob: "01/06/2016"
	})

	return (
		<ul className="navbar-nav ms-auto">
			<li className="nav-item dropdown">
					<span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					 <img src='https://res.cloudinary.com/mymy1111/image/upload/v1629968718/blogAnimal/aeisfgqc5ahksmqvsq1t.jpg'  alt='avatar' className='avatar'
					/> {user.username}
					</span>

					<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link className="dropdown-item" to="/">Logout</Link></li>
        </ul>
			</li>
		</ul>
	)
}

export default Profile