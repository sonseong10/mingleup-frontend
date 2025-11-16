import {usePopup} from '../../components/popup/usePopup';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import {useInput} from '../../components/input/useInput';
import SearchInput from '../../components/search/Search';
import {useSearch} from '../../components/search/useSearch';
import Dropdown from '../../components/dropdown/Dropdown';
import {useDropdown} from '../../components/dropdown/useDropdown';

export default function Page() {
  const {form} = usePopup();
  const dropdown = useDropdown();

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

  const search = useSearch({
    // 검색창 예시입니다
    initialKeyword: '',
    async onSearch(keyword) {
      console.log('검색 실행:', keyword);
      // 여기서 API 호출 같은 거 하면 됨
    },
  });

  const OPTIONS = [
    {label: '옵션 1', value: 'opt1'},
    {label: '옵션 2', value: 'opt2'},
    {label: '옵션 3', value: 'opt3'},
  ];

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

      <SearchInput
        wrapperClassName="mb-4"
        inputClassName="text-[13px]" // 필요하면 여기서 글자 크기/패딩 조절
        {...search.bindInput}
      />

      {/* Modal  */}
      <Button
        className="h-12 rounded-4xl"
        onClick={() => {
          form<{name: string; age: number}>({
            header: {title: '신청하기 전에', close: true},
            form: (
              <>
                <label>이름</label>
                <input name="name" className="border p-2 w-full mb-4" />

                <label>나이</label>
                <input name="age" className="border p-2 w-full" />
              </>
            ),
            onSubmit: data => console.log(data),
          });
        }}
      >
        신청하기
      </Button>

      {/* Dropdown */}
      <Dropdown
        options={OPTIONS}
        placeholder="옵션을 선택해주세요"
        customStyle={{
          wrapperClassName: 'w-[240px]',
          buttonClassName: 'w-full', // padding은 컴포넌트에서 이미 px-25/py-20
          optionListClassName: 'w-full',
          optionClassName: 'w-full',
        }}
        {...dropdown.bind}
      />
    </>
  );
}
