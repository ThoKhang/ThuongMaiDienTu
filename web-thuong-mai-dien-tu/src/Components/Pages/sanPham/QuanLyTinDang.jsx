import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { sanPhamService } from '../../../services/sanPhamService';
import { TinhTrangDuyet, TinhTrangDuyetLabels, TinhTrangDuyetColors } from '../../../configs/constants';
import {
  FaEye,
  FaCheckCircle,
  FaClock,
  FaEyeSlash,
  FaTimesCircle,
  FaTrashAlt,
  FaEdit,
  FaSearch,
  FaBox,
  FaWarehouse,
  FaPlus
} from 'react-icons/fa';

const QuanLyTinDang = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');

  // Create Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createCategory, setCreateCategory] = useState('');
  const [createBrand, setCreateBrand] = useState('');
  const [createPrice, setCreatePrice] = useState('');
  const [createPromoPrice, setCreatePromoPrice] = useState('');
  const [createStock, setCreateStock] = useState('');
  const [createSpecs, setCreateSpecs] = useState('');
  const [createAffiliate, setCreateAffiliate] = useState('');
  const [createUrl, setCreateUrl] = useState('');
  const [createImageFile, setCreateImageFile] = useState(null);
  const [createDescription, setCreateDescription] = useState('');

  // Edit Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form states for Editing
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editBrand, setEditBrand] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editPromoPrice, setEditPromoPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editSpecs, setEditSpecs] = useState('');
  const [editAffiliate, setEditAffiliate] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Fetch partner products
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['partnerProducts'],
    queryFn: sanPhamService.getPartnerProducts
  });

  // Fetch Categories for Edit Dropdown
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: sanPhamService.getCategories
  });

  // Fetch Brands for Edit Dropdown
  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: sanPhamService.getBrands
  });

  // Mutation for deleting product
  const deleteMutation = useMutation({
    mutationFn: sanPhamService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnerProducts'] });
      Swal.fire('Thành công', 'Đã xóa sản phẩm thành công!', 'success');
    },
    onError: (err) => {
      Swal.fire('Lỗi', err.response?.data || 'Không thể xóa sản phẩm.', 'error');
    }
  });

  // Mutation for updating stock
  const updateStockMutation = useMutation({
    mutationFn: ({ id, stock }) => sanPhamService.updateStock(id, stock),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnerProducts'] });
      Swal.fire('Thành công', 'Đã cập nhật tồn kho thành công!', 'success');
    },
    onError: (err) => {
      Swal.fire('Lỗi', err.response?.data || 'Không thể cập nhật tồn kho.', 'error');
    }
  });

  // Mutation for updating status
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => sanPhamService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnerProducts'] });
      Swal.fire('Thành công', 'Thay đổi trạng thái tin đăng thành công!', 'success');
    },
    onError: (err) => {
      Swal.fire('Lỗi', err.response?.data || 'Không thể thay đổi trạng thái.', 'error');
    }
  });

  // Mutation for updating full product details
  const updateProductMutation = useMutation({
    mutationFn: ({ id, productData }) => sanPhamService.updateProduct(id, productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnerProducts'] });
      setIsEditModalOpen(false);
      Swal.fire('Thành công', 'Đã cập nhật thông tin sản phẩm thành công!', 'success');
    },
    onError: (err) => {
      const errorData = err.response?.data;
      const errorMessage = typeof errorData === 'string'
        ? errorData
        : (errorData?.message || JSON.stringify(errorData) || 'Không thể cập nhật sản phẩm.');
      Swal.fire('Lỗi', errorMessage, 'error');
    }
  });

  // Mutation for creating new product
  const createProductMutation = useMutation({
    mutationFn: sanPhamService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnerProducts'] });
      setIsCreateModalOpen(false);
      Swal.fire('Thành công', 'Đăng sản phẩm mới thành công!', 'success');
    },
    onError: (err) => {
      const errorData = err.response?.data;
      const errorMessage = typeof errorData === 'string'
        ? errorData
        : (errorData?.message || JSON.stringify(errorData) || 'Không thể đăng sản phẩm.');
      Swal.fire('Lỗi', errorMessage, 'error');
    }
  });

  // Calculations for stats
  const totalViews = products.reduce((sum, sp) => sum + (sp.clicks || 0), 0);
  const countActive = products.filter(sp => sp.tinhTrangDuyet === TinhTrangDuyet.DA_DUYET && sp.soLuongTon > 0).length;
  const countPending = products.filter(sp => sp.tinhTrangDuyet === TinhTrangDuyet.CHO_DUYET).length;
  const countHidden = products.filter(sp => sp.tinhTrangDuyet === TinhTrangDuyet.DA_AN).length;
  const countRejected = products.filter(sp => sp.tinhTrangDuyet === TinhTrangDuyet.TU_CHOI).length;
  const countOutOfStock = products.filter(sp => sp.soLuongTon === 0).length;

  // Filtered products list
  const filteredProducts = products.filter(sp => {
    // 1. Filter by search term
    const matchesSearch = sp.tenSanPham.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sp.id.toString().includes(searchTerm);
    if (!matchesSearch) return false;

    // 2. Filter by status tab
    if (activeTab === 'ALL') return true;
    if (activeTab === 'ACTIVE') return sp.tinhTrangDuyet === TinhTrangDuyet.DA_DUYET && sp.soLuongTon > 0;
    if (activeTab === 'PENDING') return sp.tinhTrangDuyet === TinhTrangDuyet.CHO_DUYET;
    if (activeTab === 'HIDDEN') return sp.tinhTrangDuyet === TinhTrangDuyet.DA_AN;
    if (activeTab === 'REJECTED') return sp.tinhTrangDuyet === TinhTrangDuyet.TU_CHOI;
    if (activeTab === 'OUT_OF_STOCK') return sp.soLuongTon === 0;

    return true;
  });

  // Action handlers
  const handleDelete = (id, name) => {
    Swal.fire({
      title: 'Xác nhận xóa?',
      text: `Bạn có chắc chắn muốn xóa tin đăng "${name}" không?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Đồng ý xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleUpdateStock = (id, currentStock) => {
    Swal.fire({
      title: 'Cập nhật số lượng tồn kho',
      input: 'number',
      inputValue: currentStock,
      inputAttributes: {
        min: 0,
        step: 1
      },
      showCancelButton: true,
      confirmButtonColor: '#0284c7',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Cập nhật',
      cancelButtonText: 'Hủy',
      inputValidator: (value) => {
        if (!value || parseInt(value) < 0) {
          return 'Vui lòng nhập số lượng hợp lệ (>= 0)!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        updateStockMutation.mutate({ id, stock: parseInt(result.value) });
      }
    });
  };

  const handleToggleStatus = (id, currentStatus) => {
    const isCurrentlyActive = currentStatus === TinhTrangDuyet.DA_DUYET;
    const nextStatus = isCurrentlyActive ? TinhTrangDuyet.DA_AN : TinhTrangDuyet.DA_DUYET;
    const actionText = isCurrentlyActive ? 'ẩn' : 'hiển thị lại';

    Swal.fire({
      title: 'Xác nhận thay đổi?',
      text: `Bạn muốn ${actionText} sản phẩm này trên hệ thống chứ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0284c7',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id, status: nextStatus });
      }
    });
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setEditName(product.tenSanPham || '');
    setEditCategory(product.idDanhMuc || '');
    setEditBrand(product.idThuongHieu || '');
    setEditPrice(product.giaNiemYet || '');
    setEditPromoPrice(product.giaKhuyenMai || '');
    setEditStock(product.soLuongTon || 0);
    setEditSpecs(product.thongSoKyThuat || '');
    setEditAffiliate(product.urlAffiliate || '');
    setEditUrl(product.url || '');
    setEditImageFile(null);
    setEditDescription(product.moTa || '');
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    // Validations
    if (!editName.trim()) {
      Swal.fire('Lỗi', 'Tên sản phẩm không được để trống!', 'error');
      return;
    }
    if (!editCategory) {
      Swal.fire('Lỗi', 'Vui lòng chọn Danh mục!', 'error');
      return;
    }
    if (!editBrand) {
      Swal.fire('Lỗi', 'Vui lòng chọn Thương hiệu!', 'error');
      return;
    }
    if (!editPrice || parseFloat(editPrice) <= 0) {
      Swal.fire('Lỗi', 'Giá niêm yết phải là số dương lớn hơn 0!', 'error');
      return;
    }
    if (editPromoPrice !== '' && editPromoPrice !== null && parseFloat(editPromoPrice) < 0) {
      Swal.fire('Lỗi', 'Giá khuyến mãi phải lớn hơn hoặc bằng 0!', 'error');
      return;
    }
    if (editPromoPrice !== '' && editPromoPrice !== null && parseFloat(editPromoPrice) > parseFloat(editPrice)) {
      Swal.fire('Lỗi', 'Giá khuyến mãi không được lớn hơn giá niêm yết!', 'error');
      return;
    }
    if (editStock === '' || parseInt(editStock) < 0) {
      Swal.fire('Lỗi', 'Số lượng tồn kho phải lớn hơn hoặc bằng 0!', 'error');
      return;
    }
    if (!editAffiliate.trim()) {
      Swal.fire('Lỗi', 'Link Affiliate không được để trống!', 'error');
      return;
    }

    setIsUploading(true);
    let finalUrl = editUrl;
    try {
      if (editImageFile) {
        finalUrl = await sanPhamService.uploadImage(editImageFile);
      }
    } catch (err) {
      setIsUploading(false);
      Swal.fire('Lỗi', 'Không thể tải ảnh lên server!', 'error');
      return;
    }
    setIsUploading(false);

    const productData = {
      idDanhMuc: parseInt(editCategory),
      idThuongHieu: parseInt(editBrand),
      tenSanPham: editName,
      thongSoKyThuat: editSpecs,
      giaNiemYet: parseFloat(editPrice),
      giaKhuyenMai: (editPromoPrice !== '' && editPromoPrice !== null) ? parseFloat(editPromoPrice) : null,
      soLuongTon: parseInt(editStock),
      urlAffiliate: editAffiliate,
      url: finalUrl,
      moTa: editDescription,
      tinhTrangDuyet: selectedProduct.tinhTrangDuyet
    };

    updateProductMutation.mutate({ id: selectedProduct.id, productData });
  };

  const handleOpenCreateModal = () => {
    setCreateName('');
    setCreateCategory('');
    setCreateBrand('');
    setCreatePrice('');
    setCreatePromoPrice('');
    setCreateStock('');
    setCreateSpecs('');
    setCreateAffiliate('');
    setCreateUrl('');
    setCreateImageFile(null);
    setCreateDescription('');
    setIsCreateModalOpen(true);
  };

  const handleSaveCreate = async (e) => {
    e.preventDefault();

    // Validations
    if (!createName.trim()) {
      Swal.fire('Lỗi', 'Tên sản phẩm không được để trống!', 'error');
      return;
    }
    if (!createCategory) {
      Swal.fire('Lỗi', 'Vui lòng chọn Danh mục!', 'error');
      return;
    }
    if (!createBrand) {
      Swal.fire('Lỗi', 'Vui lòng chọn Thương hiệu!', 'error');
      return;
    }
    if (!createPrice || parseFloat(createPrice) <= 0) {
      Swal.fire('Lỗi', 'Giá niêm yết phải là số dương lớn hơn 0!', 'error');
      return;
    }
    if (createPromoPrice !== '' && createPromoPrice !== null && parseFloat(createPromoPrice) < 0) {
      Swal.fire('Lỗi', 'Giá khuyến mãi phải lớn hơn hoặc bằng 0!', 'error');
      return;
    }
    if (createPromoPrice !== '' && createPromoPrice !== null && parseFloat(createPromoPrice) > parseFloat(createPrice)) {
      Swal.fire('Lỗi', 'Giá khuyến mãi không được lớn hơn giá niêm yết!', 'error');
      return;
    }
    if (createStock === '' || parseInt(createStock) < 0) {
      Swal.fire('Lỗi', 'Số lượng tồn kho phải lớn hơn hoặc bằng 0!', 'error');
      return;
    }
    if (!createAffiliate.trim()) {
      Swal.fire('Lỗi', 'Link Affiliate không được để trống!', 'error');
      return;
    }

    setIsUploading(true);
    let finalUrl = createUrl;
    try {
      if (createImageFile) {
        finalUrl = await sanPhamService.uploadImage(createImageFile);
      }
    } catch (err) {
      setIsUploading(false);
      Swal.fire('Lỗi', 'Không thể tải ảnh lên server!', 'error');
      return;
    }
    setIsUploading(false);

    const userId = localStorage.getItem('id') || localStorage.getItem('userId') || 1;

    const productData = {
      idDanhMuc: parseInt(createCategory),
      idDoiTac: parseInt(userId),
      idThuongHieu: parseInt(createBrand),
      tenSanPham: createName,
      thongSoKyThuat: createSpecs,
      giaNiemYet: parseFloat(createPrice),
      giaKhuyenMai: (createPromoPrice !== '' && createPromoPrice !== null) ? parseFloat(createPromoPrice) : null,
      soLuongTon: parseInt(createStock),
      urlAffiliate: createAffiliate,
      url: finalUrl,
      moTa: createDescription
    };

    createProductMutation.mutate(productData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 max-w-2xl mx-auto mt-12 text-center">
        <h3 className="font-bold text-lg mb-2">Đã xảy ra lỗi khi lấy dữ liệu</h3>
        <p>{error.message || 'Vui lòng kiểm tra lại kết nối server.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Quản lý tin đăng</h1>
          <p className="text-slate-500 text-sm font-light mt-1">Theo dõi, lọc trạng thái duyệt và tối ưu hóa tin bán linh kiện.</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-5 rounded-xl shadow-lg shadow-sky-600/20 active:scale-95 transition-all flex items-center gap-2 self-start md:self-auto text-sm"
        >
          <FaPlus size={12} />
          Đăng sản phẩm mới
        </button>
      </div>

      {/* ── STATS SECTION ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Views */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sky-500 bg-sky-50 p-2.5 rounded-xl w-fit"><FaEye size={20} /></div>
          <p className="text-slate-400 text-xs font-semibold uppercase mt-4 tracking-wider">Tổng lượt xem</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">{totalViews}</h2>
        </div>

        {/* Active */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-emerald-500 bg-emerald-50 p-2.5 rounded-xl w-fit"><FaCheckCircle size={20} /></div>
          <p className="text-slate-400 text-xs font-semibold uppercase mt-4 tracking-wider">Đang hiển thị</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">{countActive}</h2>
        </div>

        {/* Pending */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-amber-500 bg-amber-50 p-2.5 rounded-xl w-fit"><FaClock size={20} /></div>
          <p className="text-slate-400 text-xs font-semibold uppercase mt-4 tracking-wider">Chờ duyệt</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">{countPending}</h2>
        </div>

        {/* Hidden */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-slate-500 bg-slate-100 p-2.5 rounded-xl w-fit"><FaEyeSlash size={20} /></div>
          <p className="text-slate-400 text-xs font-semibold uppercase mt-4 tracking-wider">Đã ẩn</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">{countHidden}</h2>
        </div>

        {/* Out of Stock */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-purple-500 bg-purple-50 p-2.5 rounded-xl w-fit"><FaWarehouse size={20} /></div>
          <p className="text-slate-400 text-xs font-semibold uppercase mt-4 tracking-wider">Hết hàng / Đã bán</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">{countOutOfStock}</h2>
        </div>

        {/* Rejected */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-rose-500 bg-rose-50 p-2.5 rounded-xl w-fit"><FaTimesCircle size={20} /></div>
          <p className="text-slate-400 text-xs font-semibold uppercase mt-4 tracking-wider">Từ chối</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">{countRejected}</h2>
        </div>
      </div>

      {/* ── FILTER & LIST AREA ── */}
      <div className="bg-white rounded-2xl border border-slate-150 shadow-sm overflow-hidden">
        {/* Filter bar */}
        <div className="p-6 border-b border-slate-100 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <FaSearch className="text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 text-sm" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm theo tên hoặc ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-1 focus:ring-sky-500 focus:bg-white text-sm outline-none transition-all"
              />
            </div>

            {/* Quick Status Tabs */}
            <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-slate-50 rounded-xl border border-slate-100">
              {[
                { id: 'ALL', label: 'Tất cả' },
                { id: 'ACTIVE', label: 'Hiển thị' },
                { id: 'PENDING', label: 'Đang chờ' },
                { id: 'HIDDEN', label: 'Đã ẩn' },
                { id: 'OUT_OF_STOCK', label: 'Hết hàng' },
                { id: 'REJECTED', label: 'Từ chối' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${activeTab === tab.id
                    ? 'bg-white text-sky-600 shadow-sm font-black'
                    : 'text-slate-500 hover:text-slate-800'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center text-slate-400 space-y-3">
              <FaBox size={48} className="mx-auto text-slate-200" />
              <p className="text-base font-semibold text-slate-500">Không tìm thấy sản phẩm nào</p>
              <p className="text-xs text-slate-400 font-light">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <th className="py-4 px-6">Sản phẩm</th>
                  <th className="py-4 px-4">Giá bán</th>
                  <th className="py-4 px-4 text-center">Tồn kho</th>
                  <th className="py-4 px-4 text-center">Lượt xem</th>
                  <th className="py-4 px-4">Trạng thái</th>
                  <th className="py-4 px-6 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {filteredProducts.map(sp => {
                  const isOutOfStock = sp.soLuongTon === 0;
                  const label = isOutOfStock ? 'Hết hàng' : TinhTrangDuyetLabels[sp.tinhTrangDuyet] || sp.tinhTrangDuyet;
                  const colorClass = isOutOfStock
                    ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                    : TinhTrangDuyetColors[sp.tinhTrangDuyet] || 'bg-gray-100 text-gray-700';

                  return (
                    <tr key={sp.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Product Name & ID */}
                      <td className="py-4.5 px-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-100 flex items-center justify-center text-slate-400 overflow-hidden shrink-0">
                            {sp.url ? (
                              <img
                                src={sp.url}
                                alt={sp.tenSanPham}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22300%22%20height%3D%22200%22%20viewBox%3D%220%200%20300%20200%22%3E%3Crect%20fill%3D%22%23eee%22%20width%3D%22300%22%20height%3D%22200%22%2F%3E%3Ctext%20fill%3D%22%23999%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20dy%3D%2210.5%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E";
                                }}
                              />
                            ) : (
                              <span className="material-symbols-outlined text-2xl">photo</span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 line-clamp-1 hover:text-sky-600 cursor-pointer">{sp.tenSanPham}</p>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">SKU: #{sp.id}</p>
                          </div>
                        </div>
                      </td>

                      {/* Prices */}
                      <td className="py-4.5 px-4 font-mono">
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-800">
                            {sp.giaKhuyenMai ? sp.giaKhuyenMai.toLocaleString('vi-VN') : sp.giaNiemYet.toLocaleString('vi-VN')} đ
                          </p>
                          {sp.giaKhuyenMai && (
                            <p className="text-xs text-slate-400 line-through">
                              {sp.giaNiemYet.toLocaleString('vi-VN')} đ
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="py-4.5 px-4 text-center">
                        <button
                          onClick={() => handleUpdateStock(sp.id, sp.soLuongTon)}
                          className={`font-semibold px-3 py-1.5 rounded-lg border font-mono text-xs flex items-center gap-1.5 mx-auto transition-colors cursor-pointer ${isOutOfStock
                            ? 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100'
                            : 'bg-slate-50 border-slate-150 text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                          {sp.soLuongTon}
                          <FaEdit size={10} className="opacity-60" />
                        </button>
                      </td>

                      {/* Views */}
                      <td className="py-4.5 px-4 text-center font-mono font-medium text-slate-600">
                        {sp.clicks || 0}
                      </td>

                      {/* Status badge */}
                      <td className="py-4.5 px-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold tracking-tight uppercase ${colorClass}`}>
                          {label}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4.5 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          {/* Toggle Status (Hide / Show) */}
                          {(sp.tinhTrangDuyet === TinhTrangDuyet.DA_DUYET || sp.tinhTrangDuyet === TinhTrangDuyet.DA_AN) && (
                            <button
                              onClick={() => handleToggleStatus(sp.id, sp.tinhTrangDuyet)}
                              className={`p-2 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${sp.tinhTrangDuyet === TinhTrangDuyet.DA_DUYET
                                ? 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                : 'bg-sky-50 border-sky-100 text-sky-600 hover:bg-sky-100'
                                }`}
                              title={sp.tinhTrangDuyet === TinhTrangDuyet.DA_DUYET ? 'Tạm ẩn tin đăng' : 'Hiển thị lại tin'}
                            >
                              {sp.tinhTrangDuyet === TinhTrangDuyet.DA_DUYET ? 'Ẩn tin' : 'Hiện tin'}
                            </button>
                          )}

                          {/* Edit (disabled for pending) */}
                          <button
                            disabled={sp.tinhTrangDuyet === TinhTrangDuyet.CHO_DUYET}
                            onClick={() => handleOpenEditModal(sp)}
                            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            title="Sửa tin đăng"
                          >
                            <FaEdit size={14} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(sp.id, sp.tenSanPham)}
                            className="p-2 rounded-lg border border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                            title="Xóa tin đăng"
                          >
                            <FaTrashAlt size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── CREATE MODAL ── */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-100 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col scale-in">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Đăng sản phẩm mới</h3>
                <p className="text-slate-500 text-xs mt-0.5">Điền thông tin chi tiết cho sản phẩm</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 p-2 rounded-xl transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined block text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveCreate} className="p-6 space-y-5 flex-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên sản phẩm</label>
                <input
                  type="text"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  placeholder="Nhập tên đầy đủ của sản phẩm..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Danh mục</label>
                  <select
                    value={createCategory}
                    onChange={(e) => setCreateCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all cursor-pointer"
                    required
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.tenDanhMuc}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thương hiệu</label>
                  <select
                    value={createBrand}
                    onChange={(e) => setCreateBrand(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all cursor-pointer"
                    required
                  >
                    <option value="">-- Chọn thương hiệu --</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.tenThuongHieu}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Giá niêm yết (đ)</label>
                  <input
                    type="number"
                    value={createPrice}
                    onChange={(e) => setCreatePrice(e.target.value)}
                    placeholder="Ví dụ: 45000000"
                    min="1"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Giá khuyến mãi (đ - Tùy chọn)</label>
                  <input
                    type="number"
                    value={createPromoPrice}
                    onChange={(e) => setCreatePromoPrice(e.target.value)}
                    placeholder="Bỏ trống nếu không giảm giá..."
                    min="0"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5 md:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tồn kho</label>
                  <input
                    type="number"
                    value={createStock}
                    onChange={(e) => setCreateStock(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đường dẫn Affiliate (Mua hàng)</label>
                  <input
                    type="url"
                    value={createAffiliate}
                    onChange={(e) => setCreateAffiliate(e.target.value)}
                    placeholder="https://cua-hang.com/san-pham"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tải lên ảnh sản phẩm mới</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setCreateImageFile(file);
                  }}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mô tả chi tiết</label>
                <textarea
                  value={createDescription}
                  onChange={(e) => setCreateDescription(e.target.value)}
                  placeholder="Nhập mô tả sản phẩm..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thông số kỹ thuật (Dạng JSON hoặc Text)</label>
                <textarea
                  value={createSpecs}
                  onChange={(e) => setCreateSpecs(e.target.value)}
                  placeholder="Nhập thông số kỹ thuật..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all"
                />
              </div>

              <div className="p-2 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50 -mx-6 -mb-6 p-6 sticky bottom-0 z-10 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-5 py-3 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={createProductMutation.isPending || isUploading}
                  className="bg-sky-600 hover:bg-sky-700 disabled:bg-sky-600/50 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-sky-600/10 active:scale-95 transition-all text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  {(createProductMutation.isPending || isUploading) ? 'Đang xử lý...' : 'Đăng sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── EDIT MODAL ── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-100 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Chỉnh sửa tin đăng</h3>
                <p className="text-slate-500 text-xs mt-0.5">Mã SKU: #{selectedProduct?.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 p-2 rounded-xl transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined block text-xl">close</span>
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveEdit} className="p-6 space-y-5 flex-1">
              {/* Product Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên sản phẩm</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Nhập tên đầy đủ của sản phẩm..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all"
                  required
                />
              </div>

              {/* Category & Brand */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Danh mục</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all cursor-pointer"
                    required
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.tenDanhMuc}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thương hiệu</label>
                  <select
                    value={editBrand}
                    onChange={(e) => setEditBrand(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all cursor-pointer"
                    required
                  >
                    <option value="">-- Chọn thương hiệu --</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.tenThuongHieu}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Niêm Yết & Price Khuyến Mãi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Giá niêm yết (đ)</label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    placeholder="Ví dụ: 45000000"
                    min="1"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Giá khuyến mãi (đ - Tùy chọn)</label>
                  <input
                    type="number"
                    value={editPromoPrice}
                    onChange={(e) => setEditPromoPrice(e.target.value)}
                    placeholder="Bỏ trống nếu không giảm giá..."
                    min="0"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {/* Stock & Affiliate URL */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5 md:col-span-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tồn kho</label>
                  <input
                    type="number"
                    value={editStock}
                    onChange={(e) => setEditStock(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Đường dẫn Affiliate (Mua hàng)</label>
                  <input
                    type="url"
                    value={editAffiliate}
                    onChange={(e) => setEditAffiliate(e.target.value)}
                    placeholder="https://cua-hang.com/san-pham"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all font-mono"
                    required
                  />
                </div>
              </div>

              {/* Đường dẫn ảnh sản phẩm (URL) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cập nhật ảnh sản phẩm (Chọn file mới nếu muốn đổi)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setEditImageFile(file);
                  }}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all font-mono"
                />
              </div>

              {/* Mô tả chi tiết */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mô tả chi tiết</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Nhập mô tả sản phẩm..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all"
                />
              </div>

              {/* Technical Specifications */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thông số kỹ thuật (Dạng JSON hoặc Text)</label>
                <textarea
                  value={editSpecs}
                  onChange={(e) => setEditSpecs(e.target.value)}
                  placeholder="Nhập thông số kỹ thuật..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 focus:bg-white text-sm outline-none transition-all"
                />
              </div>

              {/* Form Actions */}
              <div className="p-2 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50 -mx-6 -mb-6 p-6 sticky bottom-0 z-10 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-3 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={updateProductMutation.isPending || isUploading}
                  className="bg-sky-600 hover:bg-sky-700 disabled:bg-sky-600/50 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-sky-600/10 active:scale-95 transition-all text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  {(updateProductMutation.isPending || isUploading) ? 'Đang xử lý...' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuanLyTinDang;
