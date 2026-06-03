import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../configs/api';
import { sanPhamService } from '../../../services/sanPhamService';

const VendorThanhToan = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [transactions, setTransactions] = useState([]);

    // Form state
    const [formData, setFormData] = useState({
        idSanPham: '',
        idClick: '1', // Default or fetched
        soLuong: 0,
        tongGiaTri: '',
        hoaHongNhan: '',
        phuongThucTT: 'Chuyển khoản',
        trangThaiXacThuc: 'ChoDuyet' // Fixed: use exactly 'ChoDuyet' to match Enum dbValue
    });

    const idDoiTac = localStorage.getItem('id') || localStorage.getItem('userId') || 1; // Lấy ID đối tác từ localStorage

    const fetchTransactions = async () => {
        try {
            const res = await api.get(`/api/giaodich-affiliate/doitac/${idDoiTac}`);
            if (Array.isArray(res.data)) {
                setTransactions(res.data);
            }
        } catch (error) {
            console.error("Lỗi khi tải giao dịch", error);
        }
    };

    useEffect(() => {
        // Fetch products of this vendor using the correct service
        const fetchProducts = async () => {
            try {
                const data = await sanPhamService.getPartnerProducts();
                // Assuming data is an array of products or data.content
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data && Array.isArray(data.content)) {
                    setProducts(data.content);
                } else if (data && data.data) {
                    setProducts(data.data);
                }
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm", error);
                toast.error("Không thể tải danh sách sản phẩm.");
            }
        };
        fetchProducts();
        fetchTransactions();
    }, [idDoiTac]);

    const handleProductChange = async (e) => {
        const productId = e.target.value;
        
        let clicks = 0;
        if (productId) {
            try {
                const res = await api.get(`/api/theodoi-click/count/${productId}`);
                clicks = res.data || 0;
            } catch (error) {
                console.error("Lỗi khi tải số lượng click", error);
            }
        }

        setFormData({
            ...formData,
            idSanPham: productId,
            soLuong: clicks // Đã sửa để lấy số lượng click thật từ DB
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                idDoiTac: parseInt(idDoiTac),
                idSanPham: parseInt(formData.idSanPham),
                idClick: parseInt(formData.idClick),
                soLuong: formData.soLuong,
                tongGiaTri: parseFloat(formData.tongGiaTri),
                hoaHongNhan: parseFloat(formData.hoaHongNhan),
                phuongThucTT: formData.phuongThucTT,
                trangThaiXacThuc: formData.trangThaiXacThuc
            };

            // Use the shared api instance which includes Authorization token
            await api.post('/api/giaodich-affiliate', payload);
            toast.success("Tạo thanh toán thành công!");
            setShowModal(false);
            fetchTransactions(); // Refresh list after create
        } catch (error) {
            toast.error("Có lỗi xảy ra khi tạo thanh toán!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        if (status === 'ChoDuyet' || status === 'CHO_DUYET') {
            return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Chờ duyệt</span>;
        }
        if (status === 'ThanhCong' || status === 'THANH_CONG') {
            return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Thành công</span>;
        }
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm min-h-[80vh]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Quản lý thanh toán</h2>
                    <p className="text-slate-500 text-sm mt-1">Tạo và theo dõi các khoản thanh toán hoa hồng affiliate.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Tạo thanh toán
                </button>
            </div>

            {transactions.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    <span className="material-symbols-outlined text-5xl text-slate-300 mb-3">receipt_long</span>
                    <p className="text-slate-500 font-medium">Chưa có giao dịch thanh toán nào.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-y border-slate-100 text-slate-500 text-sm">
                                <th className="py-4 px-4 font-semibold">ID</th>
                                <th className="py-4 px-4 font-semibold">Sản phẩm</th>
                                <th className="py-4 px-4 font-semibold">Số lượng</th>
                                <th className="py-4 px-4 font-semibold">Tổng giá trị</th>
                                <th className="py-4 px-4 font-semibold">Hoa hồng</th>
                                <th className="py-4 px-4 font-semibold">Phương thức TT</th>
                                <th className="py-4 px-4 font-semibold">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-4 text-slate-800 font-medium">#{tx.id}</td>
                                    <td className="py-4 px-4 text-slate-600">{products.find(p => p.id === tx.idSanPham)?.tenSanPham || tx.idSanPham}</td>
                                    <td className="py-4 px-4 text-slate-600">{tx.soLuong}</td>
                                    <td className="py-4 px-4 font-semibold text-slate-800">{tx.tongGiaTri?.toLocaleString()}đ</td>
                                    <td className="py-4 px-4 font-bold text-blue-600">{tx.hoaHongNhan?.toLocaleString()}đ</td>
                                    <td className="py-4 px-4 text-slate-600">{tx.phuongThucTT}</td>
                                    <td className="py-4 px-4">{getStatusBadge(tx.trangThaiXacThuc)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal Tạo Thanh Toán */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-800">Tạo thanh toán Affiliate</h3>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Sản phẩm <span className="text-red-500">*</span></label>
                                <select
                                    name="idSanPham"
                                    value={formData.idSanPham}
                                    onChange={handleProductChange}
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                >
                                    <option value="">-- Chọn sản phẩm của bạn --</option>
                                    {products.map(p => (
                                        <option key={p.id} value={p.id}>{p.tenSanPham}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Số lượng (từ click)</label>
                                    <input
                                        type="number"
                                        name="soLuong"
                                        value={formData.soLuong}
                                        readOnly
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Phương thức TT <span className="text-red-500">*</span></label>
                                    <select
                                        name="phuongThucTT"
                                        value={formData.phuongThucTT}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="Chuyển khoản">Chuyển khoản</option>
                                        <option value="MoMo">Ví MoMo</option>
                                        <option value="ZaloPay">ZaloPay</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tổng giá trị (VNĐ) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        name="tongGiaTri"
                                        value={formData.tongGiaTri}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        placeholder="VD: 500000"
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Hoa hồng nhận (VNĐ) <span className="text-red-500">*</span></label>
                                    <input
                                        type="number"
                                        name="hoaHongNhan"
                                        value={formData.hoaHongNhan}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        placeholder="VD: 50000"
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 rounded-lg font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-5 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {loading ? <span className="material-symbols-outlined animate-spin text-sm">sync</span> : null}
                                    Xác nhận tạo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorThanhToan;
