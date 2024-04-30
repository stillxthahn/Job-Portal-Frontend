import React from 'react'
interface ApplyFormProps {
	idJob: number
	idCompany: number
	onClose: () => void
	isOpen: boolean
}

const ApplyForm = ({ idJob, idCompany, onClose, isOpen }: ApplyFormProps) => {
	return (
		<div className={`${isOpen ? 'fixed h-4/5 w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40' : 'hidden'}`}>
			<form className='w-full h-full bg-gray-600 mx-auto my-auto' action="">
				<div className='flex'>
					<button type='submit'>Submit</button>
					<button type='button' onClick={onClose}>Submit</button>
				</div>
			</form>
		</div>

	)
}

export default ApplyForm