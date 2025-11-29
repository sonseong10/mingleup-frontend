import Http from '../../../utils/HTTP';
import {useEffect, useState} from 'react';

type User = {
  id: number;
  name: string;
  birthdate: string;
  gender: string;
  email: string | null;
  region: string | null;
  mbti: string | null;
  hobbies: string[];
  idealTypeHobbies: string[];
  profileImageUrl: string | null;
  role: string;
};

function MyInfo({user}: {user?: User}) {
  return (
    <div className="container p-4 space-y-8">
      {/* 프로필 헤더 */}
      <div className="flex items-center gap-4">
        <img
          src={user?.profileImageUrl || '/default-profil.svg'}
          alt={user?.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          {user?.mbti && <p className="text-sm text-gray-500">{user?.mbti}</p>}
          {user?.region && <p className="text-sm text-gray-500">{user?.region}</p>}
        </div>
      </div>

      {/* 계정 정보 */}
      <div className="bg-white p-4 rounded-lg space-y-2">
        <h3 className="font-semibold text-gray-700">계정 정보</h3>
        <p>생년월일: {user?.birthdate}</p>
        <p>이메일: {user?.email || '등록되지 않음'}</p>
        <p>성별: {user?.gender}</p>
      </div>

      {/* 취미 */}
      <div className="bg-white p-4 rounded-lg space-y-2">
        <h3 className="font-semibold text-gray-700">취미</h3>
        <p>{user?.hobbies.length ? user?.hobbies.join(', ') : '등록된 취미가 없습니다.'}</p>
        <h3 className="font-semibold text-gray-700 mt-2">이상형 취미</h3>
        <p>{user?.idealTypeHobbies.length ? user?.idealTypeHobbies.join(', ') : '등록된 취미가 없습니다.'}</p>
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-4">
        <button className="flex-1 py-2 bg-black text-white rounded-lg">정보수정</button>
      </div>
    </div>
  );
}

function Mypage() {
  const [user, setUser] = useState<User>();
  async function fetchUser() {
    if (typeof window === 'undefined') return null; // 서버에서는 실행하지 않음

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const res = await Http.get<{result: User}>('users/me', {
        headers: {
          Authorization: `Bearer ${token}`, // 대문자 B, Bearer
        },
      });

      console.log(res.data.result);

      setUser(res.data.result);

      if (!res) {
        console.error('Failed to fetch user:', res);
        return null;
      }

      return res;
    } catch (err) {
      console.error('Fetch error:', err);
      return null;
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <MyInfo user={user} />
    </>
  );
}

export default Mypage;
