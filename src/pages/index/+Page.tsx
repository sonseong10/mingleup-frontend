import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import {useInput} from '../../components/input/useInput';

export default function Page() {
  const nameInput = useInput({
    // 인풋 예시입니다
    initialValue: '',
    validate: value => (value.trim().length === 0 ? '닉네임을 입력해주세요.' : null),
  });

  const bioInput = useInput({
    // 인풋 예시입니다
    initialValue: '',
    validate: value => (value.length > 200 ? '200자 이내로 입력해주세요.' : null),
  });

  return (
    <>
      <h1 className={'font-bold text-3xl pb-4'}>1주차 멘토링 과제</h1>

      {/* TODO: 1주차 프론트 팀미션 UI 컴포넌트 만들기  */}

      {/* Button/Input  */}
      <Button
        onClick={() => {
          console.log('제출 버튼 클릭');
        }}
      >
        제출_활성화버튼
      </Button>

      <Button
        disabled
        onClick={() => {
          console.log('이 코드는 disabled라 실행되지 않음');
        }}
      >
        제출_비활성화버튼
      </Button>

      <Input placeholder="닉네임" className="px-4 py-2 text-base" {...nameInput.bind} />
      {nameInput.error && <p className="text-sm text-red-500">{nameInput.error}</p>}

      <Input
        multiline
        placeholder="자기소개를 입력하세요"
        className="px-4 py-3 text-sm min-h-[120px]"
        {...bioInput.bind}
      />

      {/* Modal  */}

      {/* Dropdown */}
    </>
  );
}
