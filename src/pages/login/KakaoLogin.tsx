const SVG = `"data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' color='inherit'%3E%3Cpath fill='%23383535' fill-rule='evenodd' d='M12 2C6.478 2 2 5.827 2 10.552c0 3.04 1.855 5.7 4.64 7.223l-.942 3.809a.34.34 0 0 0 .07.325q.085.09.206.091a.28.28 0 0 0 .172-.072l4.054-2.964c.588.092 1.188.143 1.8.143 5.521 0 10-3.828 10-8.555C22 5.828 17.521 2 12 2' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E"`;

function KakaoLogin() {
  return (
    <button
      className="
        flex items-center
        gap-30
        w-96 h-12 px-4
        bg-[#FEE500]
        rounded-xl
        text-[16px] text-black
        hover:bg-[#F3D600]
        active:bg-[#E6C800]
        cursor-pointer
        m-auto
      "
    >
      <span className="w-5 h-5 bg-center bg-cover" style={{backgroundImage: `url(${SVG})`}} aria-hidden />
      <span>카카오 로그인</span>
    </button>
  );
}

export default KakaoLogin;
