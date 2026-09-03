export type MainNavTab =
  | 'home'
  | 'slots'
  | 'desheng_slots'
  | 'royal_slots'
  | 'cards'
  | 'fishing'
  | 'live'
  | 'sports'
  | 'lottery'
  | 'tickets'
  | 'promotions';

export type SidebarMenuKey =
  | 'deposit'
  | 'withdraw'
  | 'security'
  | 'referral'
  | 'vip'
  | 'announcements'
  | 'inbox'
  | 'wallet'
  | 'activities'
  | 'transactions'
  | 'bets'
  | 'rebate'
  | 'favorites';

export interface UserProfile {
  username: string;
  realName: string;
  phone: string;
  fullPhone?: string;
  isPhoneRevealed?: boolean;
  email: string;
  fullEmail?: string;
  isEmailRevealed?: boolean;
  birthday: string;
  balance: number;
  vipLevel: number;
  currency: string;
  bankName?: string;
  bankAccount?: string;
  fullBankAccount?: string;
  isBankRevealed?: boolean;
  onlineBankName?: string;
  onlineBankAccount?: string;
  fullOnlineBankAccount?: string;
  isOnlineBankRevealed?: boolean;
  withdrawPassword?: string;
  unreadMessages: number;
  unreadAnnouncements: number;
}

export interface TransactionRecord {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer' | 'rebate' | 'bonus';
  title: string;
  amount: number;
  status: 'completed' | 'processing' | 'rejected';
  date: string;
  channel: string;
}

export interface BetRecord {
  id: string;
  gameCategory: string;
  gameName: string;
  betAmount: number;
  payout: number;
  result: 'win' | 'loss' | 'tie';
  time: string;
}

export interface GameItem {
  id: string;
  title: string;
  category: MainNavTab;
  provider: string;
  image: string;
  hot?: boolean;
  new?: boolean;
  rating: number;
  favorite?: boolean;
}
