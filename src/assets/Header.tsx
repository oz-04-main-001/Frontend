import React, { useEffect } from 'react';
import Logo from './logo';
import { Link } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

export interface labels {
  title: string;
  link: string;
}
interface HeaderProps {
  labels?: labels[];
  color?: string;
  title?: string;
  border?: boolean;
  onClick?: (link: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  labels = [],
  color = 'white',
  border = true,
}) => {
  const { usertype } = useAuthStore();

  const userTypeLabelText = (): labels => {
    switch (usertype) {
      case 'guest':
        return { title: '마이페이지', link: '/mypage' };
      case 'host':
        return { title: '로그아웃', link: '/user/logout' };
      default:
        return { title: '로그인', link: '/user/login' };
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 flex items-center justify-between w-full p-2 px-16 ${border ? 'border-b border-gray-100' : undefined}`}
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
        <span>
          <Link to={userTypeLabelText().link}>{userTypeLabelText().title}</Link>
        </span>
      </div>
    </header>
  );
};

export default Header;
