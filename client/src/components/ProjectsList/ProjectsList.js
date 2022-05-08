import React from 'react'
import { Link } from 'react-router-dom'

const ProjectsList = ({ projects }) => {

  if (!projects.length) return <p>Проектов пока нет</p>

  return (
    <>
        <h2>Проекты</h2>
        
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Название</th>
              <th>Описание</th>
              <th>Детали проекта</th>
            </tr>
          </thead>

          <tbody>
            {
              projects.map((project, index) => {
                return(
                  <tr key={ project._id } >
                    <td>{ index + 1 }</td>
                    <td>{ project.name }</td>
                    <td>{ project.description }</td>
                    <td><Link to={`/detail/${project._id}`}>Открыть</Link></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
    </>
  )
}

export default ProjectsList