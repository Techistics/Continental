import SalesChart from "../components/SalesChart";

export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Analytics Dashboard</h1>
      <SalesChart />
    </div>
  );
}
