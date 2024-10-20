import React from 'react';
import Logo from './logo';
import { Link } from 'react-router-dom';

export interface labels {
    title: string;
    link: string;
}
interface HeaderProps {
    labels?: labels[];
    color?: string;
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ labels = [], color = 'white' }) => {
    return (
        <header
            className="fixed top-0 left-0 z-50 flex items-center justify-between w-full p-2 px-16 border-b border-gray-100"
            style={{ backgroundColor: color }}
        >
            <Link to="/">
                <div className="flex items-center">
                    <Logo width="40px" height="40px" />
                </div>
            </Link>

            <div className="flex space-x-12">
                {labels.map((label, index) => (
                    <span key={index} className="text-gray-600">
                        <Link to={label.link}>{label.title}</Link>
                    </span>
                ))}
            </div>
        </header>
    );
};

export default Header;
