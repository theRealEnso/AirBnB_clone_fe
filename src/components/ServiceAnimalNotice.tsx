import React from 'react'

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

export const ServiceAnimalNotice = ({setShowServiceAnimal}) => {
  return (
    <div className="flex flex-col">
        <div className="flex mb-2 cursor-pointer" onClick={() => setShowServiceAnimal(false)}>
            <HighlightOffTwoToneIcon></HighlightOffTwoToneIcon>
        </div>
        <div>
            <img src="https://a0.muscache.com/pictures/adafb11b-41e9-49d3-908e-049dfd6934b6.jpg"></img>
        </div>
        

        <div className="flex flex-col mt-8 space-y-2">
            <h1 className="text-xl font-medium">Service animals</h1>
            <p className="text-sm">Service animals aren't pets, so there's no need to add them here.</p> <br />
            <p>Traveling with an emotional support animal? Check out our <span className="underline font-medium cursor-pointer">accessibility policy.</span></p>
        </div>
    </div>
  )
}
