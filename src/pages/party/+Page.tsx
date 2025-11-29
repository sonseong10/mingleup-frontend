import {lazy, Suspense, useEffect, useState} from 'react';
import SearchInput from '../../components/search/Search';
import Http from '../../utils/HTTP';
const PartyList = lazy(() => import('./components/PartyList'));

interface IResCategort {
  category: string;
  subCategories: string[];
}

function CategoryList({
  category,
  change,
  state,
}: {
  category?: IResCategort[];
  change: (state: string) => void;
  state: string;
}) {
  return (
    <ul className="flex items-center gap-3 flex-wrap">
      <li>
        <button
          className={`cursor-pointer px-5 py-2.5
            rounded-4xl border text-center ${state === 'ALL' ? ' bg-black text-white' : 'bg-white text-black border'}`}
          onClick={() => {
            change('ALL');
          }}
        >
          전체
        </button>
      </li>
      {category?.map(item => {
        return item.subCategories.map((item, index) => (
          <li key={index}>
            <button
              className={`flex-1 cursor-pointer px-5 py-2.5
            rounded-4xl border text-center ${state === item ? ' bg-black text-white' : 'bg-white text-black border'}`}
              onClick={() => {
                change(item);
              }}
            >
              {item}
            </button>
          </li>
        ));
      })}
    </ul>
  );
}

function PartyPage() {
  const [category, setCategory] = useState<IResCategort[]>();
  const [activeTab, setActiveTab] = useState('ALL');
  const [keyworld, setKeyWorld] = useState<string | undefined>();

  const getCategory = async () => {
    const res = await Http.get<{result: IResCategort[]}>('parties/categories');
    setCategory(res.data.result);
  };

  const onChangeActive = (state: string) => {
    setActiveTab(state);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="container">
        <div className="pt-6 flex justify-between mb-10 ">
          <h2 className="text-4xl">파티리스트</h2>
          <SearchInput
            onKeyDown={e => {
              if (e.key == 'Enter' && !e.nativeEvent.isComposing) {
                setKeyWorld(e.currentTarget.value);
              }
            }}
          />
        </div>
      </div>
      <div className="container">
        <div className="mb-12">
          <CategoryList category={category} change={onChangeActive} state={activeTab} />
        </div>
      </div>
      <section className="container">
        <Suspense fallback={<p>로딩중입니다.</p>}>
          <PartyList
            rolling={activeTab === 'ALL' && (keyworld === undefined || keyworld === '')}
            serch={{
              category: activeTab !== 'ALL' ? activeTab : undefined,
              keyworld: keyworld && keyworld?.trim().length > 0 ? keyworld : undefined,
            }}
          />
        </Suspense>
      </section>
    </>
  );
}

export default PartyPage;
