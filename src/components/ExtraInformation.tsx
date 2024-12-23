export const ExtraInformation = ({extraInfo, setShowMore}) => {
  return (
    <div style={{whiteSpace: "pre-wrap"}}>
        <div  className="cursor-pointer w-[10%]" onClick={()=> setShowMore(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
        </div>

        <div className="mt-4 space-y-4">
            <h1 className="font-bold text-2xl">Extra Information</h1>
            <p>{extraInfo}</p>
        </div>
        
    </div>
  );
};
