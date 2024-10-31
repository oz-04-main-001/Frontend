import React from 'react';

interface SVGIconProps {
    width?: string;
    height?: string;
    color?: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({ width = '32', height = '32', color = '#292C33' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M16.1204 30.3209C23.9631 30.3209 30.3209 23.9631 30.3209 16.1204C30.3209 8.27769 23.9631 1.91992 16.1204 1.91992C8.27769 1.91992 1.91992 8.27769 1.91992 16.1204C1.91992 23.9631 8.27769 30.3209 16.1204 30.3209Z" stroke={color} strokeWidth="0.96" strokeMiterlimit="10" />
            <path d="M16.1204 30.3209C23.9631 30.3209 30.3209 23.9631 30.3209 16.1204C30.3209 8.27769 23.9631 1.91992 16.1204 1.91992C8.27769 1.91992 1.91992 8.27769 1.91992 16.1204C1.91992 23.9631 8.27769 30.3209 16.1204 30.3209Z" stroke="black" strokeOpacity="0.2" strokeWidth="0.96" strokeMiterlimit="10" />
            <path d="M6.58008 13.1816L15.3697 6.65491C15.817 6.32304 16.4278 6.32304 16.8751 6.65491L25.6383 13.1792" stroke={color} strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M6.58008 13.1816L15.3697 6.65491C15.817 6.32304 16.4278 6.32304 16.8751 6.65491L25.6383 13.1792" stroke="black" strokeOpacity="0.2" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M22.5195 10.8587V7.00854" stroke={color} strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M22.5195 10.8587V7.00854" stroke="black" strokeOpacity="0.2" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M14.3356 12.1477H14.7372C14.9729 12.1477 15.1629 12.3377 15.1629 12.5734V13.1866C15.1629 13.4367 14.9609 13.6387 14.7108 13.6387H14.0975C13.8619 13.6387 13.6719 13.4487 13.6719 13.213V12.8114C13.6719 12.4459 13.9701 12.1477 14.3356 12.1477Z" stroke={color} strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M14.3356 12.1477H14.7372C14.9729 12.1477 15.1629 12.3377 15.1629 12.5734V13.1866C15.1629 13.4367 14.9609 13.6387 14.7108 13.6387H14.0975C13.8619 13.6387 13.6719 13.4487 13.6719 13.213V12.8114C13.6719 12.4459 13.9701 12.1477 14.3356 12.1477Z" stroke="black" strokeOpacity="0.2" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M18.1427 13.6387H17.5295C17.2794 13.6387 17.0774 13.4367 17.0774 13.1866V12.5733C17.0774 12.3377 17.2674 12.1477 17.503 12.1477H17.9046C18.2702 12.1477 18.5684 12.4459 18.5684 12.8114V13.213C18.5684 13.4487 18.3784 13.6387 18.1427 13.6387Z" stroke={color} strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M18.1427 13.6387H17.5295C17.2794 13.6387 17.0774 13.4367 17.0774 13.1866V12.5733C17.0774 12.3377 17.2674 12.1477 17.503 12.1477H17.9046C18.2702 12.1477 18.5684 12.4459 18.5684 12.8114V13.213C18.5684 13.4487 18.3784 13.6387 18.1427 13.6387Z" stroke="black" strokeOpacity="0.2" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M14.1014 15.0815H14.7147C14.9648 15.0815 15.1668 15.2835 15.1668 15.5336V16.1469C15.1668 16.3826 14.9768 16.5725 14.7411 16.5725H14.3395C13.974 16.5725 13.6758 16.2743 13.6758 15.9088V15.5072C13.6758 15.2715 13.8658 15.0815 14.1014 15.0815Z" stroke={color} strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M14.1014 15.0815H14.7147C14.9648 15.0815 15.1668 15.2835 15.1668 15.5336V16.1469C15.1668 16.3826 14.9768 16.5725 14.7411 16.5725H14.3395C13.974 16.5725 13.6758 16.2743 13.6758 15.9088V15.5072C13.6758 15.2715 13.8658 15.0815 14.1014 15.0815Z" stroke="black" strokeOpacity="0.2" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M17.9046 16.5725H17.503C17.2674 16.5725 17.0774 16.3825 17.0774 16.1469V15.5336C17.0774 15.2835 17.2794 15.0815 17.5295 15.0815H18.1427C18.3784 15.0815 18.5684 15.2715 18.5684 15.5072V15.9088C18.5684 16.2743 18.2702 16.5725 17.9046 16.5725Z" stroke={color} strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M17.9046 16.5725H17.503C17.2674 16.5725 17.0774 16.3825 17.0774 16.1469V15.5336C17.0774 15.2835 17.2794 15.0815 17.5295 15.0815H18.1427C18.3784 15.0815 18.5684 15.2715 18.5684 15.5072V15.9088C18.5684 16.2743 18.2702 16.5725 17.9046 16.5725Z" stroke="black" strokeOpacity="0.2" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M24.209 16.0964C24.209 22.2456 19.2238 27.2332 13.0723 27.2332C6.92074 27.2332 1.93555 22.2456 1.93555 16.0964" stroke={color} strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M24.209 16.0964C24.209 22.2456 19.2238 27.2332 13.0723 27.2332C6.92074 27.2332 1.93555 22.2456 1.93555 16.0964" stroke="black" strokeOpacity="0.2" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M27.2554 17.4673C27.2554 23.6164 22.2702 28.604 16.1187 28.604C9.96717 28.604 4.98438 23.6188 4.98438 17.4673" stroke={color} strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M27.2554 17.4673C27.2554 23.6164 22.2702 28.604 16.1187 28.604C9.96717 28.604 4.98438 23.6188 4.98438 17.4673" stroke="black" strokeOpacity="0.2" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M30.3203 16.0964C30.3203 22.2456 25.3351 27.2332 19.1836 27.2332C13.0321 27.2332 8.04688 22.248 8.04688 16.0964" stroke={color} strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M30.3203 16.0964C30.3203 22.2456 25.3351 27.2332 19.1836 27.2332C13.0321 27.2332 8.04688 22.248 8.04688 16.0964" stroke="black" strokeOpacity="0.2" strokeWidth="0.96" strokeMiterlimit="10" strokeLinecap="round" />
        </svg>

    );
};

export default SVGIcon;
