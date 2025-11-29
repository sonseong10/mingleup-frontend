import {useEffect, useState, useRef, useCallback} from 'react';
import Http from '../../../utils/HTTP';
import PartyItem from './PartyItems';
import notFound from '../../../assets/images/not_found.png';
interface IResParty {
  currentPage: number;
  totalCount: number;
  parties: {
    partyId: number;
    category: string;
    partyImageUrl: string;
    status: string;
    title: string;
  }[];
}

interface IPartyListProps {
  serch?: {
    category?: string;
    keyworld?: string;
    status?: string;
  };
  rolling?: boolean;
}

function PartyList({serch, rolling}: IPartyListProps) {
  const [allParties, setAllParties] = useState<IResParty['parties']>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const getPartyList = useCallback(async () => {
    const params = new URLSearchParams({
      page: '1',
      ...(serch?.category && {category: serch.category}),
      ...(serch?.keyworld && {search: serch.keyworld}),
      ...(serch?.status && {status: serch.status}),
    });

    const res = await Http.get<{result: IResParty}>('parties', {
      params,
    });

    setAllParties(res.data.result.parties);
  }, [serch]);

  useEffect(() => {
    getPartyList();
  }, [getPartyList]);

  // Infinite Scroll + 랜덤 배열 추가
  useEffect(() => {
    if (!rolling) return;
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting && allParties.length) {
          const shuffled = [...allParties].sort(() => Math.random() - 0.5);
          setAllParties(prev => [...prev, ...shuffled]);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0, // 요소가 완전히 보이면 trigger
      }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [rolling, allParties]);

  return (
    <>
      <ul className="relative min-h-68 grid grid-cols-2 gap-8 px-2.5 md:grid-cols-4 md:px-0">
        {allParties.length <= 0 ? (
          <li className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-full flex flex-col justify-center items-center">
              <img src={notFound} alt="" aria-hidden />

              <p className="text-center">찾고있는 파티에 대한 정보를 확인 할 수 없어요.</p>
            </div>
          </li>
        ) : (
          allParties.map((party, idx) => <PartyItem party={party} key={`${party.partyId}-${idx}`} />)
        )}
      </ul>

      {/* 스크롤 끝 감지용 div */}
      {rolling && <div ref={bottomRef} className="h-1"></div>}
    </>
  );
}

export default PartyList;
