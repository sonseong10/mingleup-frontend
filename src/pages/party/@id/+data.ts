import type {PageContextServer} from 'vike/types';
import {useConfig} from 'vike-react/useConfig';

// Host 정보 타입
export type Host = {
  id: number;
  name: string;
  profileImageUrl: string;
  hostIntro: string;
};

// Party 타입
export type PartyDetail = {
  partyId: number;
  title: string;
  description: string;
  guidelines: string;
  category: string;
  subCategory: string[];
  partyDatetime: string;
  locationName: string;
  locationAddress: string;
  latitude: number;
  longitude: number;
  minParticipants: number;
  maxParticipants: number;
  recruitmentMethod: string;
  entryFee: number;
  tags: string[];
  status: string;
  host: Host;
  hostQuestion: string | null;
};

export type Data = {
  party: PartyDetail;
};

export async function data(pageContext: PageContextServer) {
  const config = useConfig();
  const cookie = pageContext.headers?.cookie ?? '';
  const token = cookie
    .split('; ')
    .find(c => c.startsWith('token='))
    ?.split('=')[1];

  const backendUrl = 'http://13.124.46.70:8080/api/v1';
  const partyId = pageContext.routeParams.id;

  const response = await fetch(`${backendUrl}/parties/${partyId}`, {
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
  });

  const json = await response.json();

  const partyTitle = json?.result?.title ?? '파티상세';

  config({
    title: `Mingleup | ${partyTitle}`,
  });

  return {party: json.result};
}
