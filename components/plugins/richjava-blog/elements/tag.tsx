export default function Tag({ attributes }:any) {
  if (!attributes) return <></>;
  return (
    <div className="tag" key={attributes.name}>
      {attributes.name}
    </div>
  );
}
