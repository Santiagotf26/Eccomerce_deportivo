import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="loading-spinner-wrap">
      <div className="loading-spinner">
        <div className="loading-spinner__ring" />
        <span className="loading-spinner__logo">K</span>
      </div>
    </div>
  );
}
