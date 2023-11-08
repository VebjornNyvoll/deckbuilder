import CardView from "../components/CardView";

export default function Index({ layout, filter }: { layout: "grid"|"list" ; filter: string }) {
  return (
    <div>
      <CardView layout={layout} filter={filter} />
    </div>
  );
}
