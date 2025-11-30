export default function PrivacyPolicy() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">개인정보 처리방침 (Privacy Policy)</h1>
      <p className="text-sm text-gray-500 mb-10">최종 수정일: 2025년 11월 26일</p>

      <div className="space-y-10 leading-relaxed text-gray-700">
        {/* 0. 소개 */}
        <div>
          <p>
            “MingleUp”(이하 “회사”)은 이용자의 개인정보 보호를 매우 중요하게 생각하며, 『개인정보 보호법』을 준수하고
            있습니다. 본 개인정보 처리방침은 회사가 제공하는 데이팅 및 커뮤니티 서비스 이용 과정에서 수집되는 개인정보의
            처리 및 보호 방침을 안내합니다.
          </p>
        </div>

        {/* 1. 수집하는 개인정보 항목 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">1. 수집하는 개인정보 항목</h2>
          <p className="mb-3">회사는 서비스 제공을 위해 필요한 최소한의 개인정보를 수집합니다.</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">1) 회원 가입 시 수집 정보</span>
              <ul className="list-disc pl-6">
                <li>필수: 이메일, 성별, 생년월일</li>
                <li>선택: 프로필 사진</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">2) 서비스 이용 과정에서 자동 수집 정보</span>
              <ul className="list-disc pl-6">
                <li>접속 로그(IP, 접속 시간, 브라우저 종류 등)</li>
                <li>서비스 이용 기록, 접속 기기 정보</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">3) 제3자 인증 정보</span>
              <ul className="list-disc pl-6">
                <li>카카오 로그인 등 OAuth 인증 시 동의한 범위 내 사용자 정보</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* 2. 개인정보 이용 목적 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">2. 개인정보 수집 및 이용 목적</h2>
          <p className="mb-3">회사는 수집한 개인정보를 다음 목적으로 사용합니다.</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>회원 관리 및 본인 식별</li>
            <li>서비스 제공 및 맞춤형 서비스 제공</li>
            <li>문의 응대 및 고객 지원</li>
            <li>서비스 이용 통계 및 분석</li>
            <li>마케팅 및 이벤트 안내(동의한 경우)</li>
          </ul>
        </div>

        {/* 3. 개인정보 보유 기간 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">3. 개인정보 보유 및 이용 기간</h2>

          <ul className="list-disc pl-6 space-y-1">
            <li>회원가입 정보: 회원 탈퇴 시까지</li>
            <li>접속 로그 등 이용 기록: 3년간 보관 후 파기</li>
            <li>기타 법령에서 별도 보관 요구 시 해당 기간 준수</li>
          </ul>
        </div>

        {/* 4. 개인정보 제3자 제공 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">4. 개인정보의 제3자 제공</h2>

          <p className="mb-3">
            회사는 원칙적으로 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우 예외가 적용됩니다.
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 따라 제공이 요구되는 경우</li>
            <li>서비스 제공을 위해 제휴사와 필요한 범위 내에서 공유하는 경우</li>
          </ul>
        </div>

        {/* 5. 위탁 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">5. 개인정보 처리 위탁</h2>

          <p>
            회사는 일부 업무를 외부 전문업체에 위탁할 수 있으며, 위탁 시 개인정보 보호를 위한 기술적·관리적 조치를
            준수합니다. 위탁업체 정보는 별도 공지를 통해 안내합니다.
          </p>
        </div>

        {/* 6. 이용자 권리 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">6. 이용자의 권리와 행사 방법</h2>

          <p className="mb-3">이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>개인정보 열람, 정정, 삭제 요청</li>
            <li>개인정보 처리 정지 또는 제한 요청</li>
            <li>동의 철회 및 회원 탈퇴</li>
            <li>권리 행사: 서비스 내 계정 설정 또는 고객센터 문의</li>
          </ul>
        </div>

        {/* 7. 파기 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">7. 개인정보의 파기</h2>

          <ul className="list-disc pl-6 space-y-1">
            <li>수집 목적 달성 시 지체 없이 파기</li>
            <li>파기 방법: 전자 파일 삭제, 문서 파쇄</li>
          </ul>
        </div>

        {/* 8. 보안 조치 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">8. 개인정보 보호를 위한 기술적·관리적 조치</h2>

          <ul className="list-disc pl-6 space-y-1">
            <li>개인정보 암호화</li>
            <li>접근 권한 최소화 및 내부 관리 강화</li>
            <li>보안 시스템 운영(해킹, 분실, 유출 방지)</li>
            <li>임직원 보안 교육 실시</li>
          </ul>
        </div>

        {/* 9. 쿠키 정책
        <div>
          <h2 className="text-2xl font-semibold mb-3">9. 쿠키(Cookie) 정책</h2>

          <ul className="list-disc pl-6 space-y-1">
            <li>서비스 편의를 위해 쿠키를 사용합니다.</li>
            <li>수집 정보: 접속 기기 정보, 이용 기록 등</li>
            <li>브라우저 설정을 통해 쿠키 수집 거부 가능</li>
          </ul>
        </div> */}

        {/* 9. 정책 변경 */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">9. 정책 변경</h2>

          <p>
            본 개인정보 처리방침은 법령 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시 웹사이트 또는 앱 내 공지를
            통해 안내합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
