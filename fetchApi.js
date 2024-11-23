import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const FetchDataComponent = ({ onDataFetched, payload }) => {
    const [loading, setLoading] = useState(false); // Manage loading state
    const [error, setError] = useState(null); // Manage error state
    const [dataFetched, setDataFetched] = useState(false); // Track if data is already fetched

    // Function to fetch data from API
    const fetchData = useCallback(async () => {
        if (loading || dataFetched) return; // Prevent fetch if already loading or data fetched

        setLoading(true); // Set loading state to true
        setError(null); // Reset error state

        try {
            const response = await axios.post(
                'https://dataapi.pixxicrm.ae/pixxiapi/v1/properties/Grand vision Real Estate LLC',
                payload, // Use dynamic payload passed from the parent
                {
                    headers: {
                        'X-PIXXI-TOKEN': 'gKy0p7-Xu_yev5yRMWCTYhzmLCtSaxT5',
                        'Content-Type': 'application/json',
                    },
                }
            );
            onDataFetched(response.data); // Pass fetched data to parent component
            setDataFetched(true); // Mark data as fetched
        } catch (err) {
            setError('Error fetching data: ' + err.message); // Set error message
        } finally {
            setLoading(false); // Reset loading state after fetching completes
        }
    }, [loading, dataFetched, payload, onDataFetched]); // Fetch data only if payload or loading changes

    // Trigger fetch when payload changes
    useEffect(() => {
        if (payload && !dataFetched) {
            fetchData();
        }
    }, [payload, fetchData, dataFetched]); // Ensure fetchData runs when payload changes and data is not fetched yet

    return null; // No visual output, used only for fetching data
};

export default FetchDataComponent;
