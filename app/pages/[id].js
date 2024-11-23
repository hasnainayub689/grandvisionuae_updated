// pages/[id].js

import { fetchPropertyData } from '../../fetchPropertyData';

const PropertyPage = ({ propertyData }) => {
    if (!propertyData) {
        return <div>Error loading property data.</div>;
    }

    return (
        <div>
            <h1>{propertyData.title}</h1>
            <p>{propertyData.description}</p>
            {/* Render other property details */}
        </div>
    );
};

export default PropertyPage;

export async function getStaticPaths() {
    const allProperties = await fetchPropertyData({}); // You can fetch a list of properties to generate paths
    const paths = allProperties.map((property) => ({
        params: { id: property.id.toString() },
    }));

    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
    const payload = { id: params.id }; // Create a dynamic payload
    let propertyData = null;

    try {
        propertyData = await fetchPropertyData(payload);
    } catch (error) {
        console.error(error);
    }

    return {
        props: {
            propertyData, // Pass fetched data to page component
        },
        revalidate: 60, // Optional: ISR for regenerating pages
    };
}
