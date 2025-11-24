export interface IPartyProps {
  party: {
    partyId: number;
    area: string;
    title: string;
    category: string;
    partyImageUrl: string;
    status: string;
  };
}

function PartyItem({party}: IPartyProps) {
  const {area, title, category, partyImageUrl, status} = party;

  return (
    <li className="bg-white overflow-hidden flex flex-col">
      <a href="#" className="relative">
        <div className="mb-3 rounded-lg overflow-hidden">
          <img src={partyImageUrl} alt={title} className="block w-full object-cover" />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-sm text-gray-500">{`${area} · ${category}`}</span>
          <h3 className="font-normal text-lg">{title}</h3>
          <span
            className={`absolute top-2 left-2 mt-auto text-xs font-medium px-2.5 py-1.5 rounded-xl ${
              status === 'recruiting' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {status === 'recruiting' ? '모집중' : '마감'}
          </span>
        </div>
      </a>
    </li>
  );
}

export default PartyItem;
