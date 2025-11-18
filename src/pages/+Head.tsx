// https://vike.dev/Head

import logoUrl from '../assets/favicon/favicon-32x32.png';

export default function HeadDefault() {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/png" href={logoUrl} />
      <meta name="description" content="일상속 자연스러운 만남, 당신의 리듬에 맞춘 MingleUp" />
      <meta name="keywords" />
      <meta name="robots" content="index,follow" />
      <meta name="keywords" content="MingleUp, Dating, Party, 밍글업, 데이팅, 이색만남"></meta>

      {/* pwa */}
      {/* <meta name="theme-color" content="#F2BED1" />
      <link rel="manifest" href="/manifest.webmanifest" /> */}
    </>
  );
}

