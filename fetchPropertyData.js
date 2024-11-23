import axios from 'axios';

export const baseUrl = 'https://dataapi.pixxicrm.ae/';

export const fetchApi = async (url) => {
    // Provide default values for the body to avoid empty body error (500 unknown)
    const requestBody = {
        // Add default values to prevent 500 error
        param1: '1', // Example, replace with actual default params for your API
        param2: '10', // Example, replace with actual default params for your API
    };

    const { data } = await axios.post(url, requestBody, {
        headers: {
            'X-PIXXI-TOKEN': 'gKy0p7-Xu_yev5yRMWCTYhzmLCtSaxT5',
            'Content-Type': 'application/json',
        },
    });

    return data;
};
