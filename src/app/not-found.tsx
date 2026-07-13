import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <div>
        <p className="eyebrow">404 — Page not found</p>
        <h1>The route has changed.</h1>
        <p>
          Return to the Demand PR homepage to continue exploring our
          market-entry support.
        </p>
        <Link className="button" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
