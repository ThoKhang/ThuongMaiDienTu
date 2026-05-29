const Main = () => {
  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 hidden lg:flex flex-col gap-8 self-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-headline font-extrabold text-on-surface leading-tight">
              Gia nhập cộng đồng <br />
              <span className="bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">Linh kiện chuyên nghiệp</span>
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-md">
              Nền tảng giao dịch linh kiện điện tử chính xác dành cho chuyên gia và doanh nghiệp.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <span className="material-symbols-outlined text-primary mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <h3 className="font-headline font-bold text-on-surface">Bảo mật tuyệt đối</h3>
              <p className="text-xs text-on-surface-variant mt-1 font-label uppercase tracking-wider">Mã hóa 256-bit</p>
            </div>
            <div className="p-6 bg-surface-container-lowest rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] translate-y-4">
              <span className="material-symbols-outlined text-secondary mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>precision_manufacturing</span>
              <h3 className="font-headline font-bold text-on-surface">Nguồn hàng gốc</h3>
              <p className="text-xs text-on-surface-variant mt-1 font-label uppercase tracking-wider">Từ phòng thí nghiệm</p>
            </div>
          </div>
          <div className="mt-8 rounded-xl overflow-hidden h-64 relative group">
            <img alt="Electronics Lab" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjpocXwOPa_XkTb3uaU052-gmdcQOTA-_HFTVHjePwkJYDY4DIB95niK8mCE4XIJG5Ep8eWrPkpeLlLqXsGLwHc8Rg38tTYmiToWtcE1HoXP6mxOODAZxW8q7Ks5tSPfmeWPRGyIGJT_wEJJK1pR2i0MSSFdncBTYCObCA-MrjFLQxcNK6lzhTHvF0WL4BNgtn4ZcZirxDaad9f0IxLaF6ILTAnn9efaWEmVVi4FOI79gFZFgHtk5N16DeU17Zk1dza0xat5taSjs" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)]">
          <form className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold">Đăng ký tài khoản</h2>
              <p className="text-on-surface-variant">Chọn loại hình tài khoản để bắt đầu trải nghiệm</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer group">
                <input defaultChecked className="hidden peer" name="role" type="radio" value="buyer" />
                <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-surface-container-low border border-transparent peer-checked:bg-primary-fixed peer-checked:border-primary transition-all duration-200">
                  <span className="material-symbols-outlined text-on-surface group-hover:scale-110 transition-transform">shopping_bag</span>
                  <span className="font-headline font-semibold text-sm">Người mua</span>
                </div>
              </label>
              <label className="cursor-pointer group">
                <input className="hidden peer" name="role" type="radio" value="seller" />
                <div className="flex flex-col items-center gap-3 p-4 rounded-lg bg-surface-container-low border border-transparent peer-checked:bg-primary-fixed peer-checked:border-primary transition-all duration-200">
                  <span className="material-symbols-outlined text-on-surface group-hover:scale-110 transition-transform">storefront</span>
                  <span className="font-headline font-semibold text-sm">Người bán</span>
                </div>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-medium">Họ và tên</label>
                <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="Nguyễn Văn A" type="text" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-medium">Số điện thoại</label>
                <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="0901 234 567" type="tel" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-medium">Địa chỉ Email</label>
                <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="example@precision.vn" type="email" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-medium">Mật khẩu</label>
                <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="••••••••" type="password" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-medium">Xác nhận mật khẩu</label>
                <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="••••••••" type="password" />
              </div>
            </div>
            <div className="pt-6 border-t border-surface-container-high space-y-6" id="seller-info">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                <h3 className="font-headline font-bold text-on-surface">Thông tin cửa hàng</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-medium">Tên cửa hàng/Thương hiệu</label>
                  <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="Lab Components Store" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-medium">Mã số thuế / Định danh</label>
                  <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="MST-0123456789" type="text" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-medium">Địa chỉ trụ sở</label>
                  <input className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="123 Đường Công Nghệ, Quận 1, TP. HCM" type="text" />
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 py-2">
              <input className="mt-1 rounded text-primary focus:ring-primary border-outline-variant/30" type="checkbox" />
              <p className="text-xs text-on-surface-variant leading-relaxed font-body">
                Tôi đồng ý với các 
                <a className="text-primary font-semibold hover:underline" href="#">Điều khoản dịch vụ</a> và <a className="text-primary font-semibold hover:underline" href="#">Chính sách bảo mật</a> của Precision Marketplace.
              </p>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold rounded-lg shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all" type="submit">
              Tạo tài khoản ngay
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-surface-container-high flex flex-col items-center gap-4">
            <span className="text-xs text-on-surface-variant font-label uppercase tracking-widest">Hoặc đăng ký bằng</span>
            <div className="flex gap-4">
              <button className="flex items-center gap-3 px-6 py-2 bg-surface-container-low rounded-full hover:bg-surface-container-high transition-colors">
                <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA67TmHk5BAtkrvZi8Pi0Kjz6xDUcWyC15Nkt1oRz0W1xhr3ql45c4GbsclrQw-Zgu3yhWpUb56Y7YERyLXVaIRuwcSzSOIYFJWF7KSptIRXHWrFgKhzykYTbhnOhWVr3zauZE0_sPNhwBv6Ex7-YMz8lS_I8lLnVSv3LKm90AVvLD8zRHk9mSFUFKgN1IQf8QPB41RPl75LT48EO8GeH6lK3kbXV9UV8mT62wQ6XQbtLOzS-dOoR16GavfV3czxUBNnhKdT2ff1G8" />
                <span className="text-sm font-semibold">Google</span>
              </button>
              <button className="flex items-center gap-3 px-6 py-2 bg-surface-container-low rounded-full hover:bg-surface-container-high transition-colors">
                <img alt="Facebook" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcg-57eUGxOQYdOQn9pmG8pdeyOgp4zFDWgtz1_zG9x6tVUOALhnyCSQH1WYvgu_UufxGpZuimOqXFO99bZHSUAYkytTCYDVj1iLW0c4cUbP4qLDElKb5YQPzQUlqnZ5ORgEZf4VBbaWPhDofIRzpmPHOAcXEQRRzjx3xUstLex7OreN_e90TWP_SWCa74DH-PGR3lKr-ZRHq6ZS-_Jjq0ZRxkCEnZG11h5WKUjWXmx6C6SQBIjIpV7Pz_8M0IEyKkd1tuGxe7pmA" />
                <span className="text-sm font-semibold">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Main;