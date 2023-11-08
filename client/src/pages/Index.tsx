import CardView from "../components/CardView";

export default function Index({ layout }: { layout: string }) {
  return (
    <div>
      <CardView layout={layout} />
    </div>
  );
}
