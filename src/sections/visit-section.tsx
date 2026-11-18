import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { directionsUrl, shop } from "@/config/shop";

export function VisitSection() {
  const mapUrl = `https://maps.google.com/maps?q=${shop.coordinates.latitude},${shop.coordinates.longitude}&z=16&output=embed`;

  return (
    <section aria-labelledby="visit-heading" className="visit-section" id="visit">
      <div className="visit-copy">
        <span className="eyebrow">A warm welcome awaits</span>
        <h2 id="visit-heading">Come by. Stay awhile.</h2>
        <div className="visit-rating">
          <span aria-label={`${shop.rating} out of 5 stars`}>★★★★★</span>
          <span>{shop.rating} Google rating</span>
        </div>
        <div className="visit-detail">
          <MapPin aria-hidden="true" size={16} strokeWidth={1.3} />
          <address>{shop.address}</address>
        </div>
        <div className="visit-hours">
          <span className="eyebrow">Store hours</span>
          {shop.hours.map((entry) => (
            <p key={entry.days}>
              <span>{entry.days}</span>
              <span>{entry.hours}</span>
            </p>
          ))}
        </div>
        <div className="visit-actions">
          <a className="visit-directions" href={directionsUrl} rel="noreferrer" target="_blank">
            Get Directions <ArrowUpRight aria-hidden="true" size={15} />
          </a>
          <a className="visit-call" href={`tel:${shop.phone.replaceAll(" ", "")}`}>
            <Phone aria-hidden="true" size={14} /> Call
          </a>
        </div>
      </div>
      <div className="visit-map">
        <iframe
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          title={`Map to ${shop.name} in Dilsukhnagar, Hyderabad`}
        />
      </div>
    </section>
  );
}
