export const TinhTrangDuyet = {
  CHO_DUYET: 'ChoDuyet',
  DA_DUYET: 'DaDuyet',
  TU_CHOI: 'TuChoi',
  DA_AN: 'DaAn'
};

export const TinhTrangDuyetLabels = {
  [TinhTrangDuyet.CHO_DUYET]: 'Chờ duyệt',
  [TinhTrangDuyet.DA_DUYET]: 'Đang hiển thị',
  [TinhTrangDuyet.TU_CHOI]: 'Từ chối',
  [TinhTrangDuyet.DA_AN]: 'Đã ẩn'
};

export const TinhTrangDuyetColors = {
  [TinhTrangDuyet.CHO_DUYET]: 'bg-amber-500/10 text-amber-600 border border-amber-500/20',
  [TinhTrangDuyet.DA_DUYET]: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
  [TinhTrangDuyet.TU_CHOI]: 'bg-rose-500/10 text-rose-600 border border-rose-500/20',
  [TinhTrangDuyet.DA_AN]: 'bg-slate-500/10 text-slate-600 border border-slate-500/20'
};
