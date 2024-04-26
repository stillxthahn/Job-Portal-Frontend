import React from 'react'
import { Job } from '../../interface/interface'
interface JobsProps {
    props: Job[]
}

const JobCard = ({ props }: JobsProps) => {
    console.log(props)
    return (
        <div>JobCard</div>
    )
}

export default JobCard