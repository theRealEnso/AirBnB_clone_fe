import { useSelector, } from "react-redux";

// import redux selectors
import { selectPlace } from "../redux/places/places-selector";
import { selectSubTotal, selectFinalTotal, selectTotalDays } from "../redux/bookings/booking-selector";

//import material UI icon
import StarIcon from '@mui/icons-material/StarBorder';

export const SummaryViewer = () => {
  const currentPlace = useSelector(selectPlace);
  console.log(currentPlace);

  const subTotal = useSelector(selectSubTotal);
  const finalTotal = useSelector(selectFinalTotal)
  const totalDays = useSelector(selectTotalDays);

  const taxes = .10;

  return (
    <>  
      {
        currentPlace && (
          (() => {
            const {title, photos} = currentPlace;
            return (
              <div className="flex flex-col border rounded-2xl p-4 max-w-[400px] fixed">
                {/* top section */}
                <div className="flex gap-4 items-center border-b pb-4">
                  <div className="flex-none h-24 w-24">
                    <img src={`http://localhost:5000/photo-uploads/${photos[0].photo}`} className="w-full h-full object-cover rounded-2xl"></img>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <h5>{title}</h5>
                    <div className="flex items-center gap-1">
                      <span><StarIcon></StarIcon></span>
                      <p><span>5.0</span> (20 reviews)</p>
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
