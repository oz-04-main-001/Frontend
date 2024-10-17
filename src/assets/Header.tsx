import React from 'react';
import Logo from './logo'; 

interface HeaderProps {
    labels?: string[];   
    color?: string;        
}

const Header: React.FC<HeaderProps> = ({ labels = [], color = 'white' }) => {
    return (
        <header
            className="fixed top-0 left-0 flex items-center justify-between w-full p-2 border-b border-gray-100"
            style={{ backgroundColor: color }}  
        >
            <div className="flex items-center">
                <Logo width='40px' height='40px'/>
            </div>

            <div className="flex space-x-12">
                {labels.map((label, index) => (
                    <span key={index} className="text-gray-600">{label}</span>
                ))}
            </div>
        </header>
    );
};

export default Header;
