import React from 'react'

const StatCard = ({ label, count, color, icon }) => {
    return (
        <div className={`relative ${color} text-white rounded-lg p-10 shadow-md transition-transform hover:scale-[1.02]`}>
            {icon}
            <div className="absolute bottom-4 right-4 text-right">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm italic">{label}</div>
            </div>
        </div>
    )
}

export default StatCard