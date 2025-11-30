import {useState} from 'react';
import Button from '../../components/button/Button';
import KakaoLogin from './KakaoLogin';

type AuthRole = 'member' | 'host';

function RoleToggle({active, onChange}: {active: string; onChange: (role: AuthRole) => void}) {
  const roles: Array<AuthRole> = ['member', 'host'];

  return (
    <div className="flex mb-12 gap-4 bg-stone-100 px-4 py-2 rounded-2xl w-full max-w-md mx-auto">
      {roles.map(role => (
        <Button
          key={role}
          style={{
            backgroundColor: active === role ? '#F2BED1' : 'transparent',
            flex: 1,
            height: '2.6rem',
          }}
          aria-pressed={active === role}
          onClick={() => onChange(role)}
        >
          {role === 'member' ? '참가자로 로그인' : '호스트로 로그인'}
        </Button>
      ))}
    </div>
  );
}

function LoginForm() {
  const [isActive, setIsActive] = useState<AuthRole>('member');

  return (
    <section className="w-full flex flex-col items-center px-4">
      <RoleToggle active={isActive} onChange={setIsActive} />

      <div className="w-full max-w-md mx-auto">
        {isActive === 'member' ? (
          <>
            <KakaoLogin />
            <p className="text-sm text-center text-gray-500 mt-4">
              회원가입 하는 경우
              <a href="/policy" className="underline">
                개인정보처리방침
              </a>
              약관에 동의함을 간주합니다.
            </p>
          </>
        ) : (
          <p className="p-4 bg-gray-100 text-center rounded-xl text-gray-500">
            호스트 가입은 곧 출시될 예정입니다.
            <br /> 관리자에게 문의 바랍니다.
          </p>
        )}
      </div>
    </section>
  );
}

function LoginPage() {
  return (
    <>
      <header className="container">
        <div className="mt-20 mb-20 lg:mt-40">
          <h2 className="text-3xl md:text-4xl font-normal leading-snug mb-4">
            자연스러운 만남,
            <br />
            당신의 리듬에 맞춘 <span className="font-bold text-[#F2BED1]">MingleUp</span>
          </h2>

          <p className="text-stone-500 text-base md:text-lg leading-relaxed">
            MingleUp은 AI가 당신의 취향과 성향에 맞는 사람들과 어울릴 수 있는 파티를 만들어드립니다.
          </p>
        </div>
      </header>

      <LoginForm />
    </>
  );
}

export default LoginPage;
