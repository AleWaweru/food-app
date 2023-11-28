import React from 'react'

const SectionMenu = ({subHeader, mainHeader}) => {
  return (
    <>
     <h3 className="uppercase text-gray-500 font-semibold leading-4">
          {subHeader}
        </h3>
        <h2 className="text-primary font-semibold italic text-4xl">{mainHeader}</h2>
    </>
  )
}

export default SectionMenu;