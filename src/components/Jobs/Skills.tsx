import React, { FC } from 'react'


interface SkillsProps{
    skills:string[]
}
const Skills:FC<SkillsProps> = ({skills}) => {
  return (
    <>
    <div className="skills mt-7">
        <div className="header mb-3">
            <span className='font-medium text-lg'>Skills :-</span>
        </div>
        {
            skills.map((skill,index)=>(<li key={index}>{skill}</li>))
        }
    </div>
    </>
  )
}

export default Skills