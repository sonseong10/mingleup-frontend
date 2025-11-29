import Button from '../../../components/button/Button';
import {usePageContext} from 'vike-react/usePageContext';

function PartyAccession() {
  const {party} = usePageContext();

  console.log(party);

  return (
    <>
      <div className="container relative md:grid grid-cols-[3fr_7fr] gap-14">
        <aside className="sticky hidden md:block top-22 pt-3 h-fit">
          <h2 className="sr-only">파티 신청하기 영역</h2>

          <div className="flex flex-col">
            <div className="flex mb-4 gap-2 items-center">
              {party.tags.map((tag: string, index: number) => (
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
        </aside>

        <section className="pt-3">
          <div className="flex justify-between mb-6">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">호스트의 질문에 답변을 작성해 주세요</h2>
              <p className="text-sm text-gray-500">작성된 답변은 호스트에게만 공개돼요.</p>
            </div>

            <button
              onClick={() => {
                window.history.back();
              }}
              className="cursor-pointer"
            >
              작성취소
            </button>
          </div>

          <div>
            <div>
              <strong className="mb-2">{party.host.name}</strong>
              <p className="p-4 bg-gray-100 rounded-2xl w-fit text-sm mb-4">
                {party.hostQuestion ? party.hostQuestion : '간단한 참여사유 작성 부탁드려요.'}
              </p>
            </div>

            <textarea
              name="hostAnswer"
              id="hostAnswer"
              className="resize-none border border-gray-300 rounded-2xl w-full min-h-80 p-4 mb-6"
              placeholder="최소 5글자 이상 답변을 작성해 주세요."
            ></textarea>

            <Button style={{padding: '12px 10px'}} disabled>
              신청하기
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

export default PartyAccession;
