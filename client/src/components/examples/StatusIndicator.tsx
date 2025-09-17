import StatusIndicator from '../StatusIndicator';

export default function StatusIndicatorExample() {
  return (
    <div className="space-y-4 p-4">
      <StatusIndicator status="healthy" label="API Connected" />
      <StatusIndicator status="warning" label="High Latency" />
      <StatusIndicator status="error" label="Database Error" />
      <StatusIndicator status="offline" label="Service Offline" />
    </div>
  );
}