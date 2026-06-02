import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogin } from '../../../hooks/useAuth';
import { 
  FaMicrochip, 
  FaShieldAlt, 
  FaShippingFast, 
  FaUser, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaArrowRight 
} from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const loginMutation = useLogin();

  const onSubmit = (data) => {
    const payload = {
      tenDangNhap: data.tenDangNhap,
      matKhau: data.matKhau
    };

    loginMutation.mutate(payload, {
      onSuccess: (response) => {
        const roles = response.roles || [];
        const isAdmin = roles.some(role => role.toUpperCase() === 'ROLE_ADMIN');
        
        toast.success('Đăng nhập thành công!');
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    });
  };

  return (
    <main className="min-h-screen flex font-body bg-surface text-on-surface">
      {/* ── LEFT COLUMN: Banner (Visible on lg screen) ── */}
      <section className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#005bbf] to-[#003882] p-12 flex-col justify-between relative overflow-hidden select-none">
        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />

        {/* Top: Logo Card */}
        <div className="flex items-center gap-3 self-start">
          <div className="bg-white rounded-xl p-2.5 shadow-md flex items-center justify-center">
            <FaMicrochip className="text-primary text-2xl" />
          </div>
          <span className="font-headline font-black text-xl text-white tracking-tight">Chợ Linh Kiện</span>
        </div>

        {/* Center: Brand Message */}
        <div className="my-auto space-y-6">
          <h1 className="text-4xl lg:text-5xl font-headline font-extrabold text-white leading-tight">
            Nền tảng linh kiện <br />
            điện tử chính xác.
          </h1>
          <p className="text-white/80 text-base leading-relaxed max-w-md font-light">
            Kết nối các nhà cung cấp linh kiện gốc với các kỹ sư và doanh nghiệp công nghệ hàng đầu. Đơn giản hóa quy trình mua sắm kỹ thuật.
          </p>
        </div>

        {/* Bottom: Feature Cards */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
            <FaShieldAlt className="text-white mb-3 text-2xl" />
            <h3 className="font-headline font-bold text-white text-sm">Nguồn gốc rõ ràng</h3>
            <p className="text-xs text-white/70 mt-1 font-light leading-relaxed">Xác thực 100% linh kiện từ nhà sản xuất gốc.</p>
          </div>
          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
            <FaShippingFast className="text-white mb-3 text-2xl" />
            <h3 className="font-headline font-bold text-white text-sm">Giao hàng nhanh</h3>
            <p className="text-xs text-white/70 mt-1 font-light leading-relaxed">Quy trình logistics tối ưu cho kỹ thuật.</p>
          </div>
        </div>
      </section>

      {/* ── RIGHT COLUMN: Form ── */}
      <section className="w-full lg:w-[55%] flex flex-col justify-between p-8 md:p-16 lg:p-24 bg-white">
        {/* Spacer to push content down */}
        <div className="hidden lg:block h-6" />

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Title Headers */}
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Chào mừng trở lại</h2>
            <p className="text-on-surface-variant text-sm font-light">Vui lòng đăng nhập để tiếp tục với tài khoản của bạn.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">
                Tên đăng nhập hoặc Email
              </label>
              <div className="relative flex items-center">
                <FaUser className="text-on-surface-variant/40 absolute left-4 text-sm" />
                <input
                  {...register('tenDangNhap', { 
                    required: 'Vui lòng nhập tên đăng nhập hoặc email' 
                  })}
                  type="text"
                  placeholder="Nhập tên đăng nhập hoặc email"
                  className={`w-full pl-11 pr-4 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none ${
                    errors.tenDangNhap ? 'ring-1 ring-red-500' : ''
                  }`}
                />
              </div>
              {errors.tenDangNhap && (
                <span className="text-red-500 text-xs font-light">{errors.tenDangNhap.message}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold">
                  Mật khẩu
                </label>
                <Link to="#" className="text-xs font-bold text-primary hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative flex items-center">
                <FaLock className="text-on-surface-variant/40 absolute left-4 text-sm" />
                <input
                  {...register('matKhau', { 
                    required: 'Vui lòng nhập mật khẩu',
                    minLength: { value: 6, message: 'Mật khẩu phải dài từ 6 ký tự' }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-1 focus:ring-primary focus:bg-white transition-all text-sm outline-none ${
                    errors.matKhau ? 'ring-1 ring-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-on-surface-variant/60 hover:text-on-surface transition-colors flex items-center justify-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-base" />
                  ) : (
                    <FaEye className="text-base" />
                  )}
                </button>
              </div>
              {errors.matKhau && (
                <span className="text-red-500 text-xs font-light">{errors.matKhau.message}</span>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2.5 py-1">
              <input
                type="checkbox"
                id="rememberMe"
                className="w-4.5 h-4.5 text-primary focus:ring-primary border-outline-variant/30 rounded cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs text-on-surface-variant cursor-pointer font-light">
                Ghi nhớ đăng nhập trên thiết bị này
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold rounded-xl shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              {loginMutation.isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  Đăng nhập ngay
                  <FaArrowRight className="text-xs" />
                </>
              )}
            </button>
          </form>

          {/* Social Separator */}
          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-[10px] text-on-surface-variant font-label uppercase tracking-widest font-semibold">
              Hoặc tiếp tục với
            </span>
            <div className="flex-grow border-t border-gray-100"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 select-none">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2 0.67-2.92 1.5-.61.7-1.15 1.84-1.01 2.96 1.1.09 2.23-.59 2.94-1.4z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Apple</span>
            </button>
          </div>

          {/* Redirect Register */}
          <div className="text-center text-sm font-light text-on-surface-variant">
            Chưa có tài khoản?{' '}
            <Link to="/dang-ky" className="font-bold text-primary hover:underline">
              Đăng ký tham gia ngay
            </Link>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="text-center text-[10px] text-on-surface-variant/40 font-label uppercase tracking-widest py-6 mt-8">
          © 2024 PRECISION MARKETPLACE. TẤT CẢ QUYỀN ĐƯỢC BẢO LƯU.
        </div>
      </section>
    </main>
  );
};

export default Login;
