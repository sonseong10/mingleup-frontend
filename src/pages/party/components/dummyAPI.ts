export const partyData = [
  {
    partyId: 1,
    area: '홍대',
    title: '와인 모임',
    category: '파티',
    partyImageUrl: '/dummy.png',
    status: 'recruiting',
  },
  {
    partyId: 2,
    area: '강남',
    title: '보드게임 번개',
    category: '취미',
    partyImageUrl: '/dummy.png',
    status: 'closed',
  },
  {
    partyId: 3,
    area: '연남',
    title: '러닝 크루',
    category: '운동',
    partyImageUrl: '/dummy.png',
    status: 'recruiting',
  },
  {
    partyId: 4,
    area: '성수',
    title: '커피 스터디',
    category: '스터디',
    partyImageUrl: '/dummy.png',
    status: 'recruiting',
  },
  {
    partyId: 5,
    area: '잠실',
    title: '야구 직관 모임',
    category: '스포츠',
    partyImageUrl: '/dummy.png',
    status: 'closed',
  },
  {
    partyId: 6,
    area: '한강',
    title: '피크닉 번개',
    category: '파티',
    partyImageUrl: '/dummy.png',
    status: 'recruiting',
  },
];

// 3초 지연 fetch
function fetchParties() {
  return new Promise<typeof partyData>(resolve => {
    setTimeout(() => resolve(partyData), 2000);
  });
}

function wrapPromise<T>(promise: Promise<T>) {
  let status = 'pending';
  let result: T;
  const suspender = promise.then(
    res => {
      status = 'success';
      result = res;
    },
    err => {
      status = 'error';
      result = err;
    }
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result!;
    },
  };
}

// 클라이언트에서만 호출
export const partyResource = wrapPromise(fetchParties());
