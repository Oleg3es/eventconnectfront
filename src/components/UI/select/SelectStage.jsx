import React from 'react'

const SelectStage = ({ option, value, onChange, defaultValue }) => {
    console.log(option)
    return (
        <div>
            <select
                name=""
                id=""
                value={value}
                onChange={event => onChange(event.target.value)}
                className="p-2 border-2 border-black w-full"
            >
                {!value && <option value="">{defaultValue}</option>}
                {option.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectStage