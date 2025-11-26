import {useEffect} from 'react';
import Http from '../../../utils/HTTP';
import {partyResource} from './dummyAPI';
import PartyItem from './PartyItems';

function PartyList() {
  const parties = partyResource.read();
  const ds = async () => {
    const res = await Http.get('parties?page=1&limit=12');
    console.log(res);
  };

  useEffect(() => {
    ds();
  }, []);

  return (
    <ul className="grid grid-cols-2 gap-8 px-2.5 md:grid-cols-4 md:px-0">
      {parties.map(party => (
        <PartyItem party={party} key={party.partyId} />
      ))}
    </ul>
  );
}

export default PartyList;
