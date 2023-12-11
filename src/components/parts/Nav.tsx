import React from 'react'

const Nav: React.FC = () => {
	return (
		<div className='absolute top-0  w-full  bg-transparent  z-10'>
			<nav className='max-w-4x1 mx-auto'>
				<ul className='flex justify-around  list-none text-white'>
					<li className='p-4'>About </li>
					<li className='p-4'>Projects</li>
					<li className='p-4'>Contact</li>
				</ul>

			</nav>

		</div>
	)
}

export default Main