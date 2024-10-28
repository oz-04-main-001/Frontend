import React from 'react';
import Logo from './logo';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import usePopupStore from '../stores/usePopupStore'; 

export interface labels {
  title: string;
  link: string;
}

interface HeaderProps {
  labels?: labels[];
  color?: string;
  title?: string;
  border?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  labels = [],
  color = 'white',
  border = true,
}) => {
  const { usertype } = useAuthStore();
  const { openPopup } = usePopupStore();
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleLogoutClick = (event: React.MouseEvent) => {
    event.preventDefault(); // 기본 링크 클릭 이벤트 방지
    openPopup(); // 팝업 열기
    navigate('/user/logout'); // 로그아웃 페이지로 이동
  };

  const renderUserLinks = () => {
    switch (usertype) {
      case 'guest':
      case 'host':
        return (
          <>
            <span className="text-gray-600">
              <Link to="/mypage">마이페이지</Link>
            </span>
            <span
              className="text-gray-600 cursor-pointer"
              onClick={handleLogoutClick} // 로그아웃 클릭 시 팝업 열기
            >
              로그아웃
            </span>
          </>
        );
      default:
        return (
          <span className="text-gray-600">
            <Link to="/user/login">로그인</Link>
          </span>
        );
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
        {renderUserLinks()}
      </div>
    </header>
  );
};

export default Header;
