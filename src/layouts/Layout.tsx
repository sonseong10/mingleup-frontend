import './Layout.css';
import '../styles/index.scss';

import './tailwind.css';
import logoUrl from '../assets/images/logo.svg';
import {Link} from '../components/Link';
import PopupComponent from '../components/popup/Popup';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />

      <PopupComponent />
    </>
  );
}

function Footer() {
  return (
    <div id="footer" className={'box-border bg-gray-100 min-h-48'}>
      <footer className="py-6 container  mx-auto">
        <div className="flex justify-between mb-10">
          <strong className="text-gray-600 text-sm font-normal">© 2025 MingleUp. All rights reserved.</strong>
          <ul className="flex text-gray-600 text-sm ">
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
              className="text-pink-500 md:hover:underline visited:text-purple-500 "
            >
              Github
            </a>
            를 통해 부탁드립니다.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Header() {
  return (
    <div id="header" className={'box-border border-b border-b-gray-200'}>
      <header className="flex shrink-0 items-center justify-between container h-20">
        <div className="flex items-center gap-32">
          <Logo />

          {/* GNB */}
          <Link href="/">파티</Link>
        </div>

        <div>로그인</div>
      </header>
    </div>
  );
}

function Content({children}: {children: React.ReactNode}) {
  return (
    <div id="page-container">
      <div id="page-content" className={'pb-12 min-h-screen container'}>
        {children}
      </div>
    </div>
  );
}

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
