'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FetchDataComponent from './../../fetchApi';

// Utility function to format price
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
        style: 'currency',
        currency: 'AED',
        maximumFractionDigits: 0,
    }).format(price);
};

// Utility function to format date
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default function Properties4() {
    const [properties, setProperties] = useState([]);
    const [expandedDescription, setExpandedDescription] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);

    const handleDataFetched = useCallback((data) => {
        if (data?.data?.list && data.data.list.length > 0) {
            const formattedData = data.data.list.map((property) => ({
                id: property.id,
                title: property.title || 'No Title Available',
                description: property.description || 'No description available',
                region: property.region || 'Dubai',
                city: property.city || 'Dubai',
                price: property.price || 0,
                status: property.status || 'ACTIVE',
                developerName: property.developerName || '',
                developerLogo: property.developerLogo || '',
                propertyType: property.propertyType || '',
                coordinates: property.coordinates || { lat: 0, lng: 0 },
                bedrooms: {
                    min: property.newParam?.bedroomMin || 0,
                    max: property.newParam?.bedroomMax || 0,
                },
                area: {
                    min: property.newParam?.minSize || 0,
                    max: property.newParam?.maxSize || 0,
                },
                features: {
                    floorToCeiling: property.features?.floorToCeiling || false,
                    rooftopGarden: property.features?.rooftopGarden || false,
                    modernArchitecture:
                        property.features?.modernArchitecture || false,
                },
                handover: property.handover || '',
                totalUnits: property.totalUnits || 0,
                paymentPlan: property.paymentPlan || {},
                amenities: property.amenities || [],
                images: {
                    main: property.photos?.[0] || '',
                    floorPlans: property.floorPlans || [],
                    gallery: property.photos || [],
                },
                agent: {
                    name: property.agent?.name || 'Unknown Agent',
                    phone: property.agent?.phone || '',
                    email: property.agent?.email || '',
                    avatar: property.agent?.avatar || '/default-avatar.png',
                },
                meta: {
                    listingType: property.listingType || 'New',
                    created: property.createdTime || '',
                    updated: property.updatedTime || '',
                },
            }));
            setProperties(formattedData);
            setDataFetched(true);
        }
    }, []);

    return (
        <section className="property-section">
            {!dataFetched && (
                <FetchDataComponent
                    onDataFetched={handleDataFetched}
                    payload={{ limit: 20 }}
                />
            )}

            <div className="container">
                <div className="section-header text-center">
                    <h2 className="title">Premium Properties</h2>
                    <p className="subtitle">
                        Discover Our Exclusive Collection
                    </p>
                </div>

                {properties.length > 0 ? (
                    <div className="property-grid">
                        {properties.map((property, index) => (
                            <div key={property.id} className="property-card">
                                <div className="property-media">
                                    <Image
                                        src={property.images.main}
                                        alt={property.title}
                                        width={615}
                                        height={405}
                                        className="main-image"
                                    />
                                    <div className="property-tags">
                                        <span className="tag status">
                                            {property.status}
                                        </span>
                                        <span className="tag type">
                                            {property.propertyType}
                                        </span>
                                    </div>
                                    <div className="property-price">
                                        {formatPrice(property.price)}
                                    </div>
                                </div>

                                <div className="property-content">
                                    <h3 className="property-title">
                                        <Link href={`/property/${property.id}`}>
                                            {property.title}
                                        </Link>
                                    </h3>

                                    <div className="property-location">
                                        <i className="icon-location" />
                                        {property.region}, {property.city}
                                    </div>

                                    <div className="property-specs">
                                        <div className="spec">
                                            <i className="icon-bed" />
                                            {`${property.bedrooms.min}-${property.bedrooms.max} Beds`}
                                        </div>
                                        <div className="spec">
                                            <i className="icon-area" />
                                            {`${property.area.min}-${property.area.max} sq.ft`}
                                        </div>
                                    </div>

                                    <div className="property-description">
                                        <p
                                            className={
                                                expandedDescription ===
                                                property.id
                                                    ? 'expanded'
                                                    : ''
                                            }
                                        >
                                            {property.description}
                                        </p>
                                        <button
                                            onClick={() =>
                                                toggleDescription(property.id)
                                            }
                                            className="read-more-btn"
                                        >
                                            {expandedDescription === property.id
                                                ? 'Read Less'
                                                : 'Read More'}
                                        </button>
                                    </div>

                                    <div className="property-agent">
                                        <Image
                                            src={property.agent.avatar}
                                            alt={property.agent.name}
                                            width={40}
                                            height={40}
                                            className="agent-avatar"
                                        />
                                        <div className="agent-info">
                                            <div className="agent-name">
                                                {property.agent.name}
                                            </div>
                                            <div className="agent-contact">
                                                <a
                                                    href={`tel:${property.agent.phone}`}
                                                >
                                                    Call Agent
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="property-meta">
                                        <div className="meta-item">
                                            <i className="icon-calendar" />
                                            Listed:{' '}
                                            {formatDate(property.meta.created)}
                                        </div>
                                        <div className="meta-item">
                                            <i className="icon-home" />
                                            {property.developerName}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-properties">
                        <p>No properties available at the moment</p>
                    </div>
                )}
            </div>

            <style jsx>{`
                .property-section {
                    padding: 4rem 0;
                }

                .property-grid {
                    display: grid;
                    grid-template-columns: repeat(
                        auto-fill,
                        minmax(300px, 1fr)
                    );
                    gap: 2rem;
                    padding: 2rem 0;
                }

                .property-card {
                    border: 1px solid #eee;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.3s ease;
                }

                .property-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }

                .property-media {
                    position: relative;
                }

                .property-tags {
                    position: absolute;
                    top: 1rem;
                    left: 1rem;
                    display: flex;
                    gap: 0.5rem;
                }

                .property-price {
                    position: absolute;
                    bottom: 1rem;
                    right: 1rem;
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                }

                /* Add more styles as needed */
            `}</style>
        </section>
    );
}
