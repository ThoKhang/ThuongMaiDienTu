import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { sanPhamService } from '../../../services/sanPhamService';
import {
    AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell
} from 'recharts';

// ── Stat Card ──────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, color }) => (
    <div className="relative overflow-hidden rounded-2xl p-6 flex flex-col gap-2 shadow-sm bg-white border border-slate-50">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-1"
            style={{ background: color + '1A' }}>
            <span className="material-symbols-outlined text-2xl" style={{ color }}>{icon}</span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
        <p className="text-3xl font-extrabold text-slate-800 leading-none">{value ?? '—'}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
);

// ── Badge trạng thái ────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const map = {
        DaDuyet:  { label: 'Đã duyệt',  cls: 'bg-emerald-100 text-emerald-700' },
        ChoDuyet: { label: 'Chờ duyệt', cls: 'bg-amber-100 text-amber-700' },
        TuChoi:   { label: 'Từ chối',   cls: 'bg-red-100 text-red-600' },
        DaAn:     { label: 'Đã ẩn',     cls: 'bg-slate-100 text-slate-500' },
    };
    const s = map[status] || { label: status || '—', cls: 'bg-slate-100 text-slate-500' };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${s.cls}`}>
            {s.label}
        </span>
    );
};

const STATUS_COLORS = ['#10b981', '#f59e0b', '#ef4444', '#94a3b8'];
const BAR_COLORS   = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'];

const ClickTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-100 shadow-xl rounded-xl px-4 py-3 text-sm">
            <p className="text-slate-400 text-xs mb-1">{label}</p>
            <p className="font-bold text-indigo-600">{payload[0].value} lượt click</p>
        </div>
    );
};

// ────────────────────────────────────────────────────────────
const VendorDashboard = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['vendorDashboard'],
        queryFn: sanPhamService.getVendorDashboard,
        staleTime: 60_000,
        retry: 1,
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
                <p className="text-slate-400 text-sm">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (isError) {
        const errMsg = error?.response?.data?.message || error?.message || 'Lỗi không xác định';
        return (
            <div className="flex flex-col items-center justify-center py-32 gap-3">
                <span className="material-symbols-outlined text-5xl text-red-400">error</span>
                <p className="text-slate-600 font-semibold">Không thể tải dữ liệu dashboard</p>
                <p className="text-slate-400 text-sm max-w-sm text-center">{errMsg}</p>
                <button
                    onClick={() => refetch()}
                    className="mt-2 px-5 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    const d = data || {};

    const tinDangData = [
        { name: 'Đã duyệt',  value: Number(d.soTinDangDaDuyet  || 0) },
        { name: 'Chờ duyệt', value: Number(d.soTinDangChoDuyet || 0) },
        { name: 'Từ chối',   value: Number(d.soTinDangTuChoi   || 0) },
        { name: 'Đã ẩn',     value: Number(d.soTinDangDaAn     || 0) },
    ].filter(i => i.value > 0);

    const totalTin = tinDangData.reduce((s, i) => s + i.value, 0);

    return (
        <div className="space-y-8">
            {/* ── Tiêu đề ── */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Tổng quan cửa hàng</h1>
                    <p className="text-slate-400 text-sm mt-0.5">Báo cáo hoạt động kinh doanh của bạn</p>
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 rounded-xl px-4 py-2">
                    <span className="material-symbols-outlined text-indigo-500 text-lg">calendar_today</span>
                    <span className="text-indigo-700 text-sm font-semibold">7 ngày gần nhất</span>
                </div>
            </div>

            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                    icon="ads_click"
                    label="Tổng lượt click"
                    value={(d.tongLuotClick ?? 0).toLocaleString('vi-VN')}
                    sub="Trên tất cả sản phẩm"
                    color="#6366f1"
                />
                <StatCard
                    icon="receipt_long"
                    label="Giao dịch"
                    value={(d.tongGiaoDich ?? 0).toLocaleString('vi-VN')}
                    sub="Tổng hoa hồng phát sinh"
                    color="#10b981"
                />
                <StatCard
                    icon="payments"
                    label="Hoa hồng"
                    value={d.tongHoaHong || '0 đ'}
                    sub="Tổng nhận được"
                    color="#f59e0b"
                />
                <StatCard
                    icon="trending_up"
                    label="Tỷ lệ chuyển đổi"
                    value={d.tyLeChuyenDoi || '0.0%'}
                    sub="Click → Giao dịch"
                    color="#3b82f6"
                />
            </div>

            {/* ── Phân bổ tin đăng + Biểu đồ click 7 ngày ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Phân bổ tin đăng */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-50">
                    <h3 className="font-bold text-slate-700 text-sm mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-indigo-500">inventory_2</span>
                        Phân bổ tin đăng
                    </h3>
                    {totalTin === 0 ? (
                        <div className="flex flex-col items-center py-8 text-slate-300 gap-2">
                            <span className="material-symbols-outlined text-4xl">inbox</span>
                            <p className="text-sm">Chưa có tin đăng</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {tinDangData.map((item, idx) => (
                                <div key={item.name}>
                                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                                        <span className="font-medium">{item.name}</span>
                                        <span className="font-bold">{item.value}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div
                                            className="h-2 rounded-full transition-all duration-700"
                                            style={{
                                                width: `${Math.round((item.value / totalTin) * 100)}%`,
                                                background: STATUS_COLORS[idx]
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                            <p className="text-xs text-slate-400 pt-2 text-right">
                                Tổng: <span className="font-bold text-slate-600">{totalTin}</span> tin đăng
                            </p>
                        </div>
                    )}
                </div>

                {/* Biểu đồ click 7 ngày */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-slate-50">
                    <h3 className="font-bold text-slate-700 text-sm mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-indigo-500">show_chart</span>
                        Lượt click theo ngày (7 ngày gần nhất)
                    </h3>
                    {(!d.clickTheo7Ngay || d.clickTheo7Ngay.length === 0) ? (
                        <div className="flex flex-col items-center py-12 text-slate-300 gap-2">
                            <span className="material-symbols-outlined text-5xl">bar_chart</span>
                            <p className="text-sm">Chưa có dữ liệu click</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={d.clickTheo7Ngay} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                                <defs>
                                    <linearGradient id="gradClick" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
                                <Tooltip content={<ClickTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="click"
                                    stroke="#6366f1"
                                    strokeWidth={2.5}
                                    fill="url(#gradClick)"
                                    dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
                                    activeDot={{ r: 6, fill: '#6366f1' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* ── Top sản phẩm + Giao dịch gần đây ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top sản phẩm được click */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-50">
                    <h3 className="font-bold text-slate-700 text-sm mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500">local_fire_department</span>
                        Top sản phẩm được xem nhiều nhất
                    </h3>
                    {(!d.topSanPhamClick || d.topSanPhamClick.length === 0) ? (
                        <div className="flex flex-col items-center py-10 text-slate-300 gap-2">
                            <span className="material-symbols-outlined text-4xl">search_off</span>
                            <p className="text-sm">Chưa có dữ liệu</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={d.topSanPhamClick} layout="vertical"
                                margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                                <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
                                <YAxis dataKey="name" type="category" width={130}
                                    tick={{ fontSize: 11, fill: '#64748b' }}
                                    tickFormatter={(v) => v && v.length > 18 ? v.substring(0, 17) + '…' : v} />
                                <Tooltip
                                    formatter={(v) => [`${v} click`, 'Lượt xem']}
                                    contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
                                />
                                <Bar dataKey="soClick" radius={[0, 6, 6, 0]}>
                                    {d.topSanPhamClick.map((_, i) => (
                                        <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Giao dịch hoa hồng gần đây */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-50">
                    <h3 className="font-bold text-slate-700 text-sm mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-emerald-500">account_balance_wallet</span>
                        Giao dịch hoa hồng gần đây
                    </h3>
                    {(!d.giaoDichGanDay || d.giaoDichGanDay.length === 0) ? (
                        <div className="flex flex-col items-center py-10 text-slate-300 gap-2">
                            <span className="material-symbols-outlined text-4xl">receipt_long</span>
                            <p className="text-sm">Chưa có giao dịch nào</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {d.giaoDichGanDay.map((gd, idx) => (
                                <div key={idx}
                                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50/60 transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-indigo-500 text-base">person</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-slate-700 truncate">
                                                {gd.khachHang}
                                            </p>
                                            <p className="text-xs text-slate-400 truncate">{gd.sanPham}</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0 ml-3">
                                        <p className="text-sm font-bold text-emerald-600">+{gd.hoaHong}</p>
                                        <StatusBadge status={gd.trangThai} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Footer note ── */}
            <div className="flex items-center gap-2 text-xs text-slate-300 pb-4">
                <span className="material-symbols-outlined text-sm">info</span>
                Dữ liệu được cache 60 giây và tự động làm mới khi bạn quay lại trang.
            </div>
        </div>
    );
};

export default VendorDashboard;
