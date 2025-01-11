import { useSelector,} from "react-redux";

// import redux selectors
import { selectSubTotal, selectFinalTotal, selectTotalDays,} from "../redux/bookings/booking-selector";

//import material UI icon
import StarIcon from '@mui/icons-material/StarBorder';

import { Place } from "../redux/places/places-reducer";

//typescript types
type Address = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
export type BookingDetails = {
  bookingDetails: {
    place: Place;
    _id: string;
    email: string;
    phoneNumber?: string;
    finalTotal: number;
    checkInDate: string;
    checkOutDate: string;
    billingDetails: {
      address: Address,
      name: string;
    };
    numberOfNights: number;
    numberOfAdults: number;
    numberOfChildren: number;
    numberOfInfants: number;
    numberOfPets: number;
    createdAt: string;
    updatedAt: string;
  };
};

type SummaryViewerProps =
  | {placeDetails : Place; bookingDetails?: never} //Case 1:  if `placeDetails` is present, then `bookingDetails` is not allowed
  | {bookingDetails: BookingDetails; placeDetails?: never} // Case 2: if `bookingDetails` is present, then `placeDetails` is not allowed


export const SummaryViewer: React.FC<SummaryViewerProps> = ({placeDetails, bookingDetails}) => {
  // console.log(placeDetails);
  const taxes = .10;
  
  const subTotal = useSelector(selectSubTotal);
  const finalTotal = useSelector(selectFinalTotal);
  const totalDays = useSelector(selectTotalDays);

  // const displayValues = useMemo(() => {
  //   const hasUpdates = subTotal !== 0 || finalTotal !== 0 || totalDays !== 0;

  //   if(hasUpdates){
  //     return {
  //       subTotal,
  //       finalTotal,
  //       totalDays,
  //     }
  //   }

  //   return {
  //     subTotal: bookingDetails?.place.price * bookingDetails?.numberOfNights,
  //     finalTotal: bookingDetails?.finalTotal,
  //     totalDays: bookingDetails?.numberOfNights,
  //   };

  // }, [subTotal, finalTotal, totalDays, bookingDetails]);

  return (
    <>  
      {
        placeDetails && (
          (() => {
            const {title, photos, price} = placeDetails;
            return (
              <div className="flex flex-col border rounded-2xl p-4 max-w-[400px] fixed">
                {/* top section */}
                <div className="flex gap-4 items-center border-b pb-4">
                  <div className="flex-none h-24 w-24">
                    <img src={`http://localhost:5000/photo-uploads/${photos[0].photo}`} className="w-full h-full object-cover rounded-2xl"></img>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h5>{title}</h5>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span><StarIcon></StarIcon></span>
                        <p><span>5.0</span> (20 reviews)</p>
                      </div>
                      <h5 className="pl-6 tracking-wide">{`$${price} per night`}</h5>
                    </div>
                  </div>
                </div>
          
                {/* middle section */}
                <div className="flex flex-col border-b pb-2">
                  <h3 className="my-4 font-semibold tracking-wide">Your total</h3>

                  <div className="flex justify-between space-y-2">
                    <p>{`${totalDays} nights`}</p>
                    <p>{`$${subTotal}`}</p>
                  </div>

                  <div className="flex items-center justify-between space-y-2">
                    <p>Taxes</p>
                    <p>{`$${subTotal * taxes}`}</p>
                  </div>
                </div>
          
                {/* bottom section */}
                <div className="flex flex-col mt-4 space-y-2">
                  <div className="flex justify-between">
                    <p className="font-semibold">Total <span className="underline">(USD)</span></p>
                    <p>{`$${finalTotal}`}</p>
                  </div>
                  <div className="flex justify-end cursor-pointer">
                    <p className="underline font-bold">Price breakdown</p>
                  </div>
                </div>
              </div>
            )
          })()
        )
      }
      {
        bookingDetails && (
          (() => {
            const {place, numberOfNights} = bookingDetails;

            // if(bookingDetails){
            //   dispatch(setSubTotal(bookingDetails.place.price * bookingDetails * bookingDetails.numberOfNights));
            //   dispatch(setFinalTotal(bookingDetails.finalTotal));
            //   dispatch(setTotalDays(bookingDetails.numberOfNights));
            // }

            return (
              <div className="flex flex-col border rounded-2xl p-4 max-w-[400px] fixed">
                {/* top section */}
                <div className="flex gap-4 items-center border-b pb-4">
                  <div className="flex-none h-24 w-24">
                    <img src={`http://localhost:5000/photo-uploads/${place.photos[0].photo}`} className="w-full h-full object-cover rounded-2xl"></img>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h5>{place.title}</h5>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span><StarIcon></StarIcon></span>
                        <p><span>5.0</span> (20 reviews)</p>
                      </div>
                      <h5 className="pl-6 tracking-wide">{`$${place.price} per night`}</h5>
                    </div>
                  </div>
                </div>
          
                {/* middle section */}
                <div className="flex flex-col border-b pb-2">
                  <h3 className="my-4 font-semibold tracking-wide">Your total</h3>

                  <div className="flex justify-between space-y-2">
                    <p>{`${totalDays} nights`}</p>
                    <p>{`$${subTotal}`}</p>
                  </div>
                  <div className="flex items-center justify-between space-y-2">
                    <p>Taxes</p>
                    <p>{`$${subTotal * taxes}`}</p>
                  </div>
                </div>
          
                {/* bottom section */}
                <div className="flex flex-col mt-4 space-y-2">
                  <div className="flex justify-between">
                    <p className="font-semibold">Total <span className="underline">(USD)</span></p>
                    <p>{`$${finalTotal}`}</p>
                  </div>
                  <div className="flex justify-end cursor-pointer">
                    <p className="underline font-bold">Price breakdown</p>
                  </div>
                </div>
              </div>
            )
          })()
        )
      }
    </>
  );
};
