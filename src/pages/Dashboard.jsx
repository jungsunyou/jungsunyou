import KpiCards from '../components/KpiCards';
import MonthlyChart from '../components/MonthlyChart';
import AttributeChart from '../components/AttributeChart';
import DetailTabs from '../components/DetailTabs';
import MonthlyTable from '../components/MonthlyTable';
import RegionalBreakdown from '../components/RegionalBreakdown';
import ForeignAttributeDetail from '../components/ForeignAttributeDetail';

export default function Dashboard() {
  return (
    <div className="space-y-5">
      <KpiCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <MonthlyChart />
        <AttributeChart />
      </div>
      <DetailTabs />
      <RegionalBreakdown />
      <ForeignAttributeDetail />
      <MonthlyTable />
    </div>
  );
}
