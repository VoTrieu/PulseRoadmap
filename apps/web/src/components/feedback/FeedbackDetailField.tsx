type FeedbackDetailFieldProps = {
  label: string;
  value: string;
};

function FeedbackDetailField({ label, value }: FeedbackDetailFieldProps) {
  return (
    <div className="grid gap-1">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="text-base font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

export { FeedbackDetailField };
