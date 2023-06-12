import React from 'react'

const SubClubCard = (props) => {
  
  // console.log(props)

  const {
    name,
    description,
    image,
    url
  } = props;

  return (
    <div className="subclub-item">
      <a href={url} target="_blank"><img src={image} alt=""/></a>
      <h3><a className="remove-underline" href={url} target="_blank">{name}</a></h3>
      <p>{description}</p>
    </div>
  )
}

export default SubClubCard