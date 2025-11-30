import {useToastStore} from '../../../store/toastStore';
import Dropdown from '../../../components/dropdown/Dropdown';
import Input from '../../../components/input/Input';
import Http from '../../../utils/HTTP';
import {useEffect, useState} from 'react';
import {navigate} from 'vike/client/router';

const ALL_HOBBIES = ['적극적', '소극적', '운동', '맛집', '스터디'];
const MBTI_LIST = [
  {label: 'INTJ', value: 'INTJ'},
  {label: 'INTP', value: 'INTP'},
  {label: 'ENTJ', value: 'ENTJ'},
  {label: 'ENTP', value: 'ENTP'},
  {label: 'INFJ', value: 'INFJ'},
  {label: 'INFP', value: 'INFP'},
  {label: 'ENFJ', value: 'ENFJ'},
  {label: 'ENFP', value: 'ENFP'},
  {label: 'ISTJ', value: 'ISTJ'},
  {label: 'ISFJ', value: 'ISFJ'},
  {label: 'ESTJ', value: 'ESTJ'},
  {label: 'ESFJ', value: 'ESFJ'},
  {label: 'ISTP', value: 'ISTP'},
  {label: 'ISFP', value: 'ISFP'},
  {label: 'ESTP', value: 'ESTP'},
  {label: 'ESFP', value: 'ESFP'},
];

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

function MyInfo({user, onUpdate}: {user?: User; onUpdate: () => void}) {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [idealTypeHobbies, setIdealTypeHobbies] = useState<string[]>([]);
  const [region, setRegion] = useState('');
  const [mbti, setMbti] = useState('');
  const {addToast} = useToastStore();

  useEffect(() => {
    if (user) {
      setSelectedHobbies(user.hobbies ?? []);
      setIdealTypeHobbies(user.idealTypeHobbies ?? []);
      setRegion(user.region ?? '');
      setMbti(user.mbti ?? '');
    }
  }, [user]);

  const toggleHobby = (hobby: string, type: 'me' | 'ideal') => {
    if (type === 'me') {
      setSelectedHobbies(prev => (prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]));
    } else {
      setIdealTypeHobbies(prev => (prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]));
    }
  };

  const handleUpdate = async () => {
    try {
      await Http.put('users/me', {
        region,
        mbti,
        hobbies: selectedHobbies,
        idealTypeHobbies: idealTypeHobbies,
      });

      addToast('정보가 수정되었습니다!');
      navigate('/my');
    } catch (error) {
      console.error(error);
      addToast('수정 중 오류 발생!');
    }
  };

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
          <div className="flex">
            <Dropdown
              value={mbti}
              options={MBTI_LIST}
              onChange={value => setMbti(value)}
              placeholder="MBTI 입력"
              customStyle={{buttonClassName: 'px-[0px !important] py-[0px !important] w-40 h-10'}}
            />
            <Input
              defaultValue={region}
              name="region"
              className=" border-gray-400 px-4 ml-2 h-auto text-sm rounded"
              onChange={e => setRegion(e.target.value)}
              placeholder="지역 입력"
            />
          </div>
        </div>
      </div>

      {/* 계정 정보 */}
      <div className="bg-white p-4 rounded-lg space-y-2">
        <h3 className="font-semibold text-gray-700">신원 정보</h3>
        <p>생년월일: {user?.birthdate}</p>
        <p>이메일: {user?.email || '등록되지 않음'}</p>
        <p>성별: {user?.gender === 'MALE' ? '남성' : '여성'}</p>
      </div>

      {/* 취미 */}
      <div className="bg-white p-4 rounded-lg space-y-2">
        <h3 className="font-semibold text-gray-700">취미</h3>
        <ul className="flex gap-2 flex-wrap">
          {ALL_HOBBIES.map(hobby => (
            <li
              key={hobby}
              className={`px-4 py-2 border rounded-full cursor-pointer ${
                selectedHobbies.includes(hobby) ? 'bg-black text-white border-black' : 'text-gray-700'
              }`}
              onClick={() => toggleHobby(hobby, 'me')}
            >
              {hobby}
            </li>
          ))}
        </ul>

        <h3 className="font-semibold text-gray-700 mt-2">이상형 취미</h3>
        <ul className="flex gap-2 flex-wrap">
          {ALL_HOBBIES.map(hobby => (
            <li
              key={hobby}
              className={`px-4 py-2 border rounded-full cursor-pointer ${
                idealTypeHobbies.includes(hobby) ? 'bg-black text-white border-black' : 'text-gray-700'
              }`}
              onClick={() => toggleHobby(hobby, 'ideal')}
            >
              {hobby}
            </li>
          ))}
        </ul>
      </div>

      {/* 저장 버튼 */}
      <button className="w-full py-2 bg-black text-white rounded-lg cursor-pointer" onClick={handleUpdate}>
        정보 수정
      </button>
    </div>
  );
}

function Mypage() {
  const [user, setUser] = useState<User>();

  const fetchUser = async () => {
    try {
      const res = await Http.get<{result: User}>('users/me');
      setUser(res.data.result);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? <MyInfo user={user} onUpdate={fetchUser} /> : <>로딩중…</>;
}

export default Mypage;
