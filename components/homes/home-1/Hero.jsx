import FilterTab from '@/components/common/FilterTab';
import WordEffect1 from '@/components/common/WordEffect1';

export default function Hero() {
    return (
        <section className="flat-slider home-1">
            <div className="container relative" url="">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="slider-content">
                            <div className="heading text-center">
                                <div className="title-large text-white animationtext slide">
                                    Find Your{' '}
                                    <WordEffect1
                                        string={[
                                            'Dream Home in Dubai',
                                            'Perfect Home',
                                        ]}
                                    />
                                </div>
                                <p
                                    className="subtitle text-white body-2 wow fadeInUp"
                                    data-wow-delay=".2s"
                                >
                                    At Grand Vision Real Estate, we’re here to
                                    make your property journey in Dubai
                                    seamless, from Residential to Commercial,
                                    Off-Plan, and International Properties, let
                                    us help you find the perfect fit!
                                </p>
                            </div>
                            <FilterTab />
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay" />
        </section>
    );
}
