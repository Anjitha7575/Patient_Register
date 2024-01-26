import React, { useEffect, useState } from "react";

export const useApiFetch = (url) => {
    const [apiDataSuccess, setApiDataSuccess] = useState(false);
    const [apiData, setApiData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetch(url).then((r1) => r1.json()).
            then((res) => {
                setIsLoading(false);
                setApiDataSuccess(true);
                setApiData(res);
            }).catch((err) => {
                setIsLoading(false);
                setErrorMsg('Something Went Wrong!!');
            })

    }, [])

    return { apiData, isLoading, apiDataSuccess, errorMsg };

}