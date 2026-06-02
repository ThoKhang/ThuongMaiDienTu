import React, { useState, useEffect } from 'react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend, BarChart, Bar, LineChart, Line 
} from 'recharts';
import { FaUserPlus, FaShoppingCart, FaMoneyCheckAlt, FaChartLine, FaInfoCircle } from 'react-icons/fa';
import { adminService } from '../../../services/adminService';
import { toast } from 'react-toastify';

const Dashboard = () => {
    // 1. Khởi tạo State để chứa dữ liệu thật
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    // 2. Tự động gọi API khi vào trang
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const data = await adminService.getDashboardStats();
            setDashboardData(data);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi tải dữ liệu Dashboard:", error);
            toast.error("Không thể tải dữ liệu thống kê!");
            setLoading(false);
        }
    };

    const PIE_COLORS = ['#3B82F6', '#F59E0B', '#10B981'];
    const CHART_BG = '#FFFFFF';

    const StatCard = ({ title, value, icon, color }) => (
        <div style={{ background: CHART_BG, padding: '24px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: `5px solid ${color}` }}>
            <div>
                <p style={{ margin: 0, color: '#6B7280', fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</p>
                <h3 style={{ margin: '8px 0 0', color: '#1E3A8A', fontSize: '28px', fontWeight: '900' }}>{value}</h3>
            </div>
            <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: color, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', boxShadow: `0 4px 10px ${color}60` }}>
                {icon}
            </div>
        </div>
    );

    // Màn hình chờ khi đang tải dữ liệu
    if (loading) {
        return <div style={{ padding: '24px', color: '#1E3A8A', fontWeight: 'bold', fontSize: '18px' }}>Đang tải dữ liệu hệ thống...</div>;
    }

    // Nếu không có dữ liệu, hiển thị thông báo
    if (!dashboardData) {
        return <div style={{ padding: '24px', color: '#EF4444' }}>Không có dữ liệu để hiển thị.</div>;
    }

    return (
        <div style={{ paddingBottom: '40px' }}>
            <div style={{ marginBottom: '32px', background: 'linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)', padding: '24px', borderRadius: '12px', color: '#FFF', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)' }}>
                <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 'bold' }}>Dashboard Tổng Quan</h1>
                <p style={{ margin: 0, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.9 }}>
                    <FaInfoCircle /> Theo dõi hiệu suất kinh doanh, hoa hồng affiliate và tương tác người dùng theo thời gian thực.
                </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '30px' }}>
                <StatCard title="Tổng doanh thu" value={dashboardData.tongDoanhThu || '0 đ'} icon={<FaMoneyCheckAlt />} color="#3B82F6" />
                <StatCard title="Tổng tài khoản" value={dashboardData.tongTaiKhoan || 0} icon={<FaUserPlus />} color="#F59E0B" />
                <StatCard title="Giao dịch mới" value={dashboardData.giaoDichMoi || 0} icon={<FaShoppingCart />} color="#8B5CF6" />
                <StatCard title="Tỷ lệ chuyển đổi" value={dashboardData.tyLeChuyenDoi || '0%'} icon={<FaChartLine />} color="#10B981" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '30px' }}>
                <div style={{ background: CHART_BG, padding: '24px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ margin: '0 0 24px', color: '#1E3A8A', fontSize: '18px', fontWeight: 'bold' }}>Biểu đồ Hoa hồng & Nhập xuất (Triệu VNĐ)</h3>
                    <div style={{ height: '320px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dashboardData.bieuDoDoanhThu || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorHoaHong" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                                <YAxis stroke="#9CA3AF" fontSize={12} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                                <Legend />
                                <Area type="monotone" dataKey="hoaHong" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorHoaHong)" name="Hoa Hồng" />
                                <Area type="monotone" dataKey="nhapXuat" stroke="#F59E0B" strokeWidth={3} fillOpacity={0.2} fill="#FCD34D" name="Nhập Xuất" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ background: CHART_BG, padding: '24px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ margin: '0 0 24px', color: '#1E3A8A', fontSize: '18px', fontWeight: 'bold' }}>Phân bố tài khoản</h3>
                    <div style={{ height: '320px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={dashboardData.phanBoTaiKhoan || []} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                                    {(dashboardData.phanBoTaiKhoan || []).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                <div style={{ background: CHART_BG, padding: '24px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ margin: '0 0 20px', color: '#1E3A8A', fontSize: '16px', fontWeight: 'bold' }}>Top 5 Linh kiện (Triệu)</h3>
                    <div style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dashboardData.topSanPham || []} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6"/>
                                <XAxis type="number" fontSize={12} stroke="#9CA3AF" />
                                <YAxis dataKey="name" type="category" width={90} fontSize={12} stroke="#4B5563" fontWeight="bold" />
                                <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="doanhThu" fill="#8B5CF6" radius={[0, 4, 4, 0]} name="Doanh Thu" barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ background: CHART_BG, padding: '24px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ margin: '0 0 20px', color: '#1E3A8A', fontSize: '16px', fontWeight: 'bold' }}>Tương tác</h3>
                    <div style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dashboardData.bieuDoTuongTac || []} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis dataKey="name" fontSize={12} stroke="#9CA3AF" />
                                <YAxis fontSize={12} stroke="#9CA3AF" />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} />
                                <Legend iconType="circle" />
                                <Line type="monotone" dataKey="click" stroke="#3B82F6" strokeWidth={3} dot={{r: 4}} name="Lượt Click" />
                                <Line type="monotone" dataKey="giaoDich" stroke="#10B981" strokeWidth={3} dot={{r: 4}} name="Giao Dịch" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ background: CHART_BG, padding: '24px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                    <h3 style={{ margin: '0 0 20px', color: '#1E3A8A', fontSize: '16px', fontWeight: 'bold' }}>Giao dịch mới nhất</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {(dashboardData.giaoDichGanDay || []).map((gd) => (
                            <div key={gd.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #E5E7EB', paddingBottom: '12px' }}>
                                <div>
                                    <div style={{ fontWeight: 'bold', color: '#1F2937', fontSize: '14px' }}>{gd.sanPham}</div>
                                    <div style={{ color: '#6B7280', fontSize: '12px', marginTop: '4px' }}>
                                        <span style={{ color: '#3B82F6', fontWeight: 600 }}>@{gd.khachHang}</span> • {gd.thoiGian}
                                    </div>
                                </div>
                                <div style={{ color: '#10B981', fontWeight: '900', fontSize: '15px', background: '#D1FAE5', padding: '4px 8px', borderRadius: '6px' }}>
                                    {gd.hoaHong}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;