import {Suspense} from 'react';
import SearchInput from '../../components/search/Search';
import PartyList from './components/PartyList';

function PartyPage() {
  return (
    <>
      <div className="pt-6 flex justify-between mb-10">
        <h2 className="text-4xl">파티리스트</h2>
        <SearchInput />
      </div>

      <div className="mb-12">
        <ul className="flex items-center gap-3">
          <li className="px-5 py-2.5 rounded-4xl border bg-black text-white text-center ">전체</li>
          <li className="px-5 py-2.5 rounded-4xl border text-center ">마감 임박</li>
          <li className="px-5 py-2.5 rounded-4xl border text-center ">MBTI</li>
        </ul>
      </div>

      <section>
        <Suspense fallback={<p>로딩중입니다.</p>}>
          <PartyList />
        </Suspense>
      </section>
    </>
  );
}

export default PartyPage;
