import "./SkeletonItem.css";

const SkeletonItem = () => {
	return (
		<div className="skeleton-card">
			<div className="skeleton-image shimmer"></div>
			<div className="skeleton-text shimmer"></div>
			<div className="skeleton-text small shimmer"></div>
		</div>
	);
};

export default SkeletonItem;