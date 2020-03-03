export const createPostRequest = (payload: object) => {
    const request = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    };
    return request;
}


export const invokePostApi = (endpoint: string, payload: object, onResponseReceived:(x: any) => void, onError:(x: any) => void) => {
    console.log("Getting from API: " + endpoint);
    const request = createPostRequest(payload);
    fetch(endpoint, request)
        .then(rawResponse => rawResponse.json())
        .then(response => onResponseReceived(response))
        .catch(error => onError(error));
}