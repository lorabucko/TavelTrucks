import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.overlay}>
      <div
        className={s.panel}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className={s.spinner} aria-hidden="true" />

        <div className={s.text}>
          <p className={s.title}>Loading tracks...</p>

          <p className={s.description}>
            Please wait while we fetch the best
            <br />
            travel trucks for you
          </p>
        </div>
      </div>
    </div>
  );
}