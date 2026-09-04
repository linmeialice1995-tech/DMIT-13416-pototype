import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, X, CreditCard, Wallet, Plus, Check, Wifi } from 'lucide-react';
import { UserProfile } from '../types';
import { SecurityMenuView, SecurityMenuKey } from './views/SecurityMenuView';
import { PasswordVerificationModal, SensitiveTargetType } from './modals/PasswordVerificationModal';

export type SecuritySubView = 'menu' | 'password' | 'pin' | 'withdraw_account' | 'profile' | '2fa';

interface UserProfileSettingsProps {
  user: UserProfile;
  initialSubView?: SecuritySubView;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  onBack?: () => void;
  isMobile?: boolean;
}

export const UserProfileSettings: React.FC<UserProfileSettingsProps> = ({
  user,
  initialSubView = 'menu',
  onUpdateUser,
  onShowToast,
  onBack,
  isMobile,
}) => {
  // Default to 'menu' so the 5 cards from the screenshot show immediately
  const [currentSubView, setCurrentSubView] = useState<SecuritySubView>(initialSubView);

  // Responsive device detection fallback
  const [windowIsMobile, setWindowIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileEffective = isMobile !== undefined ? isMobile : windowIsMobile;

  useEffect(() => {
    if (initialSubView) {
      setCurrentSubView(initialSubView);
    }
  }, [initialSubView]);

  // Password Form State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Pin Form State
  const [currentPin, setCurrentPin] = useState(user.withdrawPassword || '123456');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  // Withdraw Account Form State
  const [bankTab, setBankTab] = useState<'bank' | 'crypto'>('bank');
  const [selectedBank, setSelectedBank] = useState(user.bankName || 'ABBANK');
  const [bankAccountNumber, setBankAccountNumber] = useState(user.fullBankAccount || '01398829142432');
  const [bankBranch, setBankBranch] = useState('台北旗艦分行');
  const [cryptoNetwork, setCryptoNetwork] = useState('PIX-CPF');
  const [cryptoAddress, setCryptoAddress] = useState(user.fullOnlineBankAccount || 'PIX-082914243249021');

  // Pin verification dialog state
  const [pinModalTarget, setPinModalTarget] = useState<SensitiveTargetType | null>(null);

  // 2FA Modal state (matching user uploaded screenshot)
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

  // 2FA Form State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const secretKey2FA = 'JBSWY3DPEHPK3PXP';

  // Local page-scoped reveal state for 基本資料 (starts protected/masked)
  const [isProfileRevealed, setIsProfileRevealed] = useState(false);
  // Track if current visit to this page has been successfully verified/unlocked by password/PIN
  const [isProfileUnlockedInSession, setIsProfileUnlockedInSession] = useState(false);

  // Local page-scoped reveal state for 修改取款帳號 (銀行卡 / 數位銀行, starts protected/masked)
  const [isWithdrawAccountRevealed, setIsWithdrawAccountRevealed] = useState(false);
  const [isWithdrawAccountUnlockedInSession, setIsWithdrawAccountUnlockedInSession] = useState(false);

  // When leaving the subview page, reset authentication and mask state
  useEffect(() => {
    if (currentSubView !== 'profile') {
      setIsProfileRevealed(false);
      setIsProfileUnlockedInSession(false);
    }
    if (currentSubView !== 'withdraw_account') {
      setIsWithdrawAccountRevealed(false);
      setIsWithdrawAccountUnlockedInSession(false);
    }
  }, [currentSubView]);

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      onShowToast('請完整填寫密碼欄位', 'error');
      return;
    }
    if (newPassword.length < 6) {
      onShowToast('新密碼長度需至少 6 位元', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      onShowToast('兩次輸入的新密碼不一致', 'error');
      return;
    }
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    onShowToast('登入密碼修改成功！', 'success');
    setCurrentSubView('menu');
  };

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 6 || !/^\d+$/.test(newPin)) {
      onShowToast('提款密碼需為 6 位純數字', 'error');
      return;
    }
    if (newPin !== confirmPin) {
      onShowToast('兩次輸入的提款密碼不一致', 'error');
      return;
    }
    setCurrentPin(newPin);
    onUpdateUser({ withdrawPassword: newPin });
    setNewPin('');
    setConfirmPin('');
    onShowToast('提款密碼設置成功！', 'success');
    setCurrentSubView('menu');
  };

  const handleSaveWithdrawAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (bankTab === 'bank') {
      if (!bankAccountNumber || bankAccountNumber.length < 8) {
        onShowToast('請輸入正確的銀行帳號', 'error');
        return;
      }
      onUpdateUser({
        bankName: selectedBank,
        bankAccount: `*********${bankAccountNumber.slice(-5)}`,
        fullBankAccount: bankAccountNumber,
      });
      onShowToast('銀行卡取款帳號更新成功！', 'success');
    } else {
      if (!cryptoAddress) {
        onShowToast('請輸入取款地址或電子錢包帳號', 'error');
        return;
      }
      onUpdateUser({
        onlineBankName: cryptoNetwork,
        onlineBankAccount: `*****************${cryptoAddress.slice(-5)}`,
        fullOnlineBankAccount: cryptoAddress,
      });
      onShowToast('線上取款帳號更新成功！', 'success');
    }
    setCurrentSubView('menu');
  };

  const handleToggleProfileVisibility = () => {
    if (isProfileRevealed) {
      // 主動點 👁 重新遮蔽：直接遮蔽，保留當前頁面授權，不用再次輸入密碼
      setIsProfileRevealed(false);
      onShowToast('已重新遮蔽個人資料', 'info');
    } else {
      // 若當前頁面已經驗證過，直接顯示，不用再次輸入密碼
      if (isProfileUnlockedInSession) {
        setIsProfileRevealed(true);
        onShowToast('已解除遮蔽顯示完整資料', 'info');
      } else {
        // 尚未驗證或離開頁面後重新進入，需輸入密碼
        setPinModalTarget('profile');
      }
    }
  };

  const handleToggleWithdrawAccountVisibility = () => {
    if (isWithdrawAccountRevealed) {
      // 主動點 👁 重新遮蔽：直接遮蔽，保留當前頁面授權，不用再次輸入密碼
      setIsWithdrawAccountRevealed(false);
      onShowToast(bankTab === 'bank' ? '已重新遮蔽銀行卡號' : '已重新遮蔽數位銀行帳號', 'info');
    } else {
      // 若當前頁面已經驗證過，直接顯示，不用再次輸入密碼
      if (isWithdrawAccountUnlockedInSession) {
        setIsWithdrawAccountRevealed(true);
        onShowToast(bankTab === 'bank' ? '已解除遮蔽顯示完整卡號' : '已解除遮蔽顯示完整數位銀行帳號', 'info');
      } else {
        // 尚未驗證或離開頁面後重新進入，需輸入密碼
        setPinModalTarget('withdraw');
      }
    }
  };

  const handleVerificationSuccess = () => {
    if (pinModalTarget === 'profile') {
      setIsProfileUnlockedInSession(true);
      setIsProfileRevealed(true);
      setPinModalTarget(null);
      onShowToast('基本資料驗證成功，已解鎖當前頁面所有資料', 'success');
      return;
    }
    if (pinModalTarget === 'withdraw') {
      setIsWithdrawAccountUnlockedInSession(true);
      setIsWithdrawAccountRevealed(true);
      setPinModalTarget(null);
      onShowToast(bankTab === 'bank' ? '銀行卡資料驗證成功，已解鎖完整卡號' : '數位銀行驗證成功，已解鎖完整帳號', 'success');
      return;
    }
  };

  const handleToggle2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!twoFactorEnabled) {
      if (twoFactorCode.length !== 6) {
        onShowToast('請輸入 6 位動態驗證碼', 'error');
        return;
      }
      setTwoFactorEnabled(true);
      setTwoFactorCode('');
      onShowToast('二階段驗證已啟用！', 'success');
      setCurrentSubView('menu');
    } else {
      setTwoFactorEnabled(false);
      onShowToast('已關閉二階段驗證', 'info');
    }
  };

  const handleCopySecretKey = () => {
    navigator.clipboard.writeText(secretKey2FA);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
    onShowToast('金鑰已複製', 'success');
  };

  // Shared Modals (rendered across all sub-views)
  const renderModals = () => (
    <>
      {/* Dedicated 2FA Modal matching user screenshot */}
      <PasswordVerificationModal
        isOpen={is2FAModalOpen}
        onClose={() => setIs2FAModalOpen(false)}
        mode="2fa"
        targetType="2fa"
        titlePrefix="您已開啟"
        highlightText="隱蔽資料"
        titleSuffix="保護"
        subtitle="請打開綁定的認證應用程式獲取驗證碼"
        fieldLabel="二階段驗證碼"
        submitButtonText="登入"
        onSuccess={() => {
          setTwoFactorEnabled(true);
          onShowToast('二階段驗證成功！帳號防護已全面升級', 'success');
        }}
        onShowToast={onShowToast}
      />

      {/* Sensitive Profile PIN Verification Modal */}
      <PasswordVerificationModal
        isOpen={pinModalTarget !== null}
        onClose={() => setPinModalTarget(null)}
        mode="pin"
        targetType={pinModalTarget}
        titlePrefix="您已開啟"
        highlightText="隱蔽資料"
        titleSuffix="保護"
        subtitle="請輸入綁定的取款密碼以解鎖敏感資訊"
        fieldLabel="取款密碼"
        submitButtonText="確認"
        correctPin={user.withdrawPassword || currentPin || '123456'}
        onSuccess={handleVerificationSuccess}
        onShowToast={onShowToast}
      />
    </>
  );

  // Level 1 Overview Menu - Displays the exact 5 cards from the screenshot
  if (currentSubView === 'menu') {
    return (
      <>
        <SecurityMenuView
          isMobile={isMobileEffective}
          onSelectSubView={(sub) => {
            if (sub === '2fa') {
              setIs2FAModalOpen(true);
            } else {
              setCurrentSubView(sub);
            }
          }}
          onClose={onBack}
          twoFactorEnabled={twoFactorEnabled}
        />
        {renderModals()}
      </>
    );
  }

  // Level 2 Sub-view: 基本資料設定 (Profile) - Mobile layout matching screenshot
  if (currentSubView === 'profile' && isMobileEffective) {
    return (
      <div className="w-full flex-1 flex flex-col bg-[#480004] text-white animate-in fade-in duration-150 select-none relative min-h-[580px]">
        {/* Header Bar matching screenshot: Solid Dark Red with Centered "基本資料設定" and White Circle Close Button */}
        <div className="w-full bg-[#8b0000] text-white py-3 px-4 flex items-center justify-center relative shadow-md">
          {/* Centered Title */}
          <h2 className="font-bold text-lg text-white tracking-wider">
            基本資料設定
          </h2>

          {/* White circle with red X close button on the right matching screenshot */}
          <button
            id="btn-close-profile-subview"
            type="button"
            onClick={() => setCurrentSubView('menu')}
            className="absolute right-4 w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#8b0000] hover:bg-gray-100 active:scale-95 transition-transform cursor-pointer shadow-md"
            title="關閉返回"
          >
            <X className="w-4.5 h-4.5 text-[#8b0000] stroke-[3]" />
          </button>
        </div>

        {/* Main Deep Wine Red Container with Centered White Card */}
        <div className="w-full flex-1 bg-[#480004] px-4 py-6 flex flex-col max-w-md mx-auto relative">
          {/* White Card Container matching screenshot with Eye button at top-right */}
          <div className="w-full bg-white rounded-md shadow-md p-5 text-gray-900 relative">
            {/* Field 1: 真实姓名 with Eye Toggle at top-right of the white box */}
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-gray-800">
                <span>真实姓名</span>
                <button
                  id="btn-toggle-profile-visibility"
                  type="button"
                  onClick={handleToggleProfileVisibility}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 active:scale-95 transition-all cursor-pointer inline-flex items-center"
                  title={isProfileRevealed ? '點擊重新遮蔽資料' : (isProfileUnlockedInSession ? '點擊解除遮蔽' : '點擊解鎖檢視完整資料')}
                >
                  {isProfileRevealed ? (
                    <Eye className="w-4.5 h-4.5 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-4.5 h-4.5 text-gray-400" />
                  )}
                </button>
              </div>
              <div className="text-sm text-gray-900 mt-2.5 mb-3 font-normal">
                {user.realName || 'AAA'}
              </div>
              <div className="border-b border-gray-200" />
            </div>

            {/* Field 2: 手机号码 */}
            <div>
              <div className="text-sm font-medium text-gray-800 mt-3.5">
                手机号码
              </div>
              <div 
                className={`text-sm text-gray-900 mt-2.5 mb-3 font-mono ${!isProfileRevealed ? 'cursor-pointer hover:text-sky-600 transition-colors' : ''}`}
                onClick={!isProfileRevealed ? handleToggleProfileVisibility : undefined}
                title={!isProfileRevealed ? '點擊解鎖完整號碼' : undefined}
              >
                {isProfileRevealed
                  ? user.fullPhone || '+62 19801238902'
                  : user.phone || '+62 1980***8902'}
              </div>
              <div className="border-b border-gray-200" />
            </div>

            {/* Field 3: 电子邮箱 */}
            <div>
              <div className="text-sm font-medium text-gray-800 mt-3.5">
                电子邮箱
              </div>
              <div 
                className={`text-sm text-gray-900 mt-2.5 mb-3 font-mono ${!isProfileRevealed ? 'cursor-pointer hover:text-sky-600 transition-colors' : ''}`}
                onClick={!isProfileRevealed ? handleToggleProfileVisibility : undefined}
                title={!isProfileRevealed ? '點擊解鎖完整郵箱' : undefined}
              >
                {isProfileRevealed
                  ? user.fullEmail || 'testuser840926@gmail.com'
                  : user.email || 'te*****om'}
              </div>
              <div className="border-b border-gray-200" />
            </div>

            {/* Field 4: 生日 */}
            <div>
              <div className="text-sm font-medium text-gray-800 mt-3.5">
                生日
              </div>
              <div className="text-sm text-gray-900 mt-2.5 font-normal">
                {user.birthday || '2026/08/20'}
              </div>
            </div>
          </div>

          {/* Right side floating WiFi widget as in screenshot */}
          <div className="fixed right-0 top-[115px] bg-[#33373d]/90 text-white pl-2 pr-1.5 py-1.5 rounded-l-full flex items-center shadow-lg border-y border-l border-white/20 pointer-events-none z-20">
            <Wifi className="w-3.5 h-3.5 text-[#30d2e8]" />
          </div>
        </div>

        {renderModals()}
      </div>
    );
  }

  // Level 2 Sub-views with Back button returning to Level 1 Menu
  return (
    <div className="flex-1 bg-white p-6 sm:p-8 min-h-[460px] flex flex-col justify-start rounded-br-xl">
      {/* Centered / Framed Card matching exact style */}
      <div className="w-full max-w-3xl bg-white rounded-lg border border-gray-300/80 overflow-hidden shadow-xs">
        {/* Navy Header Bar with Back Button on Left and Centered Title */}
        <div className="bg-[#242845] text-white px-4 py-3 flex items-center justify-between relative">
          {/* Back Icon on the far left */}
          <button
            id="btn-back-to-menu"
            onClick={() => setCurrentSubView('menu')}
            title="返回上一頁"
            className="text-white/90 hover:text-white hover:scale-110 active:scale-95 transition-transform cursor-pointer p-1 z-10"
          >
            {/* Exact curved back arrow */}
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 14 4 9l5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
            </svg>
          </button>

          {/* Centered Title */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-sm sm:text-base font-bold tracking-wider text-white">
              {currentSubView === 'password' && '修改密碼'}
              {currentSubView === 'pin' && '修改取款密碼'}
              {currentSubView === 'withdraw_account' && '修改取款帳號'}
              {currentSubView === 'profile' && '基本資料設定'}
              {currentSubView === '2fa' && '二階段驗證'}
            </h2>
          </div>

          {/* Unified Single Eye Toggle for 基本資料設定 & 修改取款帳號 on the far right (Desktop) */}
          {currentSubView === 'profile' ? (
            <button
              id="btn-toggle-profile-visibility"
              type="button"
              onClick={handleToggleProfileVisibility}
              className="z-10 flex items-center space-x-1.5 text-xs text-white bg-white/15 hover:bg-white/25 active:scale-95 px-2.5 py-1 rounded-md transition-all cursor-pointer shadow-2xs"
              title={isProfileRevealed ? '點擊重新遮蔽資料' : (isProfileUnlockedInSession ? '點擊解除遮蔽' : '點擊解鎖檢視完整資料')}
            >
              {isProfileRevealed ? (
                <>
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-emerald-300">遮蔽</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 text-gray-300" />
                  <span className="font-medium text-gray-200">
                    {isProfileUnlockedInSession ? '顯示' : '解鎖'}
                  </span>
                </>
              )}
            </button>
          ) : currentSubView === 'withdraw_account' ? (
            <button
              id="btn-toggle-withdraw-account-visibility"
              type="button"
              onClick={handleToggleWithdrawAccountVisibility}
              className="z-10 flex items-center space-x-1.5 text-xs text-white bg-white/15 hover:bg-white/25 active:scale-95 px-2.5 py-1 rounded-md transition-all cursor-pointer shadow-2xs"
              title={isWithdrawAccountRevealed ? '點擊重新遮蔽帳號' : (isWithdrawAccountUnlockedInSession ? '點擊解除遮蔽' : '點擊解鎖檢視完整帳號')}
            >
              {isWithdrawAccountRevealed ? (
                <>
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium text-emerald-300">遮蔽</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 text-gray-300" />
                  <span className="font-medium text-gray-200">
                    {isWithdrawAccountUnlockedInSession ? '顯示' : '解鎖'}
                  </span>
                </>
              )}
            </button>
          ) : (
            <div className="w-5" />
          )}
        </div>

        {/* 1. 基本資料 View (Desktop Original Table Style) */}
        {currentSubView === 'profile' && (
          <div className="w-full bg-white">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody>
                {/* Row 1: 真實姓名 */}
                <tr className="border-b border-gray-200">
                  <td className="w-1/4 sm:w-1/5 px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
                    真實姓名
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-normal">
                    {user.realName}
                  </td>
                </tr>

                {/* Row 2: 手機號碼 */}
                <tr className="border-b border-gray-200">
                  <td className="w-1/4 sm:w-1/5 px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
                    手機號碼
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-normal">
                    <span 
                      className={`font-mono text-xs sm:text-sm ${!isProfileRevealed ? 'cursor-pointer hover:text-sky-600 transition-colors' : ''}`}
                      onClick={!isProfileRevealed ? handleToggleProfileVisibility : undefined}
                      title={!isProfileRevealed ? '點擊右上角眼睛或點此解鎖完整號碼' : undefined}
                    >
                      {isProfileRevealed
                        ? user.fullPhone || '+62 19801238902'
                        : user.phone}
                    </span>
                  </td>
                </tr>

                {/* Row 3: 電子郵箱 */}
                <tr className="border-b border-gray-200">
                  <td className="w-1/4 sm:w-1/5 px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
                    電子郵箱
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-normal">
                    <span 
                      className={`font-mono text-xs sm:text-sm ${!isProfileRevealed ? 'cursor-pointer hover:text-sky-600 transition-colors' : ''}`}
                      onClick={!isProfileRevealed ? handleToggleProfileVisibility : undefined}
                      title={!isProfileRevealed ? '點擊右上角眼睛或點此解鎖完整郵箱' : undefined}
                    >
                      {isProfileRevealed
                        ? user.fullEmail || 'testuser840926@gmail.com'
                        : user.email}
                    </span>
                  </td>
                </tr>

                {/* Row 4: 生日 */}
                <tr>
                  <td className="w-1/4 sm:w-1/5 px-6 py-4 text-gray-700 font-medium whitespace-nowrap">
                    生日
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-normal">
                    {user.birthday}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* 2. 修改密碼 View */}
        {currentSubView === 'password' && (
          <div className="p-6 sm:p-8 max-w-md mx-auto">
            <form onSubmit={handleSavePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  目前密碼
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="請輸入目前密碼"
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                    title={showOldPassword ? '隱藏密碼' : '顯示密碼'}
                  >
                    {showOldPassword ? <Eye className="w-4 h-4 text-sky-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  新密碼
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="6-20 位英文或數字"
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                    title={showNewPassword ? '隱藏密碼' : '顯示密碼'}
                  >
                    {showNewPassword ? <Eye className="w-4 h-4 text-sky-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  確認新密碼
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="請再次輸入新密碼"
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                    title={showConfirmPassword ? '隱藏密碼' : '顯示密碼'}
                  >
                    {showConfirmPassword ? <Eye className="w-4 h-4 text-sky-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#242845] hover:bg-[#1a1e35] text-white font-medium rounded text-sm shadow-xs cursor-pointer transition-colors"
              >
                確認修改
              </button>
            </form>
          </div>
        )}

        {/* 3. 修改取款密碼 View */}
        {currentSubView === 'pin' && (
          <div className="p-6 sm:p-8 max-w-md mx-auto">
            <form onSubmit={handleSavePin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  設定取款密碼
                </label>
                <div className="relative">
                  <input
                    type={showNewPin ? 'text' : 'password'}
                    maxLength={6}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="請輸入 6 位純數字"
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden tracking-widest text-center font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPin(!showNewPin)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                    title={showNewPin ? '隱藏密碼' : '顯示密碼'}
                  >
                    {showNewPin ? <Eye className="w-4 h-4 text-sky-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  確認提款密碼
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPin ? 'text' : 'password'}
                    maxLength={6}
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    placeholder="請再次輸入 6 位純數字"
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden tracking-widest text-center font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                    title={showConfirmPin ? '隱藏密碼' : '顯示密碼'}
                  >
                    {showConfirmPin ? <Eye className="w-4 h-4 text-sky-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#242845] hover:bg-[#1a1e35] text-white font-medium rounded text-sm shadow-xs cursor-pointer transition-colors"
              >
                確認設置
              </button>
            </form>
          </div>
        )}

        {/* 4. 修改取款帳號 View (New) */}
        {currentSubView === 'withdraw_account' && (
          <div className="p-6 sm:p-8 max-w-lg mx-auto">
            {/* Account Type Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                type="button"
                onClick={() => setBankTab('bank')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-1.5 border-b-2 transition-colors cursor-pointer ${
                  bankTab === 'bank'
                    ? 'border-[#242845] text-[#242845]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>銀行卡提款帳號</span>
              </button>
              <button
                type="button"
                onClick={() => setBankTab('crypto')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-center space-x-1.5 border-b-2 transition-colors cursor-pointer ${
                  bankTab === 'crypto'
                    ? 'border-[#242845] text-[#242845]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Wallet className="w-4 h-4" />
                <span>線上提款 / 電子錢包</span>
              </button>
            </div>

            <form onSubmit={handleSaveWithdrawAccount} className="space-y-4">
              {bankTab === 'bank' ? (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      開戶銀行
                    </label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden bg-white"
                    >
                      <option value="ABBANK">ABBANK 亞太商業銀行</option>
                      <option value="台灣銀行">台灣銀行 (Bank of Taiwan)</option>
                      <option value="中國信託">中國信託 (CTBC Bank)</option>
                      <option value="國泰世華">國泰世華商業銀行 (Cathay)</option>
                      <option value="玉山銀行">玉山商業銀行 (E.SUN Bank)</option>
                      <option value="台新銀行">台新國際商業銀行 (Taishin)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      開戶姓名 (需與實名認證一致)
                    </label>
                    <input
                      type="text"
                      disabled
                      value={user.realName}
                      className="w-full px-3 py-2 border border-gray-200 bg-gray-100 rounded text-sm text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-gray-700">
                        銀行卡帳號
                      </label>
                      <button
                        type="button"
                        onClick={handleToggleWithdrawAccountVisibility}
                        className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-800 p-0.5 rounded transition-colors cursor-pointer"
                        title={isWithdrawAccountRevealed ? '點擊重新遮蔽銀行卡號' : (isWithdrawAccountUnlockedInSession ? '點擊解除遮蔽' : '點擊解鎖檢視完整卡號')}
                      >
                        {isWithdrawAccountRevealed ? (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">遮蔽</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                            <span>{isWithdrawAccountUnlockedInSession ? '顯示' : '解鎖'}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={isWithdrawAccountRevealed ? bankAccountNumber : (bankAccountNumber ? '*********' + bankAccountNumber.slice(-5) : '')}
                        onChange={(e) => {
                          if (isWithdrawAccountRevealed) {
                            setBankAccountNumber(e.target.value);
                          } else {
                            handleToggleWithdrawAccountVisibility();
                          }
                        }}
                        placeholder="請輸入銀行卡號"
                        className={`w-full pl-3 pr-10 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden font-mono ${!isWithdrawAccountRevealed ? 'bg-gray-50 cursor-pointer' : 'bg-white'}`}
                        onClick={!isWithdrawAccountRevealed ? handleToggleWithdrawAccountVisibility : undefined}
                      />
                      <button
                        type="button"
                        onClick={handleToggleWithdrawAccountVisibility}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                        title={isWithdrawAccountRevealed ? '點擊遮蔽' : (isWithdrawAccountUnlockedInSession ? '點擊顯示' : '點擊解鎖')}
                      >
                        {isWithdrawAccountRevealed ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      開戶分行 (選填)
                    </label>
                    <input
                      type="text"
                      value={bankBranch}
                      onChange={(e) => setBankBranch(e.target.value)}
                      placeholder="例：台北旗艦分行"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      提款協議 / 錢包類別
                    </label>
                    <select
                      value={cryptoNetwork}
                      onChange={(e) => setCryptoNetwork(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden bg-white"
                    >
                      <option value="PIX-CPF">PIX-CPF (快捷支付)</option>
                      <option value="USDT-TRC20">USDT (TRC20 網絡)</option>
                      <option value="USDT-ERC20">USDT (ERC20 網絡)</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-medium text-gray-700">
                        錢包地址 / 數位銀行帳號
                      </label>
                      <button
                        type="button"
                        onClick={handleToggleWithdrawAccountVisibility}
                        className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-800 p-0.5 rounded transition-colors cursor-pointer"
                        title={isWithdrawAccountRevealed ? '點擊重新遮蔽帳號' : (isWithdrawAccountUnlockedInSession ? '點擊解除遮蔽' : '點擊解鎖檢視完整帳號')}
                      >
                        {isWithdrawAccountRevealed ? (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">遮蔽</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-gray-400" />
                            <span>{isWithdrawAccountUnlockedInSession ? '顯示' : '解鎖'}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={isWithdrawAccountRevealed ? cryptoAddress : (cryptoAddress ? '*****************' + cryptoAddress.slice(-5) : '')}
                        onChange={(e) => {
                          if (isWithdrawAccountRevealed) {
                            setCryptoAddress(e.target.value);
                          } else {
                            handleToggleWithdrawAccountVisibility();
                          }
                        }}
                        placeholder="請輸入數位銀行帳號或錢包地址"
                        className={`w-full pl-3 pr-10 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden font-mono ${!isWithdrawAccountRevealed ? 'bg-gray-50 cursor-pointer' : 'bg-white'}`}
                        onClick={!isWithdrawAccountRevealed ? handleToggleWithdrawAccountVisibility : undefined}
                      />
                      <button
                        type="button"
                        onClick={handleToggleWithdrawAccountVisibility}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                        title={isWithdrawAccountRevealed ? '點擊遮蔽' : (isWithdrawAccountUnlockedInSession ? '點擊顯示' : '點擊解鎖')}
                      >
                        {isWithdrawAccountRevealed ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                    請務必確認錢包地址正確無誤，如因地址錯誤導致資金損失，平台概不負責。
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-2 bg-[#242845] hover:bg-[#1a1e35] text-white font-medium rounded text-sm shadow-xs cursor-pointer transition-colors"
              >
                儲存取款帳號
              </button>
            </form>
          </div>
        )}

        {/* 5. 二階段驗證 View */}
        {currentSubView === '2fa' && (
          <div className="p-6 sm:p-8 max-w-md mx-auto space-y-4">
            <div className="text-center text-xs text-gray-600">
              使用 Google Authenticator 增強帳號防護安全
            </div>

            {!twoFactorEnabled ? (
              <form onSubmit={handleToggle2FA} className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 p-3 rounded text-xs space-y-2">
                  <div className="font-semibold text-gray-700">金鑰：</div>
                  <div className="flex items-center justify-between bg-white px-2.5 py-1.5 border border-gray-300 rounded font-mono">
                    <span>{secretKey2FA}</span>
                    <button
                      type="button"
                      onClick={handleCopySecretKey}
                      className="text-sky-600 hover:text-sky-700 text-[11px] font-sans font-bold cursor-pointer"
                    >
                      {copiedKey ? '已複製' : '複製'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    輸入 6 位驗證碼
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    placeholder="請輸入 Authenticator 6 位碼"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:border-sky-500 focus:outline-hidden tracking-widest text-center font-bold"
                  />
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#242845] hover:bg-[#1a1e35] text-white font-medium rounded text-sm shadow-xs cursor-pointer transition-colors"
                  >
                    啟用二階段驗證
                  </button>
                  <button
                    type="button"
                    onClick={() => setIs2FAModalOpen(true)}
                    className="w-full py-2 bg-[#709fc5] hover:bg-[#6090b5] text-white font-medium rounded text-sm shadow-xs cursor-pointer transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>預覽彈窗驗證（登入與防護樣式）</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-3">
                <div className="text-sm font-bold text-emerald-600">二階段驗證已生效</div>
                <div className="flex flex-col space-y-2 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => setIs2FAModalOpen(true)}
                    className="w-full py-2 bg-[#709fc5] hover:bg-[#6090b5] text-white font-medium rounded text-sm shadow-xs cursor-pointer transition-colors"
                  >
                    打開二階段驗證彈窗
                  </button>
                  <button
                    type="button"
                    onClick={handleToggle2FA}
                    className="px-4 py-1.5 text-xs text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded font-semibold cursor-pointer"
                  >
                    關閉驗證
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {renderModals()}
    </div>
  );
};
