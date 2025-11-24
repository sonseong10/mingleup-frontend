import {partyResource} from './dummyAPI';
import PartyItem from './PartyItems';

function PartyList() {
  const parties = partyResource.read();
  return (
    <ul className="grid grid-cols-2 gap-8 px-2.5 md:grid-cols-4 md:px-0">
      {parties.map(party => (
        <PartyItem party={party} key={party.partyId} />
      ))}
    </ul>
  );
}

export default PartyList;
