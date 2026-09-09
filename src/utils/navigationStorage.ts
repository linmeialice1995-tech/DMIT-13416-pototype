import { ActiveSystemTab, MainNavTab, SidebarMenuKey, UserProfile } from '../types';
import { SecuritySubView } from '../components/UserProfileSettings';
import { MemberFieldConfig } from '../components/views/MemberSettingsView';

export interface PersistedNavigationState {
  activeSystemTab: ActiveSystemTab;
  forcedViewMode: 'mobile' | 'desktop';
  mobileCurrentScreen: 'home' | 'mine' | 'withdraw';
  mobileSubMenu: SidebarMenuKey | null;
  activeNavTab: MainNavTab;
  activeSidebarMenu: SidebarMenuKey;
  securityInitialSubView: SecuritySubView;
  adminLevel: 'list' | 'detail';
  adminItemId: string;
  mobileWithdrawSubTab: 'bank_card' | 'online_bank' | 'add_bank';
  mobileHomeGameTab: 'cards' | 'slots' | 'fishing' | 'live' | 'sports' | 'lottery';
  isViewEncryptedInfoEnabled: boolean;
}

const STORAGE_KEY_NAV = 'CASINO_NAV_STATE_V2';
const STORAGE_KEY_USER = 'CASINO_USER_STATE_V2';
const STORAGE_KEY_MEMBER_FIELDS = 'CASINO_MEMBER_FIELDS_V2';

export const DEFAULT_NAV_STATE: PersistedNavigationState = {
  activeSystemTab: 'frontend_casino',
  forcedViewMode: 'mobile',
  mobileCurrentScreen: 'home',
  mobileSubMenu: null,
  activeNavTab: 'home',
  activeSidebarMenu: 'security',
  securityInitialSubView: 'menu',
  adminLevel: 'list',
  adminItemId: 'default3',
  mobileWithdrawSubTab: 'bank_card',
  mobileHomeGameTab: 'cards',
  isViewEncryptedInfoEnabled: true,
};

/**
 * Load navigation state on app startup from localStorage & URL parameters
 */
export function loadPersistedNavigationState(): PersistedNavigationState {
  let state = { ...DEFAULT_NAV_STATE };

  // 1. Try to read from localStorage
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_NAV);
      if (raw) {
        const parsed = JSON.parse(raw);
        state = {
          ...state,
          ...parsed,
        };
      }
    } catch {
      // Ignore corrupted localStorage
    }
  }

  // 2. Overlay URL search params and hash (priority if explicitly in address bar)
  if (typeof window !== 'undefined' && window.location) {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;

      // System tab
      if (searchParams.get('tab') === 'admin' || hash === '#admin') {
        state.activeSystemTab = 'backend_admin';
      } else if (searchParams.get('tab') === 'casino' || hash === '#casino') {
        state.activeSystemTab = 'frontend_casino';
      }

      // View mode
      const mode = searchParams.get('mode');
      if (mode === 'desktop' || mode === 'mobile') {
        state.forcedViewMode = mode;
      }

      // Mobile screen
      const screen = searchParams.get('screen');
      if (screen === 'home' || screen === 'mine' || screen === 'withdraw') {
        state.mobileCurrentScreen = screen;
      }

      // Sub menu
      const sub = searchParams.get('sub');
      if (sub) {
        state.mobileSubMenu = sub as SidebarMenuKey;
        state.activeSidebarMenu = sub as SidebarMenuKey;
      }

      // Security sub view
      const sec = searchParams.get('sec');
      if (sec) {
        state.securityInitialSubView = sec as SecuritySubView;
      }

      // Admin level
      const adminLevel = searchParams.get('adminLevel');
      if (adminLevel === 'list' || adminLevel === 'detail') {
        state.adminLevel = adminLevel;
      }

      const item = searchParams.get('item');
      if (item) {
        state.adminItemId = item;
      }

      // Withdraw sub tab
      const wtab = searchParams.get('wtab');
      if (wtab === 'bank_card' || wtab === 'online_bank' || wtab === 'add_bank') {
        state.mobileWithdrawSubTab = wtab;
      }

      // Nav tab
      const nav = searchParams.get('nav');
      if (nav) {
        state.activeNavTab = nav as MainNavTab;
      }
    } catch {
      // Ignore URL parsing errors
    }
  }

  return state;
}

/**
 * Persist navigation state to localStorage and update browser URL without reload
 */
export function savePersistedNavigationState(state: PersistedNavigationState): void {
  if (typeof window === 'undefined') return;

  // 1. Save to localStorage
  try {
    window.localStorage.setItem(STORAGE_KEY_NAV, JSON.stringify(state));
  } catch {
    // Ignore quota or privacy mode errors
  }

  // 2. Update address bar parameters smoothly (without page refresh)
  try {
    const url = new URL(window.location.href);

    if (state.activeSystemTab === 'backend_admin') {
      url.searchParams.set('tab', 'admin');
      url.searchParams.set('adminLevel', state.adminLevel);
      if (state.adminLevel === 'detail') {
        url.searchParams.set('item', state.adminItemId);
      } else {
        url.searchParams.delete('item');
      }
      url.searchParams.delete('mode');
      url.searchParams.delete('screen');
      url.searchParams.delete('sub');
      url.searchParams.delete('sec');
      url.searchParams.delete('wtab');
      url.searchParams.delete('nav');
    } else {
      url.searchParams.set('tab', 'casino');
      url.searchParams.set('mode', state.forcedViewMode);

      if (state.forcedViewMode === 'mobile') {
        url.searchParams.set('screen', state.mobileCurrentScreen);
        if (state.mobileCurrentScreen === 'mine' && state.mobileSubMenu) {
          url.searchParams.set('sub', state.mobileSubMenu);
          if (state.mobileSubMenu === 'security') {
            url.searchParams.set('sec', state.securityInitialSubView);
          } else {
            url.searchParams.delete('sec');
          }
        } else {
          url.searchParams.delete('sub');
          url.searchParams.delete('sec');
        }

        if (state.mobileCurrentScreen === 'withdraw') {
          url.searchParams.set('wtab', state.mobileWithdrawSubTab);
        } else {
          url.searchParams.delete('wtab');
        }
        url.searchParams.delete('nav');
      } else {
        url.searchParams.set('nav', state.activeNavTab);
        url.searchParams.set('sub', state.activeSidebarMenu);
        if (state.activeSidebarMenu === 'security') {
          url.searchParams.set('sec', state.securityInitialSubView);
        } else {
          url.searchParams.delete('sec');
        }
        url.searchParams.delete('screen');
        url.searchParams.delete('wtab');
      }
      url.searchParams.delete('adminLevel');
      url.searchParams.delete('item');
    }

    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  } catch {
    // In restricted sandbox iframes, history.replaceState may throw silently
  }
}

/**
 * User profile persistence helpers
 */
export function loadPersistedUser(fallbackUser: UserProfile): UserProfile {
  if (typeof window === 'undefined' || !window.localStorage) return fallbackUser;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_USER);
    if (raw) {
      const parsed = JSON.parse(raw);
      delete parsed.withdrawPassword;
      window.localStorage.setItem(STORAGE_KEY_USER, JSON.stringify({ ...parsed, withdrawPassword: '' }));
      return { ...fallbackUser, ...parsed, withdrawPassword: '' };
    }
  } catch {
    // Ignore
  }
  return fallbackUser;
}

export function savePersistedUser(user: UserProfile): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEY_USER, JSON.stringify({ ...user, withdrawPassword: user.withdrawPassword || '' }));
  } catch {
    // Ignore
  }
}

/**
 * Member fields persistence helpers
 */
export function loadPersistedMemberFields(fallbackFields: MemberFieldConfig[]): MemberFieldConfig[] {
  if (typeof window === 'undefined' || !window.localStorage) return fallbackFields;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_MEMBER_FIELDS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore
  }
  return fallbackFields;
}

export function savePersistedMemberFields(fields: MemberFieldConfig[]): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEY_MEMBER_FIELDS, JSON.stringify(fields));
  } catch {
    // Ignore
  }
}
