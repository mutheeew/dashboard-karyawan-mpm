export default function LabelName ({ label, value }: { label: string; value: string }) {
    return (
        <div className="mb-2 flex justify-between">
          <p className="text-gray-500">{label}</p>
          <p className="font-medium">{value}</p>
        </div>
    );
}