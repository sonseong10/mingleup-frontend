import {usePageContext} from 'vike-react/usePageContext';

export default function Page() {
  const {is404} = usePageContext();
  if (is404) {
    return (
      <>
        <h1>Page Not Found</h1>
        <p>This page could not be found.</p>
      </>
    );
  }
  return (
    <div className="container relative p-8">
      <div className="text-center">
        <h1>문제발생</h1>
        <p className="mb-4">폐이지 정보가 유실되었어요, 다시 진행을 위해 이전페이지로 이동해요.</p>
        <button
          className="cursor-pointer"
          onClick={() => {
            if (typeof window === null) return;

            window.history.back();
          }}
        >
          돌아가기 &gt;
        </button>
      </div>
    </div>
  );
}
