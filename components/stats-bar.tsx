export function StatsBar() {
  const stats = [
    { value: "5,00,000+", label: "Learners Trained" },
    { value: "250+", label: "Courses Offered" },
    { value: "750+", label: "Expert Trainers" },
    { value: "50+", label: "Countries Served" },
  ];
  return (
    <div className="bg-brand-950 text-white">
      <div className="container-tight py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white">{s.value}</div>
            <div className="text-sm text-brand-200 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
