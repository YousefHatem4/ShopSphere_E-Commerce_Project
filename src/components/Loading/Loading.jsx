import React, { useState } from 'react';
import { CircleLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function Loading() {


    return <>
        <div className="sweet-loading py-60 ">

            <CircleLoader

                color={'#DB4444'}
                loading={Loading}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    </>
}

