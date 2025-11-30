import './Layout.css';
import '../styles/index.scss';
import './tailwind.css';

import logoUrl from '../assets/images/logo.svg';
import FooterLogo from '../assets/images/footer_logo.svg';
import {Link} from '../components/Link';
import PopupComponent from '../components/popup/Popup';
import {useEffect, useState} from 'react';
import {ToastContainer} from '../components/toast/ToastContainer';

export function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
}

export function useTokenExpireRedirect() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = parseJwt(token);
    if (!payload?.exp) return;

    const now = Math.floor(Date.now() / 1000);
    const expiresIn = payload.exp - now;

    // 55분 = 3300초
    const logoutTime = expiresIn - 60 * 5; // 만료 5분 전 → 조절 가능
    if (logoutTime <= 0) {
      redirectToLogin();
      return;
    }

    const timer = setTimeout(() => {
      redirectToLogin();
    }, logoutTime * 1000);

    return () => clearTimeout(timer);
  }, []);
}

function redirectToLogin() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('name');
  window.location.href = '/login';
}

export default function Layout({children}: {children: React.ReactNode}) {
  useTokenExpireRedirect();
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
      <PopupComponent />
      <ToastContainer />
    </>
  );
}

/** ================= Header ================= */

function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string | null>(null);

  // 클라이언트에서만 localStorage 접근
  useEffect(() => {
    setName(localStorage.getItem('name'));
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => name && setOpen(true)}
      onMouseLeave={() => name && setOpen(false)}
    >
      {/* 이름 또는 로그인 링크 */}
      {name ? <strong className="font-normal cursor-pointer">{name}님</strong> : <Link href="/login">로그인</Link>}

      {/* 드롭다운 */}
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-white p-2 pt-4 border border-gray-200 rounded-md shadow-md z-10">
          {/* 말풍선 삼각형 */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200"
            aria-hidden
          ></div>

          <ul className="flex flex-col justify-center items-center">
            <li className="w-full">
              <a href="/my" className="inline-block px-2 py-2.5 w-full text-center hover:bg-[#F8E8EE] rounded">
                마이페이지
              </a>
            </li>
            <li className="w-full">
              <a href="#" className="inline-block px-2 py-2.5 w-full text-center hover:bg-[#F8E8EE] rounded">
                로그아웃
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <div id="header" className="fixed top-0 w-full bg-white box-border border-b border-b-gray-200 z-10">
      <header className="flex shrink-0 items-center justify-between container h-20">
        <div className="flex items-center gap-32">
          <Logo />
          <Link href="/party">파티</Link>
        </div>

        <UserDropdown />
      </header>
    </div>
  );
}

/** ================= Content ================= */
function Content({children}: {children: React.ReactNode}) {
  return (
    <div id="page-container">
      <main id="page-content" className="pt-20 min-h-screen">
        {children}
      </main>
    </div>
  );
}

/** ================= Footer ================= */
function Footer() {
  return (
    <div id="footer" className="box-border bg-gray-100 min-h-48">
      <footer className="py-6 container mx-auto">
        <div className="flex justify-between mb-10">
          <div>
            <img src={FooterLogo} alt="브랜드로고" className="block mb-2 w-32" loading="lazy" />
            <strong className="text-gray-600 text-sm font-normal">© 2025 MingleUp. All rights reserved.</strong>
          </div>
          <ul className="flex text-gray-600 text-sm">
            <li className="after:content-['|'] after:mx-1">이용약관</li>
            <li>개인정보 처리방침</li>
          </ul>
        </div>
        <div>
          <p className="text-gray-600 text-sm">
            해당 사이트는 구름톤 Deepdive 최종프로젝트이며 실제 사이트 이용시 버그 및 문의사항은{' '}
            <a
              href="https://github.com/Goorm-MingleUp/mingleup-frontend/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 md:hover:underline visited:text-purple-500"
            >
              Github
            </a>{' '}
            를 통해 부탁드립니다.
          </p>
        </div>
      </footer>
    </div>
  );
}

/** ================= Logo ================= */
function Logo() {
  return (
    <a href="/">
      <div className="flex items-center">
        <img src={logoUrl} height={64} width={64} alt="logo" />
        <h1 className="font-bold text-xl">MingleUp</h1>
      </div>
    </a>
  );
}
