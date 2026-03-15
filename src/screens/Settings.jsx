import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, User, Lock, MapPin, Bell, Mail, FileText, Shield, Trash2, LogOut, CreditCard } from 'lucide-react'

const VENUES = ['Norrköping', 'Östermalm', 'Täby', 'Luleå', 'Göteborg', 'Malmö']

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-[44px] h-[26px] rounded-full relative transition-colors duration-200 cursor-pointer flex-shrink-0 ${
        checked ? 'bg-green-primary' : 'bg-brand-gray-300'
      }`}
    >
      <div
        className="w-[22px] h-[22px] rounded-full bg-white shadow-md absolute top-[2px] transition-transform duration-200"
        style={{ transform: checked ? 'translateX(20px)' : 'translateX(2px)' }}
      />
    </button>
  )
}

function SettingsRow({ icon: Icon, label, onClick, right, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors duration-150 active:bg-brand-gray-100 ${
        danger ? 'text-red-500' : 'text-brand-black'
      }`}
    >
      <Icon size={18} className={danger ? 'text-red-500' : 'text-brand-gray-500'} />
      <span className="text-sm font-medium flex-1 text-left">{label}</span>
      {right || <ChevronRight size={16} className="text-brand-gray-300" />}
    </button>
  )
}

function EditProfileSheet({ onClose }) {
  const [name, setName] = useState('Daniel Svantesson')
  const [email, setEmail] = useState('daniel.svantesson@email.com')
  const [phone, setPhone] = useState('+46 70 123 45 67')

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-white rounded-t-2xl w-full max-w-[393px] pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 rounded-full bg-brand-gray-300" />
        </div>
        <div className="px-5">
          <h3 className="text-lg font-bold text-brand-black mb-4">Edit Profile</h3>
          <label className="block mb-3">
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
            />
          </label>
          <label className="block mb-3">
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
            />
          </label>
          <label className="block mb-5">
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Phone</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
            />
          </label>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-green-primary text-white text-sm font-semibold cursor-pointer transition-transform duration-200 active:scale-[0.97]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

function ChangePasswordSheet({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-white rounded-t-2xl w-full max-w-[393px] pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 rounded-full bg-brand-gray-300" />
        </div>
        <div className="px-5">
          <h3 className="text-lg font-bold text-brand-black mb-4">Change Password</h3>
          <label className="block mb-3">
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Current Password</span>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
            />
          </label>
          <label className="block mb-3">
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">New Password</span>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
            />
          </label>
          <label className="block mb-5">
            <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Confirm New Password</span>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary"
            />
          </label>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full bg-green-primary text-white text-sm font-semibold cursor-pointer transition-transform duration-200 active:scale-[0.97]"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  )
}

function VenueSheet({ onClose, venue, setVenue }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-white rounded-t-2xl w-full max-w-[393px] pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 rounded-full bg-brand-gray-300" />
        </div>
        <div className="px-5">
          <h3 className="text-lg font-bold text-brand-black mb-4">Preferred Venue</h3>
          <div className="flex flex-col gap-1">
            {VENUES.map((v) => (
              <button
                key={v}
                onClick={() => { setVenue(v); onClose() }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors duration-150 ${
                  venue === v ? 'bg-green-primary/10 text-green-primary font-semibold' : 'text-brand-black active:bg-brand-gray-100'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentSheet({ onClose }) {
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4289')
  const [expiry, setExpiry] = useState('09/27')
  const [editing, setEditing] = useState(false)

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" onClick={onClose}>
      <div className="bg-white rounded-t-2xl w-full max-w-[393px] pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1 rounded-full bg-brand-gray-300" />
        </div>
        <div className="px-5">
          <h3 className="text-lg font-bold text-brand-black mb-4">Payment Method</h3>

          {/* Saved card */}
          <div className="rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-4 mb-4">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs text-white/60 font-medium uppercase tracking-wide">Visa</span>
              <div className="flex gap-1">
                <div className="w-6 h-4 rounded-sm bg-[#eb001b] opacity-80" />
                <div className="w-6 h-4 rounded-sm bg-[#f79e1b] opacity-80 -ml-3" />
              </div>
            </div>
            <p className="text-white text-base font-mono tracking-widest mb-4">{cardNumber}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-white/40 uppercase">Cardholder</p>
                <p className="text-white text-xs font-medium">Daniel Svantesson</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase">Expires</p>
                <p className="text-white text-xs font-medium">{expiry}</p>
              </div>
            </div>
          </div>

          {editing ? (
            <>
              <label className="block mb-3">
                <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Card Number</span>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary font-mono"
                />
              </label>
              <div className="flex gap-3 mb-5">
                <label className="flex-1">
                  <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">Expiry</span>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary font-mono"
                  />
                </label>
                <label className="w-24">
                  <span className="text-xs font-semibold text-brand-gray-500 mb-1 block">CVC</span>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-xl bg-brand-gray-100 text-sm text-brand-black outline-none focus:ring-2 focus:ring-green-primary font-mono"
                  />
                </label>
              </div>
              <button
                onClick={() => setEditing(false)}
                className="w-full py-3 rounded-full bg-green-primary text-white text-sm font-semibold cursor-pointer transition-transform duration-200 active:scale-[0.97]"
              >
                Save Card
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="w-full py-3 rounded-full border-2 border-green-primary text-green-primary text-sm font-semibold cursor-pointer transition-transform duration-200 active:scale-[0.97]"
            >
              Change Card
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function DeleteConfirm({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-2xl w-[320px] mx-4 p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-3">
          <Trash2 size={20} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-brand-black text-center mb-1">Delete Account?</h3>
        <p className="text-sm text-brand-gray-500 text-center mb-5">
          This will permanently delete your account, points, and all data. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full border border-brand-gray-300 text-sm font-semibold text-brand-black cursor-pointer transition-transform duration-200 active:scale-[0.97]"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-red-500 text-sm font-semibold text-white cursor-pointer transition-transform duration-200 active:scale-[0.97]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Settings() {
  const navigate = useNavigate()
  const [pushNotifs, setPushNotifs] = useState(true)
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [venue, setVenue] = useState('Norrköping')
  const [sheet, setSheet] = useState(null) // 'profile' | 'password' | 'venue' | 'payment' | 'delete'

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full bg-brand-gray-100 flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-90"
        >
          <ChevronLeft size={18} className="text-brand-black" />
        </button>
        <h1 className="text-xl font-bold text-brand-black">Settings</h1>
      </div>

      {/* Account */}
      <div className="mt-1">
        <p className="px-5 text-xs font-semibold text-brand-gray-500 uppercase tracking-wide mb-1">Account</p>
        <SettingsRow icon={User} label="Edit Profile" onClick={() => setSheet('profile')} />
        <SettingsRow icon={Lock} label="Change Password" onClick={() => setSheet('password')} />
        <SettingsRow
          icon={MapPin}
          label="Preferred Venue"
          onClick={() => setSheet('venue')}
          right={<span className="text-xs text-brand-gray-500 mr-1">{venue}</span>}
        />
        <SettingsRow
          icon={CreditCard}
          label="Payment Method"
          onClick={() => setSheet('payment')}
          right={<span className="text-xs text-brand-gray-500 mr-1">•••• 4289</span>}
        />
      </div>

      <div className="h-[1px] bg-brand-gray-300 mx-5 my-2" />

      {/* Notifications */}
      <div>
        <p className="px-5 text-xs font-semibold text-brand-gray-500 uppercase tracking-wide mb-1">Notifications</p>
        <SettingsRow
          icon={Bell}
          label="Push Notifications"
          onClick={() => setPushNotifs(!pushNotifs)}
          right={<Toggle checked={pushNotifs} onChange={setPushNotifs} />}
        />
        <SettingsRow
          icon={Mail}
          label="Email Marketing"
          onClick={() => setEmailNotifs(!emailNotifs)}
          right={<Toggle checked={emailNotifs} onChange={setEmailNotifs} />}
        />
      </div>

      <div className="h-[1px] bg-brand-gray-300 mx-5 my-2" />

      {/* Legal */}
      <div>
        <p className="px-5 text-xs font-semibold text-brand-gray-500 uppercase tracking-wide mb-1">Legal</p>
        <SettingsRow icon={FileText} label="Privacy Policy" onClick={() => {}} />
        <SettingsRow icon={Shield} label="Terms & Conditions" onClick={() => {}} />
      </div>

      <div className="h-[1px] bg-brand-gray-300 mx-5 my-2" />

      {/* Danger zone */}
      <div>
        <SettingsRow icon={Trash2} label="Delete Account" onClick={() => setSheet('delete')} danger />
        <SettingsRow icon={LogOut} label="Log Out" onClick={() => {}} danger />
      </div>

      {/* App version */}
      <p className="text-center text-xs text-brand-gray-500 mt-6">O'Learys App v1.0.0</p>

      {/* Sheets */}
      {sheet === 'profile' && <EditProfileSheet onClose={() => setSheet(null)} />}
      {sheet === 'password' && <ChangePasswordSheet onClose={() => setSheet(null)} />}
      {sheet === 'venue' && <VenueSheet onClose={() => setSheet(null)} venue={venue} setVenue={setVenue} />}
      {sheet === 'payment' && <PaymentSheet onClose={() => setSheet(null)} />}
      {sheet === 'delete' && <DeleteConfirm onClose={() => setSheet(null)} />}
    </div>
  )
}
