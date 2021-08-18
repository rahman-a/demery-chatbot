import React from 'react'

const Select = ({width, height, className, toggleHandler}) => {
    return (
      <svg id="Capa_1"
      onClick={toggleHandler} 
      enableBackground="new 0 0 546.551 546.551" 
      height={width}
      viewBox="0 0 546.551 546.551" 
      width={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg">
        <path d="m273.283 512.39c-6.105 0-11.743-3.253-14.796-8.54l-256.198-444.068c-3.053-5.288-3.053-11.793 0-17.081s8.691-8.54 14.796-8.54h512.38c6.105 0 11.743 3.253 14.796 8.54 3.052 5.288 3.052 11.793 0 17.081l-256.181 444.068c-3.053 5.288-8.691 8.54-14.797 8.54zm-226.623-444.068 226.624 392.809 226.606-392.809z"/>
      </svg>
    )
}

export default Select
