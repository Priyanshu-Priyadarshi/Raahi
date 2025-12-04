import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
       
    }

    return (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 p-3 rounded-xl items-center my-2 justify-start bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-500'>
                        <div className='bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full shrink-0'>
                            <i className="ri-map-pin-fill text-base"></i>
                        </div>
                        <h4 className='font-medium text-gray-800 leading-tight'>{elem}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel