const SkeletonCategory = () => {
  return (
    <div className="category-skeleton">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="cat-box" />
      ))}
    </div>
  );
};
export default SkeletonCategory;