import type { CamperDetails, Review } from "@/lib/types";
import { labels, priceLabel } from "@/lib/api";
import { Badges, Meta, Stars } from "./UI";
import Gallery from "./Gallery";
import BookingForm from "./BookingForm";
import s from "./CamperDetail.module.css";

type Props = {
  camper: CamperDetails;
  reviews: Review[];
  reviewsError: string | null;
};

export default function CamperDetail({
  camper,
  reviews,
  reviewsError,
}: Props) {
  const details = [
    ["Form", labels[camper.form]],
    ["Length", camper.length],
    ["Width", camper.width],
    ["Height", camper.height],
    ["Tank", camper.tank],
    ["Consumption", camper.consumption],
  ];

  return (
    <main id="main" className={`container ${s.page}`}>
      <div className={s.top}>
        <Gallery images={camper.gallery} name={camper.name} />

        <div className={s.info}>
          <section className={s.summary}>
            <h1>{camper.name}</h1>

            <Meta camper={camper} reviewsLink />

            <p className={s.price}>{priceLabel(camper.price)}</p>

            <p className={s.description}>{camper.description}</p>
          </section>

          <section
            className={s.specs}
            aria-labelledby="vehicle-details"
          >
            <h2 id="vehicle-details">Vehicle details</h2>

            <Badges camper={camper} full />

            <dl>
              {details.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>

      <h2 className={s.reviewsHeading} id="reviews">
        Reviews
      </h2>

      <div className={s.bottom}>
        <section className={s.reviews} aria-labelledby="reviews">
          {reviewsError ? (
            <p className={s.noReviews}>{reviewsError}</p>
          ) : reviews.length === 0 ? (
            <p className={s.noReviews}>
              No reviews yet. Be the first to take this camper on an
              adventure.
            </p>
          ) : (
            reviews.map((review) => (
              <article className={s.review} key={review.id}>
                <div className={s.reviewTop}>
                  <span className={s.avatar} aria-hidden="true">
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </span>

                  <div>
                    <h3>{review.reviewer_name}</h3>
                    <Stars value={review.reviewer_rating} />
                  </div>
                </div>

                <p>{review.comment}</p>
              </article>
            ))
          )}
        </section>

        <BookingForm camperId={camper.id} />
      </div>
    </main>
  );
}