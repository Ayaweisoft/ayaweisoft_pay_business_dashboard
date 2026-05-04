// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 md:px-12 py-10 text-sm text-white/40 bg-[#0B1220]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        
        <div>
          <h4 className="text-white font-semibold mb-2">Ayaweisoft Pay</h4>
          <p className="max-w-sm">
            Financial infrastructure for modern African fintech products.
          </p>
        </div>

        <div className="flex gap-10">
          <div>
            <p className="text-white mb-2">Product</p>
            <ul className="space-y-1">
              <li><a href="/developers">Developers</a></li>
              <li><a href="/pricing">Pricing</a></li>
            </ul>
          </div>

          <div>
            <p className="text-white mb-2">Company</p>
            <ul className="space-y-1">
              <li><a href="/company">About</a></li>
              <li><a href="/security">Security</a></li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-center mt-8 text-xs">
        Ayaweisoft Pay is a technology platform. Banking services provided by Mbawula Microfinance Bank.
      </p>
    </footer>
  );
}