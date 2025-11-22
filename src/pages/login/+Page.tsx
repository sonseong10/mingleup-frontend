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
        <KakaoLogin />
      </div>
    </section>
  );
}

function LoginPage() {
  return (
    <>
      <header className="mt-20 mb-20 lg:mt-40">
        <h2 className="text-3xl md:text-4xl font-normal leading-snug mb-4">
          자연스러운 만남,
          <br />
          당신의 리듬에 맞춘 <span className="font-bold text-[#F2BED1]">MingleUp</span>
        </h2>

        <p className="text-stone-500 text-base md:text-lg leading-relaxed">
          MingleUp은 AI가 당신의 취향과 성향에 맞는 사람들과 어울릴 수 있는 파티를 만들어드립니다.
        </p>
      </header>

      <LoginForm />
    </>
  );
}

export default LoginPage;
