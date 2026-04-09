import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon, trend }) => (
  <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
    <div className="d-flex justify-between items-center" style={{ marginBottom: '1rem' }}>
      <span style={{ color: 'var(--text-light)', fontWeight: '500' }}>{title}</span>
      <div style={{ padding: '0.5rem', background: 'rgba(10, 88, 202, 0.1)', borderRadius: '8px', color: 'var(--primary-color)' }}>
        {icon}
      </div>
    </div>
    <div className="d-flex items-center gap-4">
      <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-dark)' }}>{value}</span>
      {trend && (
        <span style={{ color: '#10B981', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
          <TrendingUp size={16} style={{ marginRight: '4px' }} />
          {trend}
        </span>
      )}
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '2rem' }}>
        Tổng quan gian hàng
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <StatCard title="Tổng doanh thu" value="124.5Tr ₫" icon={<DollarSign size={24} />} trend="+15%" />
        <StatCard title="Đơn hàng mới" value="45" icon={<ShoppingCart size={24} />} trend="+5%" />
        <StatCard title="Sản phẩm đang bán" value="120" icon={<Package size={24} />} />
        <StatCard title="Lượt truy cập" value="3,200" icon={<TrendingUp size={24} />} trend="+22%" />
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Đơn hàng gần đây</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              <th style={{ padding: '1rem 0', color: 'var(--text-light)' }}>Mã ĐH</th>
              <th style={{ padding: '1rem 0', color: 'var(--text-light)' }}>Khách hàng</th>
              <th style={{ padding: '1rem 0', color: 'var(--text-light)' }}>Trạng thái</th>
              <th style={{ padding: '1rem 0', color: 'var(--text-light)' }}>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map(i => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <td style={{ padding: '1rem 0', fontWeight: '600' }}>#ORD-00{i}</td>
                <td style={{ padding: '1rem 0' }}>Nguyễn Văn A</td>
                <td style={{ padding: '1rem 0' }}>
                  <span style={{ padding: '4px 8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600' }}>
                    Hoàn thành
                  </span>
                </td>
                <td style={{ padding: '1rem 0', fontWeight: '600' }}>15,490,000 ₫</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
