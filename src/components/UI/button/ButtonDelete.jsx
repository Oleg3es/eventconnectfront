import React from 'react'

const ButtonDelete = ({onRemove, index, ...props}) => {
    return (
        <button className="bg-[#5465ff] text-white px-4 py-2 cursor-pointer" {...props} onClick={() => onRemove(index)}>
            Удалить
        </button>
    )
}

export default ButtonDelete