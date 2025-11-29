import {Activity, useEffect, useRef, useState} from 'react';
import {useData} from 'vike-react/useData';
import {navigate} from 'vike/client/router';
import type {Data} from './+data.js';
import {usePopup} from '../../../components/popup/usePopup.js';

const TABS = [
  {id: 'info', label: '정보'},
  {id: 'notice', label: '안내사항'},
  {id: 'host', label: '호스트'},
  {id: 'review', label: '리뷰'},
];

const Like = (color?: string): string => {
  color = color?.indexOf('#') === -1 ? color : color?.substring(1, color.length);
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='15' viewBox='0 0 16 15' fill='%23${color}'%3E%3Cpath stroke='%23${color}' stroke-width='2' stroke-miterlimit='10' d='M8 13.1332L2.10906 7.34829C1.399 6.65081 1 5.70498 1 4.71871C1 3.73244 1.399 2.78661 2.10906 2.08913C2.81932 1.39183 3.78245 1 4.78678 1C5.79111 1 6.75424 1.39183 7.46449 2.08913L8 2.61501L8.53551 2.08913C9.24557 1.39183 10.2089 1 11.2132 1C12.2175 1 13.1807 1.39183 13.8909 2.08913C14.601 2.78661 15 3.73244 15 4.71871C15 5.70498 14.601 6.65081 13.8909 7.34829L8 13.1332Z'/%3E%3C/svg%3E%0A`;
};

function SectionHeader({title, subText}: {title: string; subText?: string}) {
  return (
    <div className="mb-3 bg-white">
      <h3 className="text-xl font-semibold">{title}</h3>
      <Activity mode={!subText ? 'hidden' : 'visible'}>
        <p className="mt-1 text-sm text-stone-500">{subText}</p>
      </Activity>
    </div>
  );
}

interface TabsProps {
  tabs: {id: string; label: string}[];
  activeTab: string;
  onClick: (id: string) => void;
  tabRef: React.RefObject<HTMLDivElement | null>;
}

function Tabs({tabs, activeTab, onClick, tabRef}: TabsProps) {
  return (
    <div ref={tabRef} className="sticky top-20 mb-8 flex w-full bg-white z-1 border-t border-b border-stone-300">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`flex-1 h-12 cursor-pointer ${
            activeTab === tab.id ? 'border-b-2 border-pink-500 font-semibold' : ''
          }`}
          onClick={() => onClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function StickyApplyBox({party}: {party: Data['party']}) {
  const {form} = usePopup();
  return (
    <aside className="sticky hidden md:block top-22 h-fit">
      <h2 className="sr-only">파티 신청하기 영역</h2>

      <div className="flex flex-col">
        <div className="flex mb-4 gap-2 items-center">
          {party.tags.map((tag, index) => (
            <span key={index} className="px-3.5 py-1.5 bg-[#FDCEDF] text-[#F9027A] rounded-xl text-xs">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col mb-4">
          <strong className="mb-2 text-2xl font-normal">{party.title}</strong>
          <span className="text-stone-500 ">
            {party.locationName} · {new Date(party.partyDatetime).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-2 w-full flex gap-2 items-center justify-center px-4 py-3 bg-white text-black border rounded-lg cursor-pointer border-[#999]">
          <i
            aria-hidden
            className="block w-6 h-6 bg-no-repeat bg-center"
            style={{backgroundImage: `url("${Like('#999')}")`}}
          ></i>
          <strong className="text-[#999] font-normal">
            9<span className="sr-only">개</span>
          </strong>
        </button>
        {party.status !== 'recruiting' ? (
          <button className="flex-8 py-3 bg-[#ddd] text-gray-500 rounded-lg cursor-not-allowed">모집완료</button>
        ) : (
          <button
            className="flex-8 py-3 bg-[#FDCEDF] text-black rounded-lg cursor-pointer"
            onClick={() => {
              form<{
                agree?: 'on';
              }>({
                header: {
                  title: '신청하기 전에!',
                  close: true,
                },
                form: (
                  <>
                    <p className="mb-4">모두가 즐거운 모임이 될 수 있도록 꼭 확인해 주세요!</p>
                    <ol className="flex flex-col mb-4 gap-2 ">
                      <li className="text-sm">
                        1. 모임 시작 전 부득이하게 참여가 어려워진 경우, 반드시 호스트에게 미리 알려주세요.
                      </li>
                      <li className="text-sm">
                        2. 무단으로 불참하거나, 함께하는 멤버들에게 피해를 주는 경우 이용 제재를 받게 돼요.
                      </li>
                      <li className="text-sm">
                        3. 호스트가 제공하는 얼리버드 할인 혜택은 정상적으로 모임 참여를 완료해야 제공돼요.
                      </li>
                    </ol>
                    <div className="flex flex-row-reverse justify-end gap-2 mb-8 p-2 bg-[#FAEBED] rounded-md">
                      <label htmlFor="agreement" className="text-sm">
                        소셜링 이용 규칙을 잘 지킬게요!
                      </label>
                      <input id="agreement" name="agree" type="checkbox" defaultChecked />
                    </div>
                  </>
                ),
                onSubmit(data) {
                  if (data.agree) {
                    navigate('/party/accession', {pageContext: {party}});
                  }
                },
              });
            }}
          >
            신청하기
          </button>
        )}
      </div>
    </aside>
  );
}

function InfoSection({party}: {party: Data['party']}) {
  const [isShow, setIsShow] = useState(false);
  const onMoreContents = () => setIsShow(true);

  return (
    <div className="relative">
      <div
        className={`${isShow ? '' : 'max-h-[600px]'} overflow-hidden`}
        dangerouslySetInnerHTML={{
          __html: `<div class="IntroduceHtml_introduce__content__IMSCa" style="white-space: pre-wrap;">
            <p><strong>설명:</strong> ${party.description}</p>
            <p><strong>가이드라인:</strong> ${party.guidelines}</p>
            <p><strong>카테고리:</strong> ${party.category} > ${party.subCategory.join(', ')}</p>
            <p><strong>참가인원:</strong> ${party.minParticipants} ~ ${party.maxParticipants}명</p>
            <p><strong>참가비:</strong> ${party.entryFee.toLocaleString()}원</p>
          </div>`,
        }}
      ></div>
      <Activity mode={isShow ? 'hidden' : 'visible'}>
        <div className="absolute bottom-0 z-1 w-full h-[120px] flex items-end bg-linear-to-b from-transparent to-white">
          <button
            className="w-full h-16 cursor-pointer rounded-tl-2xl rounded-tr-2xl bg-white"
            onClick={onMoreContents}
          >
            펼치기
          </button>
        </div>
      </Activity>
    </div>
  );
}

function NoticeSection({party}: {party: Data['party']}) {
  return (
    <>
      <SectionHeader title="안내사항" subText="자세한 정보를 알려드릴게요" />

      <table className="w-full text-left">
        <tbody>
          <tr className="border-b border-gray-200">
            <th className="py-2 px-4 w-32 text-gray-600 font-medium">카테고리</th>
            <td className="py-2 px-4">
              {party.category} &gt; {party.subCategory.join(', ')}
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <th className="py-2 px-4 w-32 text-gray-600 font-medium">모집 방식</th>
            <td className="py-2 px-4">{party.recruitmentMethod}</td>
          </tr>
          <tr className="border-b border-gray-200">
            <th className="py-2 px-4 w-32 text-gray-600 font-medium">인원수</th>
            <td className="py-2 px-4">
              최소 {party.minParticipants}명 ~ 최대 {party.maxParticipants}명
            </td>
          </tr>
          <tr className="border-b border-gray-200">
            <th className="py-2 px-4 w-32 text-gray-600 font-medium">가격</th>
            <td className="py-2 px-4">{party.entryFee.toLocaleString()}원</td>
          </tr>
          <tr className="border-b border-gray-200">
            <th className="py-2 px-4 w-32 text-gray-600 font-medium">장소</th>
            <td className="py-2 px-4">{party.locationName}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function HostSection({party}: {party: Data['party']}) {
  return (
    <div className="border-b border-b-gray-300 pb-4">
      <SectionHeader title="호스트소개" subText="함께 할 호스트를 알려드릴게요." />
      <div className="flex items-center gap-4">
        <img
          src={
            party.host.profileImageUrl.includes('example.com') ? '../default-profil.svg' : party.host.profileImageUrl
          }
          className="w-16 h-16 rounded-full"
          alt={party.host.name}
        />
        <div>
          <p className="font-semibold">{party.host.name}</p>
          <p className="text-stone-500">{party.host.hostIntro}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewSection() {
  return (
    <div className="">
      <SectionHeader title="리뷰" subText="같은 파티에 참석한 다른 사람들의 후기를 알려드릴게요" />
      <div className="flex justify-center items-center p-10 bg-stone-100 rounded-xl text-stone-500 text-center">
        아직 작성된 리뷰가 없습니다.
        <br /> 파티에 참석 한 후 호스트를 위한 파티 리뷰를 작성 해주세요.
      </div>
    </div>
  );
}

export default function PartyDetail() {
  const [activeTab, setActiveTab] = useState('info');
  const {party} = useData<Data>();

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    info: null,
    notice: null,
    host: null,
    review: null,
  });

  const tabRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!tabRef.current) return;
    const tabHeight = tabRef.current.offsetHeight;

    const observer = new IntersectionObserver(
      entries => {
        const intersecting = entries.filter(e => e.isIntersecting);
        if (intersecting.length > 0) {
          const topMost = intersecting.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActiveTab(topMost.target.id);
        } else if (window.scrollY < 10) {
          setActiveTab('info');
        }
      },
      {root: null, rootMargin: `-${tabHeight}px 0px 0px 0px`, threshold: 0}
    );

    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleTabClick = (id: string) => {
    const el = sectionRefs.current[id];
    if (el && tabRef.current) {
      const tabHeight = tabRef.current.offsetHeight;
      window.scrollTo({top: el.offsetTop - tabHeight, behavior: 'smooth'});
      setActiveTab(id);
    }
  };

  return (
    <div className="relative md:grid grid-cols-[3fr_7fr] gap-14 container">
      <StickyApplyBox party={party} />

      <section>
        <img src="https://picsum.photos/400/300?random=1" className="w-full rounded-2xl mb-8" />

        <Tabs tabs={TABS} activeTab={activeTab} onClick={handleTabClick} tabRef={tabRef} />

        <div className="space-y-8">
          <section
            id="info"
            className="mb-12"
            ref={el => {
              sectionRefs.current.info = el;
            }}
          >
            <InfoSection party={party} />
          </section>

          <section
            id="notice"
            className="mb-12"
            ref={el => {
              sectionRefs.current.notice = el;
            }}
          >
            <NoticeSection party={party} />
          </section>

          <section
            id="host"
            className="mb-12"
            ref={el => {
              sectionRefs.current.host = el;
            }}
          >
            <HostSection party={party} />
          </section>

          <section
            id="review"
            className="mb-12"
            ref={el => {
              sectionRefs.current.review = el;
            }}
          >
            <ReviewSection />
          </section>
        </div>
      </section>
    </div>
  );
}
