const SkeletonPopular = () => {
  return (
    <div className="popular-row">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="popular-card-skeleton" />
      ))}
    </div>
  );
};

export default SkeletonPopular;