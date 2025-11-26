function PartyDetail() {
  return (
    <>
      {/* PC 레이아웃 */}
      <div className="relative md:grid grid-cols-[4fr_6fr] gap-14">
        <aside className="sticky hidden md:block top-22 h-fit">
          <h2 className="sr-only">파티 신청하기 영역</h2>

          <div className="flex flex-col">
            <div>
              <span>추천</span>
            </div>

            <div className="flex flex-col mb-4">
              <span>강남구 · 커뮤니티</span>
              <strong>100% 익명보장 즉석만남 소개팅</strong>
              <span>25.11.1(토) 오후 18:00</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-2 py-3 bg-white text-black border rounded-lg">9</button>
            <button className="flex-8 py-3 bg-[#FDCEDF] text-black rounded-lg">신청하기</button>
          </div>
        </aside>

        <section className="">
          <h2 className="sr-only">파티 상세내용</h2>

          <div className="mb-8">
            <div className="w-full rounded-2xl overflow-hidden">
              <img src="/dummy.png" alt="" className="w-full bg-cover" />
            </div>
          </div>

          <div className="mb-8 flex w-full">
            <button className="flex-1 ">정보</button>
            <button className="flex-1 ">안내사항</button>
            <button className="flex-1 ">호스트</button>
            <button className="flex-1 ">리뷰</button>
          </div>

          <div
            className="mb-8"
            dangerouslySetInnerHTML={{
              __html: `<div class="IntroduceHtml_introduce__content__IMSCa" style="white-space: pre-wrap;"><p style="text-align: center"><br></p><p style="text-align: center">찬란하지만 외로운 서울살이,</p><p style="text-align: center">인연 혹은 “연인”을 부담없이 만나요!</p><p style="text-align: center">특별한 크리스마스, 미리 같이 즐겨요❤️❤️</p><p style="text-align: center"><br></p><p style="text-align: center"><br></p><p><img class="ql-image image-loaded" src="http://images.munto.kr/production-socialing/1762403818135-photo-jvmyr-1061517-0"></p><p><br></p><p><img class="ql-image image-loaded" src="http://images.munto.kr/production-socialing/1762510610347-photo-7v6jx-1061517-0"></p><p><br></p><p style="text-align: center">&lt;<strong>오늘의메뉴</strong>&gt; </p><p style="text-align: center">배달음식❌, 모두 직접 조리합니다 </p><p style="text-align: center">닭갈비떡볶이</p><p style="text-align: center">참치주먹밥</p><p style="text-align: center">트러플오일감자튀김</p><p style="text-align: center">야채튀김</p><p style="text-align: center">수제 고르곤졸라 +사양벌꿀</p><p style="text-align: center"><strong>“수제 매실주”</strong>,소,맥,탄산</p><p><br></p><p style="text-align: center">-----2차메뉴-----</p><p style="text-align: center">살라미with트러플오일</p><p style="text-align: center">버번위스키&amp;바닐라빈셔벗</p><p style="text-align: center">구운쥐포</p><p style="text-align: center">벨지안와플쿠키</p><p style="text-align: center">참치샐러드카나페</p><p><br></p><p><br></p><p><img class="ql-image image-loaded" src="http://images.munto.kr/production-socialing/1761468305734-photo-5qa6s-1061517-0"></p><p><br></p><p><br></p><p><br></p><p><img class="ql-image image-loaded" src="http://images.munto.kr/production-socialing/1761468305734-photo-5qa6s-1061517-1"></p><p><br></p><p style="text-align: center">부담없이, 친구or인연을 만들 수 있는 소셜링입니다❤️</p><p><br></p><p><br></p><p><br></p></div>`,
            }}
          ></div>

          <div className="mb-8">{/* 안내사항 table */}</div>

          <div className="mb-8">{/* 호스트 정보 */}</div>

          <div className="mb-8">{/* 리뷰 */}</div>
        </section>
      </div>

      {/* 모바일 전용 하단 고정 신청 버튼 */}
      <button className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black text-white py-4 text-center">
        신청하기
      </button>

      {/* 모바일 전용 상세내용 (aside 제거된 버전) */}
      <div className="md:hidden pb-20">
        <section>
          <h2 className="sr-only">파티 상세내용</h2>

          <div className="mb-8">sumnail images</div>

          <div className="mb-8">{/* 탭 */}</div>

          <div className="mb-8">{/* 상세 내용 */}</div>

          <div className="mb-8">{/* 안내사항 table */}</div>

          <div className="mb-8">{/* 호스트 */}</div>

          <div className="mb-8">{/* 리뷰 */}</div>
        </section>
      </div>
    </>
  );
}

export default PartyDetail;
