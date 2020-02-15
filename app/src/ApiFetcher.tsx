import React from 'react';
import ZincContentInterface from './zinc/zincContentInterface';

interface ApiFetcherProps {
    zincContent: ZincContentInterface
}

const ApiFetcher: React.FC<ApiFetcherProps> = (props) => {

    const [payload, setPayload] = React.useState("Unknown State");

    const onUseEffect = () => {
        const apiUrl: string = props.zincContent.getEndpoint("example")
        console.log("Getting from API: " + apiUrl);
        fetch(apiUrl, {method: "GET"})
            .then(res => res.json())
            .then(response => {
                setPayload(response.body)
            })
            .catch(error => console.log(error));
    }

    React.useEffect(onUseEffect);

    return <div>
        This is the API Fetcher! {payload}
    </div>
}

export default ApiFetcher;