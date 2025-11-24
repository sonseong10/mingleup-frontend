import axios, {type AxiosInstance} from 'axios';

export interface IURL {
  BACKEND_URL?: string;
}

export interface IConfig {
  Env?: string;
  Url: IURL;
  token: {
    name: string;
    header: string;
  };
}

export const config: IConfig = {
  Env: import.meta.env.VITE_APP_REACT_APP_UI_ENV,
  token: {
    name: 'token',
    header: 'Authorization',
  },
  Url: {
    BACKEND_URL: import.meta.env.VITE_APP_BACKEND_URL,
  },
};

/**
 * axios 생성
 */
const Http: AxiosInstance = axios.create({
  baseURL: config.Url.BACKEND_URL,
  headers: {
    // 외부에서 처리하는게 맞다고 생각함
    // enctype: "multipart/form-data",
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Accept: 'application/hal+json',
    'Access-Control-Allow-Origin': '*',
  },
  paramsSerializer: {
    encode: encodeURIComponent,
    indexes: null,
  },
});

/**
 * 서버에서 반환되는 JSON 값 설정
 * RES 리턴을 상속 구현으로 변경처리
 */
export interface AbsIRes<T, P = undefined> {
  success?: boolean;
  code: string;
  message: string;
  result?: T;
  page?: P;
  status?: number;
}

export default Http;
