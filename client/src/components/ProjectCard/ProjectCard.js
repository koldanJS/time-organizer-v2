import React from 'react'

const ProjectCard = ({ project, deleteHandler }) => {

  return (
    <>
        <h2>Проект</h2>
        
        <p>Название: { project.name }</p>
        <p>Описание: { project.description }</p>
        {/* <p>Задачи: <strong >{ link.clicks }</strong></p> */}
        <p>Удалить: <button onClick={ () => deleteHandler(project._id) } >Удалить проект</button></p>
    </>
  )
}

export default ProjectCard