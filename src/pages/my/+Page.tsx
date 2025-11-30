import Http from '../../utils/HTTP';
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

function MyInfo() {
  const [user, setUser] = useState<User>();
  async function fetchUser() {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const res = await Http.get<{result: User}>('users/me', {
        headers: {
          Authorization: `Bearer ${token}`, // 대문자 B, Bearer
        },
      });
      setUser(res.data.result);

      if (!res) {
        console.error('Failed to fetch user:', res);
        return null;
      }
    } catch (err) {
      console.error('Fetch error:', err);
      return null;
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container p-4 border-b border-b-gray-200" style={{marginBottom: '24px'}}>
      {/* 프로필 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user?.profileImageUrl || '/default-profil.svg'}
            alt={user?.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-normal">{user?.name}</h2>
            <span className="mr-2 text-sm text-gray-500">MBTI: {(user?.mbti && user?.mbti) || '정보없음'}</span>
            <span className="text-sm text-gray-500">지역: {(user?.region && user?.region) || '정보없음'}</span>
          </div>
        </div>

        <div>
          <a href="/my/info">정보수정</a>
        </div>
      </div>
    </div>
  );
}

interface IResWishList {
  content: {
    wishlistId: number;
    wishlistedAt: string;
    partyId: number;
    partyTitle: string;
    partyImageUrl: string;
    partyDatetime: string;
    partyLocationName: string;
    entryFee: number;
  }[];
}

interface IResAppParty {
  content: {
    applicationId: number;
    applicationStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ATTENDED';
    appliedAt: string;
    partyDatetime: string;
    partyId: number;
    partyImageUrl: string;
    partyLocationName: string;
    partyTitle: string;
  }[];
}
const statusLabel = {
  PENDING: '승인 대기중',
  APPROVED: '승인됨',
  REJECTED: '거절됨',
  ATTENDED: '참여 완료',
} as const;

const statusColor = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
  ATTENDED: 'bg-blue-100 text-blue-700',
} as const;

const imgUrl = `https://picsum.photos/300/200?random=${Math.random()}`;

function MyWishListt() {
  const [wishList, setWishList] = useState<IResWishList>();
  const [appList, setAppList] = useState<IResAppParty>();
  const [isLoaded, setIsLoaded] = useState(false);

  async function fetchUser() {
    if (typeof window === 'undefined') return null; // 서버에서는 실행하지 않음

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const res = await Http.get<{result: IResWishList}>('wishlists/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishList(res.data.result);

      console.log(res.data.result);

      if (!res) {
        console.error('Failed to fetch user:', res);
        return null;
      }
    } catch (err) {
      console.error('Fetch error:', err);
      return null;
    }
  }

  async function fetchdkUser() {
    if (typeof window === 'undefined') return null; // 서버에서는 실행하지 않음

    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const res = await Http.get<{result: IResAppParty}>('applications/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppList(res.data.result);

      // console.log(res.data);

      if (!res) {
        console.error('Failed to fetch user:', res);
        return null;
      }
    } catch (err) {
      console.error('Fetch error:', err);
      return null;
    }
  }

  useEffect(() => {
    fetchUser();
    fetchdkUser();
  }, []);

  return (
    <div className="container">
      <section className="mb-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">내가 신청한 파티</h2>
        </div>

        <div>
          {!appList?.content?.length ? (
            <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-xl bg-gray-100 ">
              <p className="text-gray-500 text-center">아직 신청한 파티가 없어요. 추천하는 파티를 보러가요.</p>

              <a href="/party" className="px-4 py-2 rounded-md  cursor-pointer hover:opacity-50">
                파티 찾아보기 &gt;
              </a>
            </div>
          ) : (
            <div>
              {!appList?.content?.length ? (
                <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-xl bg-gray-100 ">
                  <p className="text-gray-500 text-center">아직 신청한 파티가 없어요. 추천하는 파티를 보러가요.</p>

                  <a href="/party" className="px-4 py-2 rounded-md  cursor-pointer hover:opacity-50">
                    파티 찾아보기 &gt;
                  </a>
                </div>
              ) : (
                <ul className="relative min-h-68 grid grid-cols-2 gap-8 px-2.5 md:grid-cols-4 md:px-0">
                  {appList?.content.map(party => (
                    <li key={party.applicationId}>
                      <article
                        className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden transition hover:opacity-70 cursor-pointer h-full"
                        aria-label={`파티 ${party.partyTitle}`}
                      >
                        {/* 티켓 상단 이미지 영역 */}
                        <div className="relative h-[180px] bg-gray-200 overflow-hidden">
                          {/* Skeleton */}
                          {!isLoaded && <div className="absolute inset-0 animate-pulse bg-gray-300" />}

                          <img
                            src={imgUrl}
                            alt={party.partyTitle}
                            className={`w-full h-full object-cover transition-opacity duration-500 ${
                              isLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => setIsLoaded(true)}
                          />
                        </div>

                        {/* 펀칭 - dotted line */}
                        <div className="relative ">
                          <div className="border-t border-dashed border-gray-300 my-3 mx-4"></div>

                          {/* 양쪽 라운드 펀칭 구멍 */}
                          <div className="absolute -left-3 -top-3 w-6 h-6 bg-white rounded-full border border-gray-200" />
                          <div className="absolute -right-3 -top-3 w-6 h-6 bg-white rounded-full border border-gray-200" />
                        </div>

                        {/* 하단 정보 영역 */}
                        <div className="px-4 pb-4 flex flex-col gap-2 ">
                          <h2 className="text-lg font-bold">{party.partyTitle}</h2>

                          <div className="text-sm text-gray-500">
                            <p>{party.partyLocationName}</p>
                            <time dateTime={party.partyDatetime}>{new Date(party.partyDatetime).toLocaleString()}</time>
                          </div>

                          {/* 상태 뱃지 */}
                          <span
                            className={`mt-2 inline-block px-3 py-2 rounded-full text-xs font-medium text-center w-full ${statusColor[party.applicationStatus]}`}
                          >
                            {statusLabel[party.applicationStatus]}
                          </span>
                        </div>

                        {/* 티켓 하단 타원형 컷(노치) */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-6 bg-white rounded-t-full border-x border-t border-gray-200" />
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">내가 찜한 파티</h2>
        </div>
        <div className="mb-8">
          {!wishList?.content?.length ? (
            <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-xl bg-gray-100 ">
              <p className="text-gray-500 text-center">찜한 파티가 없어요. 추천하는 파티를 보러가요.</p>

              <a href="/party" className="px-4 py-2 rounded-md  cursor-pointer hover:opacity-50">
                파티 찾아보기 &gt;
              </a>
            </div>
          ) : (
            <ul className="relative min-h-68 grid grid-cols-2 gap-8 px-2.5 md:grid-cols-4 md:px-0">
              {wishList?.content.map(party => (
                <li key={party.partyId}>
                  <article
                    className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden transition hover:opacity-70 cursor-pointer h-full"
                    aria-label={`파티 ${party.partyTitle}`}
                  >
                    {/* 티켓 상단 이미지 영역 */}
                    <div className="relative h-[180px] bg-gray-200 overflow-hidden">
                      {/* Skeleton */}
                      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-gray-300" />}

                      <img
                        src={imgUrl}
                        alt={party.partyTitle}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          isLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setIsLoaded(true)}
                      />
                    </div>

                    {/* 펀칭 - dotted line */}
                    <div className="relative ">
                      <div className="border-t border-dashed border-gray-300 my-3 mx-4"></div>

                      {/* 양쪽 라운드 펀칭 구멍 */}
                      <div className="absolute -left-3 -top-3 w-6 h-6 bg-white rounded-full border border-gray-200" />
                      <div className="absolute -right-3 -top-3 w-6 h-6 bg-white rounded-full border border-gray-200" />
                    </div>

                    {/* 하단 정보 영역 */}
                    <div className="px-4 pb-4 flex flex-col gap-2 ">
                      <h2 className="text-lg font-bold">{party.partyTitle}</h2>

                      <div className="text-sm text-gray-500">
                        <p>{party.partyLocationName}</p>
                        <time dateTime={party.partyDatetime}>{new Date(party.partyDatetime).toLocaleString()}</time>
                      </div>
                    </div>

                    {/* 티켓 하단 타원형 컷(노치) */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-6 bg-white rounded-t-full border-x border-t border-gray-200" />
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function Mypage() {
  return (
    <>
      <MyInfo />

      <MyWishListt />
    </>
  );
}

export default Mypage;
