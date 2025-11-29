import {useState} from 'react';
export interface IPartyProps {
  party: {
    partyId: number;
    category: string;
    partyImageUrl: string;
    status: string;
    title: string;
  };
}

function PartyItem({party}: IPartyProps) {
  const {title, category, status, partyId} = party;
  const [isLoaded, setIsLoaded] = useState(false);

  const imgUrl = `https://picsum.photos/300/200?random=${Math.random()}`;

  return (
    <li className="bg-white overflow-hidden flex flex-col">
      <a href={`/party/${partyId}`} className="relative">
        <div className="mb-3 rounded-lg overflow-hidden relative w-full h-[200px] bg-gray-200">
          {/* 스켈레톤 */}
          {!isLoaded && <div className="absolute inset-0 animate-pulse bg-gray-300" />}

          <img
            src={imgUrl}
            alt={title}
            className={`block w-full h-full object-cover transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        <div className="flex flex-col flex-1 relative">
          <span className="text-sm text-gray-500">{category}</span>
          <h3 className="font-normal text-lg">{title}</h3>
        </div>

        <span
          className={`absolute top-2 left-2 mt-auto text-xs font-medium px-2.5 py-1.5 rounded-xl ${
            status !== 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {status !== 'completed' ? '모집중' : '모집완료'}
        </span>
      </a>
    </li>
  );
}

export default PartyItem;
