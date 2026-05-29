const Footer = () => {
    return<>
        <footer className="w-full py-12 px-8 border-t border-surface-container-high flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
                <span className="text-sm font-black text-on-surface">© 2024 Precision Marketplace.</span>
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-label">Đối tác linh kiện chuyên nghiệp.</p>
            </div>
            <div className="flex gap-8">
                <a className="text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all" href="#">Về chúng tôi</a>
                <a className="text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all" href="#">Điều khoản</a>
                <a className="text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all" href="#">Bảo mật</a>
                <a className="text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all" href="#">Liên hệ</a>
            </div>
        </footer>
    </>
}
export default Footer
