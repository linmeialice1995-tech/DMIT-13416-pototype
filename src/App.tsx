import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { NavBar } from './components/NavBar';
import { HeroBanner } from './components/HeroBanner';
import { MarqueeNews } from './components/MarqueeNews';
import { UserSidebar } from './components/UserSidebar';
import { UserProfileSettings, SecuritySubView } from './components/UserProfileSettings';
import { MobileMemberCenter } from './components/MobileMemberCenter';
import { MobileHomeView } from './components/MobileHomeView';
import { MobileWithdrawView } from './components/views/MobileWithdrawView';
import { VipView } from './components/views/VipView';
import { WalletView } from './components/views/WalletView';
import { TransactionsView } from './components/views/TransactionsView';
import { BetsView } from './components/views/BetsView';
import { RebateView } from './components/views/RebateView';
import { ReferralView } from './components/views/ReferralView';
import { AnnouncementsView } from './components/views/AnnouncementsView';
import { InboxView } from './components/views/InboxView';
import { ActivitiesView } from './components/views/ActivitiesView';
import { FavoritesView } from './components/views/FavoritesView';
import { DepositView } from './components/views/DepositView';
import { WithdrawView } from './components/views/WithdrawView';
import { GameLobbyView } from './components/views/GameLobbyView';
import { DepositModal } from './components/modals/DepositModal';
import { WithdrawModal } from './components/modals/WithdrawModal';
import { CustomerServiceModal } from './components/modals/CustomerServiceModal';
import { GamePlayModal } from './components/modals/GamePlayModal';
import { PasswordVerificationModal } from './components/modals/PasswordVerificationModal';
import { MainNavTab, SidebarMenuKey, UserProfile, GameItem, TransactionRecord } from './types';
import { INITIAL_GAMES, INITIAL_TRANSACTIONS, INITIAL_BETS } from './mockData';
import { CheckCircle2, AlertCircle, Info, X, Smartphone, Monitor } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeNavTab, setActiveNavTab] = useState<MainNavTab>('home');
  const [activeSidebarMenu, setActiveSidebarMenu] = useState<SidebarMenuKey>('security');
  const [securityInitialSubView, setSecurityInitialSubView] = useState<SecuritySubView>('menu');
  
  // Mobile specific view state: 'home' = Mobile Casino Lobby, 'mine' = Mobile Member Center, 'withdraw' = Mobile Withdraw
  const [mobileCurrentScreen, setMobileCurrentScreen] = useState<'home' | 'mine' | 'withdraw'>('home');
  const [mobileSubMenu, setMobileSubMenu] = useState<SidebarMenuKey | null>(null);
  
  // View mode switcher: 'auto' (responsive), 'mobile', or 'desktop'
  const [forcedViewMode, setForcedViewMode] = useState<'auto' | 'mobile' | 'desktop'>('auto');

  // User State matching the screenshot:
  // Username: lin840926
  // Balance: ฿ 1,042.28
  // Real Name: AAA
  // Phone: +82 1980***0902
  // Email: te****om
  // Birthday: 2026/08/20
  const [user, setUser] = useState<UserProfile>({
    username: 'lin840926',
    realName: 'AAA',
    phone: '+62 1980***8902',
    fullPhone: '+62 19801238902',
    isPhoneRevealed: false,
    email: 'te*****om',
    fullEmail: 'testuser840926@gmail.com',
    isEmailRevealed: false,
    birthday: '2026/08/20',
    balance: 1042.28,
    vipLevel: 1,
    currency: '฿',
    bankName: 'ABBANK',
    bankAccount: '*********42432',
    fullBankAccount: '01398829142432',
    isBankRevealed: false,
    onlineBankName: 'PIX-CPF',
    onlineBankAccount: '*****************24324',
    fullOnlineBankAccount: 'PIX-082914243249021',
    isOnlineBankRevealed: false,
    withdrawPassword: '123456',
    unreadMessages: 1,
    unreadAnnouncements: 2,
  });

  const [games, setGames] = useState<GameItem[]>(INITIAL_GAMES);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [bets] = useState(INITIAL_BETS);

  // Modals & Dynamic UI state
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);
  const [activePlayingGame, setActivePlayingGame] = useState<GameItem | null>(null);
  const [isRefreshingBalance, setIsRefreshingBalance] = useState(false);

  // Authentication & 2FA Login Modal State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Toast Notification System
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const handleRefreshBalance = () => {
    setIsRefreshingBalance(true);
    setTimeout(() => {
      setIsRefreshingBalance(false);
      showToast('帳戶餘額已更新至最新狀態！', 'success');
    }, 600);
  };

  const handleDepositSuccess = (amount: number, channel: string) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));
    const newTx: TransactionRecord = {
      id: `TX-${Date.now().toString().slice(-8)}`,
      type: 'deposit',
      title: '線上快捷充值',
      amount,
      status: 'completed',
      date: new Date().toISOString().replace('T', ' ').slice(0, 19),
      channel,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleWithdrawSuccess = (amount: number, bank: string) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance - amount,
    }));
    const newTx: TransactionRecord = {
      id: `TX-${Date.now().toString().slice(-8)}`,
      type: 'withdraw',
      title: '銀行卡提款',
      amount,
      status: 'completed',
      date: new Date().toISOString().replace('T', ' ').slice(0, 19),
      channel: bank,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleToggleFavorite = (gameId: string) => {
    setGames((prev) =>
      prev.map((g) => (g.id === gameId ? { ...g, favorite: !g.favorite } : g))
    );
    const target = games.find((g) => g.id === gameId);
    if (target) {
      showToast(
        target.favorite
          ? `已從最愛移除【${target.title}】`
          : `已將【${target.title}】加入我的最愛！`,
        'success'
      );
    }
  };

  const handleNavSelect = (tab: MainNavTab) => {
    setActiveNavTab(tab);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleSidebarSelect = (menuKey: SidebarMenuKey) => {
    setActiveSidebarMenu(menuKey);
    if (menuKey === 'security') {
      setSecurityInitialSubView('menu');
    }
    setMobileSubMenu(menuKey);
    setActiveNavTab('home');
  };

  const handleMobileMenuSelect = (menuKey: SidebarMenuKey) => {
    setMobileSubMenu(menuKey);
    setActiveSidebarMenu(menuKey);
    if (menuKey === 'security') {
      setSecurityInitialSubView('menu');
    }
  };

  const renderActiveViewContent = (isMobileView: boolean = false) => (
    <>
      {activeSidebarMenu === 'deposit' && (
        <DepositView
          user={user}
          onDepositSuccess={handleDepositSuccess}
          onShowToast={showToast}
        />
      )}

      {activeSidebarMenu === 'withdraw' && (
        <WithdrawView
          user={user}
          onWithdrawSuccess={handleWithdrawSuccess}
          onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
          onShowToast={showToast}
        />
      )}

      {activeSidebarMenu === 'security' && (
        <UserProfileSettings
          user={user}
          isMobile={isMobileView}
          initialSubView={securityInitialSubView}
          onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
          onShowToast={showToast}
          onBack={() => {
            setMobileSubMenu(null);
            showToast('已返回基本資料總覽', 'info');
          }}
        />
      )}

      {activeSidebarMenu === 'vip' && (
        <VipView user={user} onShowToast={showToast} />
      )}

      {activeSidebarMenu === 'wallet' && (
        <WalletView
          user={user}
          onRefreshBalance={handleRefreshBalance}
          isRefreshing={isRefreshingBalance}
          onShowToast={showToast}
        />
      )}

      {activeSidebarMenu === 'transactions' && (
        <TransactionsView
          transactions={transactions}
          onOpenDeposit={() => setIsDepositOpen(true)}
          onOpenWithdraw={() => setIsWithdrawOpen(true)}
        />
      )}

      {activeSidebarMenu === 'bets' && <BetsView bets={bets} />}

      {activeSidebarMenu === 'rebate' && (
        <RebateView user={user} onShowToast={showToast} />
      )}

      {activeSidebarMenu === 'referral' && (
        <ReferralView user={user} onShowToast={showToast} />
      )}

      {activeSidebarMenu === 'announcements' && <AnnouncementsView />}

      {activeSidebarMenu === 'inbox' && (
        <InboxView onShowToast={showToast} />
      )}

      {activeSidebarMenu === 'activities' && (
        <ActivitiesView onShowToast={showToast} />
      )}

      {activeSidebarMenu === 'favorites' && (
        <FavoritesView
          games={games}
          onToggleFavorite={handleToggleFavorite}
          onLaunchGame={(g) => setActivePlayingGame(g)}
        />
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-[#eaeff5] flex flex-col font-sans text-gray-800 antialiased selection:bg-sky-500 selection:text-white">
      {/* Floating Device Mode Switcher for ease of testing */}
      <div className="fixed bottom-20 right-4 z-40 hidden sm:flex items-center space-x-1 bg-black/80 backdrop-blur-xs text-white px-2.5 py-1.5 rounded-full shadow-2xl border border-white/20 text-xs">
        <button
          onClick={() => setForcedViewMode(forcedViewMode === 'mobile' ? 'desktop' : 'mobile')}
          className="flex items-center space-x-1 hover:text-amber-300 transition-colors font-medium cursor-pointer"
          title="切換檢視模式"
        >
          {forcedViewMode === 'mobile' ? (
            <>
              <Monitor className="w-3.5 h-3.5 text-sky-400" />
              <span>切換電腦版</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>切換手機版</span>
            </>
          )}
        </button>
      </div>

      {/* MOBILE VIEW (renders by default on small screens or when mobile mode forced) */}
      <div className={forcedViewMode === 'mobile' ? 'block' : forcedViewMode === 'desktop' ? 'hidden' : 'block md:hidden'}>
        {mobileCurrentScreen === 'home' ? (
          <MobileHomeView
            user={user}
            games={games}
            onSelectMenu={(menu) => {
              handleMobileMenuSelect(menu);
              if (menu === 'withdraw') {
                setMobileCurrentScreen('withdraw');
              } else {
                setMobileCurrentScreen('mine');
              }
            }}
            onOpenDeposit={() => {
              setMobileSubMenu('deposit');
              setActiveSidebarMenu('deposit');
              setMobileCurrentScreen('mine');
            }}
            onOpenWithdraw={() => {
              setMobileSubMenu('withdraw');
              setActiveSidebarMenu('withdraw');
              setMobileCurrentScreen('withdraw');
            }}
            onOpenCustomerService={() => setIsCustomerServiceOpen(true)}
            onRefreshBalance={handleRefreshBalance}
            isRefreshing={isRefreshingBalance}
            onSelectNavTab={(tab) => {
              setActiveNavTab(tab);
            }}
            currentNavTab={activeNavTab}
            onLaunchGame={(g) => setActivePlayingGame(g)}
            onSwitchToMemberCenter={() => {
              setMobileSubMenu(null);
              setMobileCurrentScreen('mine');
            }}
          />
        ) : mobileCurrentScreen === 'withdraw' || mobileSubMenu === 'withdraw' ? (
          <MobileWithdrawView
            user={user}
            onWithdrawSuccess={handleWithdrawSuccess}
            onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
            onShowToast={showToast}
            onSwitchToHome={() => {
              setMobileSubMenu(null);
              setMobileCurrentScreen('home');
            }}
            onSwitchToDeposit={() => {
              setMobileSubMenu('deposit');
              setActiveSidebarMenu('deposit');
              setMobileCurrentScreen('mine');
            }}
            onSwitchToMemberCenter={() => {
              setMobileSubMenu(null);
              setMobileCurrentScreen('mine');
            }}
            onOpenCustomerService={() => setIsCustomerServiceOpen(true)}
            onLaunchGame={(g) => setActivePlayingGame(g)}
          />
        ) : (
          <MobileMemberCenter
            user={user}
            activeMenu={mobileSubMenu}
            onSelectMenu={(menu) => {
              if (menu === 'withdraw') {
                setMobileSubMenu('withdraw');
                setMobileCurrentScreen('withdraw');
              } else {
                handleMobileMenuSelect(menu);
              }
            }}
            onBackToGrid={() => setMobileSubMenu(null)}
            onOpenDeposit={() => {
              setMobileSubMenu('deposit');
              setActiveSidebarMenu('deposit');
            }}
            onOpenWithdraw={() => {
              setMobileSubMenu('withdraw');
              setActiveSidebarMenu('withdraw');
              setMobileCurrentScreen('withdraw');
            }}
            onOpenCustomerService={() => setIsCustomerServiceOpen(true)}
            onRefreshBalance={handleRefreshBalance}
            isRefreshing={isRefreshingBalance}
            onSelectNavTab={(tab) => {
              setActiveNavTab(tab);
              if (tab !== 'home') {
                setMobileSubMenu(null);
              }
            }}
            currentNavTab={activeNavTab}
            onSwitchToHome={() => {
              setMobileSubMenu(null);
              setMobileCurrentScreen('home');
            }}
          >
            {renderActiveViewContent(true)}
          </MobileMemberCenter>
        )}
      </div>

      {/* DESKTOP VIEW (renders on medium/large screens or when desktop mode forced) */}
      <div className={forcedViewMode === 'mobile' ? 'hidden' : forcedViewMode === 'desktop' ? 'flex flex-col flex-1' : 'hidden md:flex flex-col flex-1'}>
        {/* 1. Top Utility Header */}
        <TopBar
          user={user}
          onRefreshBalance={handleRefreshBalance}
          isRefreshing={isRefreshingBalance}
          onOpenDeposit={() => {
            setActiveSidebarMenu('deposit');
            setActiveNavTab('home');
          }}
          onOpenCustomerService={() => setIsCustomerServiceOpen(true)}
          onOpenHelpCenter={() => setIsCustomerServiceOpen(true)}
          onNavigateToTab={(tab) => {
            if (tab === 'security_pin') {
              setActiveSidebarMenu('security');
              setSecurityInitialSubView('pin');
              setMobileSubMenu('security');
              setActiveNavTab('home');
              return;
            }
            if (tab === 'security') {
              setActiveSidebarMenu('security');
              setSecurityInitialSubView('menu');
              setMobileSubMenu('security');
              setActiveNavTab('home');
              return;
            }
            if (
              tab === 'deposit' ||
              tab === 'withdraw' ||
              tab === 'transactions' ||
              tab === 'referral' ||
              tab === 'vip' ||
              tab === 'announcements' ||
              tab === 'inbox' ||
              tab === 'wallet' ||
              tab === 'activities' ||
              tab === 'bets' ||
              tab === 'rebate' ||
              tab === 'favorites'
            ) {
              handleSidebarSelect(tab as SidebarMenuKey);
            }
          }}
        />

        {/* 2. Main Navigation Bar */}
        <NavBar
          activeTab={activeNavTab}
          onSelectTab={handleNavSelect}
          isLoggedIn={isLoggedIn}
          onLogout={() => {
            setIsLoggedIn(false);
            showToast('您已成功安全登出！點擊「登入」即可開啟二階段驗證彈窗', 'info');
          }}
          onLogin={() => setIsLoginModalOpen(true)}
        />

        {/* 3. Hero Visual Casino Banner */}
        <HeroBanner />

        {/* 4. Main Body Container (Dark Navy Box with rounded corners and border) */}
        <main className="flex-1 max-w-[1280px] w-full mx-auto px-3 sm:px-4 py-5 sm:py-8">
          {activeNavTab === 'home' ? (
            <div className="w-full bg-[#232845] rounded-xl shadow-xl border border-[#31375b] overflow-hidden flex flex-col">
              {/* Top Marquee News Bar */}
              <MarqueeNews
                onOpenAnnouncements={() => {
                  setActiveSidebarMenu('announcements');
                }}
              />

              {/* Split Screen Layout: Sidebar + Content */}
              <div className="flex flex-col md:flex-row flex-1">
                {/* Left Column Sidebar */}
                <UserSidebar
                  user={user}
                  activeMenu={activeSidebarMenu}
                  onSelectMenu={handleSidebarSelect}
                  onOpenDeposit={() => {
                    setActiveSidebarMenu('deposit');
                  }}
                  onOpenWithdraw={() => {
                    setActiveSidebarMenu('withdraw');
                  }}
                  onRefreshBalance={handleRefreshBalance}
                  isRefreshing={isRefreshingBalance}
                />

                {/* Right Column Content Panel */}
                <div className="flex-1 flex flex-col bg-[#1d2139]">
                  {renderActiveViewContent(false)}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col space-y-4">
              <button
                onClick={() => setActiveNavTab('home')}
                className="self-start text-xs text-sky-700 bg-white border border-sky-200 px-3 py-1.5 rounded-lg hover:bg-sky-50 cursor-pointer font-semibold transition-colors flex items-center space-x-1"
              >
                <span>← 返回會員中心首頁</span>
              </button>

              <GameLobbyView
                category={activeNavTab}
                games={games}
                onToggleFavorite={handleToggleFavorite}
                onLaunchGame={(g) => setActivePlayingGame(g)}
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="w-full bg-[#1b1f35] text-gray-400 text-xs py-6 border-t border-[#292f50] mt-auto select-none">
          <div className="max-w-[1280px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-black italic bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                DEMO PRO
              </span>
              <span className="text-gray-500">|</span>
              <span>亞洲旗艦娛樂官方合法認證</span>
            </div>
            <div className="text-[11px] text-gray-500">
              © 2026 DEMO Gaming Platform. All Rights Reserved. 支援 18+ 理性娛樂.
            </div>
          </div>
        </footer>
      </div>


      {/* Modals */}
      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        user={user}
        onDepositSuccess={handleDepositSuccess}
        onShowToast={showToast}
      />

      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        user={user}
        onWithdrawSuccess={handleWithdrawSuccess}
        onShowToast={showToast}
      />

      <CustomerServiceModal
        isOpen={isCustomerServiceOpen}
        onClose={() => setIsCustomerServiceOpen(false)}
        user={user}
      />

      <GamePlayModal
        game={activePlayingGame}
        onClose={() => setActivePlayingGame(null)}
        onShowToast={showToast}
      />

      {/* 2FA Login Modal */}
      <PasswordVerificationModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        mode="2fa"
        titlePrefix="您已開啟"
        highlightText="隱蔽資料"
        titleSuffix="保護"
        subtitle="請打開綁定的認證應用程式獲取驗證碼"
        fieldLabel="二階段驗證碼"
        submitButtonText="登入"
        onSuccess={() => {
          setIsLoggedIn(true);
          showToast('登入驗證成功！歡迎回到 DEMO 娛樂城', 'success');
        }}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div
            className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl shadow-xl text-white text-xs font-semibold ${
              toast.type === 'success'
                ? 'bg-emerald-600'
                : toast.type === 'error'
                ? 'bg-rose-600'
                : 'bg-[#242845]'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-200" />
            ) : (
              <Info className="w-4 h-4 text-sky-300" />
            )}
            <span>{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-white/70 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
