import React from 'react';
import ZincContentInterface from '../utils/structure/SiteContentInterface';

interface ApiFetcherProps {
    zincContent: ZincContentInterface
}

const invokeApi = (endpoint: string, onResponseReceived:(x: any) => void, onError:(x: any) => void) => {

    console.log("Getting from API: " + endpoint);
    fetch(endpoint, {method: "GET"})
        .then(res => res.json())
        .then(response => {
            onResponseReceived(response)
        })
        .catch(error => onError(error));

}

const ApiFetcher: React.FC<ApiFetcherProps> = (props) => {

    const [payload, setPayload] = React.useState("Unknown State");
    const apiUrl: string = props.zincContent.getEndpoint("example")

    const onUseEffect = () => {
        invokeApi(apiUrl, setPayload, console.log)
    }
    
    React.useEffect(onUseEffect);

    return <div>
        This is the API Fetcher! {payload}
    </div>
}

export default ApiFetcher;