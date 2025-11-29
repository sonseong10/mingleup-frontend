import heroBanner from '../../assets/images/mainbanner.png';
import banner from '../../assets/images/banner.png';
import PartyList from '../party/components/PartyList';

export default function Page() {
  return (
    <>
      <div id="banner" className="w-full flex flex-col items-center bg-[#F9F5F6]">
        <div className="container flex items-center justify-around">
          <div>
            <p className="text-lg md:text-4xl md:mb-4">
              자연스러운 만남,
              <br /> 당신의 리듬에 맞춘 <span className="text-[#F2BED1]">MingleUp</span>
            </p>
            <p className="hidden md:block text-[#787878]">
              MingleUp은 AI가 당신의 취향과 성향에 맞는 사람들과 어울릴 수 있는 파티를 만들어드립니다.
            </p>
          </div>

          <div className="w-40 md:w-94">
            <img src={heroBanner} alt="배너이미지" />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <a href="/party">
          <img src={banner} alt="크리스마스 파티 더보기" />
        </a>
      </div>

      <section className="container">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">MingleUp에서 추천하는 파티</h2>

            <a href="/party" className="px-7 py-3.5 flex justify-between gap-3">
              파티 더보기
              <i
                aria-hidden
                className="block w-5 h-5 bg-no-repeat"
                style={{
                  backgroundImage: `url(
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Crect width='20' height='20' fill='url(%23pattern0_229_1371)'/%3E%3Cdefs%3E%3Cpattern id='pattern0_229_1371' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0_229_1371' transform='scale(0.01)'/%3E%3C/pattern%3E%3Cimage id='image0_229_1371' width='100' height='100' preserveAspectRatio='none' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABzklEQVR4nO3cv0tWURzH8Xc/LCiUIhqahDbHwDl0q2ipxVoa/Af8CxxbWloEFwe3BgehwcHJIYgGCQIJCgIhSF3CIaHMHzxwB7kdx4fvN77vF5zxwgc+POc+955zLkiSJEmSJEmSJEmSJEmSJEnS/+UxsAPsAc+iwwi2gZNu/AWeRweq7tuZQgbjEHgSHaqyR8CfXim/gYfRwSp72v0yzpZyAExHB6vsBXDUK+UXcD86WGWzwHGvlH1gMjpYZXO9QgbjJ3AvOlhl841SdoGJ6GCVvWyU8h24Gx2ssleNUgYPkuPRwaq6ACw2SvkC3IkOV7mUpUYpn4Bb0eGqugS8aZTyEbgZHa6qEeBto5T3wGh0uKquAGuNUt4B16PDVXUN2GiUsg5cjQ5X1RjwoVHKaje1KcANYLNRygpwOSKQ4Daw1ShlGbh43kVTwNfGRQ6GOha6Z5h/fE4Q7qToeG0h5C/EKYtcU5aS3dQ1HP7tTcQHw0R8dZKILxcT8fV7Ii5QJeISbiJuckjGbUCJuFEuEbeSJuJm60Q8jpCIB3YS8UhbIg889JlLf4nbY9GJCvHDAQlMdx8P+AHMRIeRJEmSJEmSJEmSJEmSJEmSxFCdAhjDTCMCd9AjAAAAAElFTkSuQmCC'/%3E%3C/defs%3E%3C/svg%3E"
                  )`,
                }}
              ></i>
            </a>
          </div>

          <div>
            <PartyList serch={{keyworld: '모임'}} />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">크리스마스 솔로탈출 하자! ❤️</h2>

            <a href="/party" className="px-7 py-3.5 flex justify-between gap-3">
              파티 더보기
              <i
                aria-hidden
                className="block w-5 h-5 bg-no-repeat"
                style={{
                  backgroundImage: `url(
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Crect width='20' height='20' fill='url(%23pattern0_229_1371)'/%3E%3Cdefs%3E%3Cpattern id='pattern0_229_1371' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0_229_1371' transform='scale(0.01)'/%3E%3C/pattern%3E%3Cimage id='image0_229_1371' width='100' height='100' preserveAspectRatio='none' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABzklEQVR4nO3cv0tWURzH8Xc/LCiUIhqahDbHwDl0q2ipxVoa/Af8CxxbWloEFwe3BgehwcHJIYgGCQIJCgIhSF3CIaHMHzxwB7kdx4fvN77vF5zxwgc+POc+955zLkiSJEmSJEmSJEmSJEmSJEnS/+UxsAPsAc+iwwi2gZNu/AWeRweq7tuZQgbjEHgSHaqyR8CfXim/gYfRwSp72v0yzpZyAExHB6vsBXDUK+UXcD86WGWzwHGvlH1gMjpYZXO9QgbjJ3AvOlhl841SdoGJ6GCVvWyU8h24Gx2ssleNUgYPkuPRwaq6ACw2SvkC3IkOV7mUpUYpn4Bb0eGqugS8aZTyEbgZHa6qEeBto5T3wGh0uKquAGuNUt4B16PDVXUN2GiUsg5cjQ5X1RjwoVHKaje1KcANYLNRygpwOSKQ4Daw1ShlGbh43kVTwNfGRQ6GOha6Z5h/fE4Q7qToeG0h5C/EKYtcU5aS3dQ1HP7tTcQHw0R8dZKILxcT8fV7Ii5QJeISbiJuckjGbUCJuFEuEbeSJuJm60Q8jpCIB3YS8UhbIg889JlLf4nbY9GJCvHDAQlMdx8P+AHMRIeRJEmSJEmSJEmSJEmSJEmSxFCdAhjDTCMCd9AjAAAAAElFTkSuQmCC'/%3E%3C/defs%3E%3C/svg%3E"
                  )`,
                }}
              ></i>
            </a>
          </div>

          <div>
            <PartyList serch={{keyworld: '호스트'}} />
          </div>
        </div>
      </section>

      <section className="container">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">이색만남을 좋아하는분이라면 👀</h2>

            <a href="/party" className="px-7 py-3.5 flex justify-between gap-3">
              파티 더보기
              <i
                aria-hidden
                className="block w-5 h-5 bg-no-repeat"
                style={{
                  backgroundImage: `url(
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='20' height='20' viewBox='0 0 20 20' fill='none'%3E%3Crect width='20' height='20' fill='url(%23pattern0_229_1371)'/%3E%3Cdefs%3E%3Cpattern id='pattern0_229_1371' patternContentUnits='objectBoundingBox' width='1' height='1'%3E%3Cuse xlink:href='%23image0_229_1371' transform='scale(0.01)'/%3E%3C/pattern%3E%3Cimage id='image0_229_1371' width='100' height='100' preserveAspectRatio='none' xlink:href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABzklEQVR4nO3cv0tWURzH8Xc/LCiUIhqahDbHwDl0q2ipxVoa/Af8CxxbWloEFwe3BgehwcHJIYgGCQIJCgIhSF3CIaHMHzxwB7kdx4fvN77vF5zxwgc+POc+955zLkiSJEmSJEmSJEmSJEmSJEnS/+UxsAPsAc+iwwi2gZNu/AWeRweq7tuZQgbjEHgSHaqyR8CfXim/gYfRwSp72v0yzpZyAExHB6vsBXDUK+UXcD86WGWzwHGvlH1gMjpYZXO9QgbjJ3AvOlhl841SdoGJ6GCVvWyU8h24Gx2ssleNUgYPkuPRwaq6ACw2SvkC3IkOV7mUpUYpn4Bb0eGqugS8aZTyEbgZHa6qEeBto5T3wGh0uKquAGuNUt4B16PDVXUN2GiUsg5cjQ5X1RjwoVHKaje1KcANYLNRygpwOSKQ4Daw1ShlGbh43kVTwNfGRQ6GOha6Z5h/fE4Q7qToeG0h5C/EKYtcU5aS3dQ1HP7tTcQHw0R8dZKILxcT8fV7Ii5QJeISbiJuckjGbUCJuFEuEbeSJuJm60Q8jpCIB3YS8UhbIg889JlLf4nbY9GJCvHDAQlMdx8P+AHMRIeRJEmSJEmSJEmSJEmSJEmSxFCdAhjDTCMCd9AjAAAAAElFTkSuQmCC'/%3E%3C/defs%3E%3C/svg%3E"
                  )`,
                }}
              ></i>
            </a>
          </div>

          <div>
            <PartyList serch={{keyworld: '게임'}} />
          </div>
        </div>
      </section>
    </>
  );
}
