import React, { useState, useEffect } from 'react';
import {
  Bell,
  ChevronDown,
  HelpCircle,
  AlertCircle,
  AlertTriangle,
  Check,
  Edit3,
  X,
  Save,
  Clock,
  Info,
  ArrowLeft,
  Settings,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  MemberSettingsListView,
  INITIAL_MEMBER_SETTING_LIST,
  MemberSettingListItem,
} from './MemberSettingsListView';

export interface MemberSettingsViewProps {
  onShowToast?: (message: string, type?: 'success' | 'info' | 'error') => void;
  onBack?: () => void;
  memberFields?: MemberFieldConfig[];
  onUpdateMemberFields?: (fields: MemberFieldConfig[]) => void;
  isViewEncryptedInfoEnabled?: boolean;
  onToggleViewEncryptedInfo?: (enabled: boolean) => void;
  initialLevel?: 'list' | 'detail';
  onLevelChange?: (level: 'list' | 'detail') => void;
  initialItemId?: string;
  onSelectItemId?: (id: string) => void;
}

export interface MemberFieldConfig {
  id: string;
  name: string;
  hasInfoBadge?: boolean;
  registerDisplay: boolean | '-';
  registerRequired: boolean | '-';
  profileDisplay: boolean | '-';
  profileEditable: boolean | '-';
  isUnique: boolean | '-';
  lockedRegisterDisplay?: boolean;
  lockedRegisterRequired?: boolean;
  lockedProfileDisplay?: boolean;
  lockedProfileEditable?: boolean;
  lockedIsUnique?: boolean;
}

interface AgentFieldConfig {
  id: string;
  name: string;
  display: boolean | '-';
  required: boolean | '-';
  isUnique: boolean | '-';
}

// Custom AntD/Admin styled Checkbox for table editing matching the screenshot
const TableCheckbox: React.FC<{
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}> = ({ checked, disabled, onChange }) => {
  if (disabled) {
    return (
      <span
        className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-[2px] border ${
          checked
            ? 'bg-[#f5f5f5] border-[#d9d9d9] text-[#8c8c8c]'
            : 'bg-[#f5f5f5] border-[#d9d9d9]'
        }`}
      >
        {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => onChange?.(!checked)}
      className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-[2px] border transition-colors cursor-pointer ${
        checked
          ? 'bg-[#1890ff] border-[#1890ff] text-white hover:bg-[#40a9ff]'
          : 'bg-white border-gray-400 hover:border-[#1890ff]'
      }`}
    >
      {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
    </button>
  );
};

export const INITIAL_MEMBER_FIELDS: MemberFieldConfig[] = [
  {
    id: 'referrer',
    name: '推荐人',
    registerDisplay: true,
    registerRequired: false,
    profileDisplay: '-',
    profileEditable: '-',
    isUnique: '-',
  },
  {
    id: 'name',
    name: '姓名',
    hasInfoBadge: true,
    registerDisplay: true,
    registerRequired: true,
    profileDisplay: true,
    profileEditable: true,
    isUnique: true,
    lockedRegisterDisplay: true,
    lockedRegisterRequired: true,
    lockedProfileDisplay: true,
    lockedProfileEditable: true,
    lockedIsUnique: false,
  },
  {
    id: 'withdraw_password',
    name: '取款密码',
    hasInfoBadge: true,
    registerDisplay: true,
    registerRequired: false,
    profileDisplay: '-',
    profileEditable: '-',
    isUnique: '-',
  },
  {
    id: 'phone',
    name: '手机',
    registerDisplay: true,
    registerRequired: false,
    profileDisplay: true,
    profileEditable: true,
    isUnique: true,
  },
  {
    id: 'email',
    name: '电邮',
    registerDisplay: true,
    registerRequired: false,
    profileDisplay: true,
    profileEditable: true,
    isUnique: true,
  },
  {
    id: 'gender',
    name: '性别',
    registerDisplay: true,
    registerRequired: false,
    profileDisplay: '-',
    profileEditable: '-',
    isUnique: '-',
  },
  {
    id: 'birthday',
    name: '生日',
    registerDisplay: true,
    registerRequired: false,
    profileDisplay: true,
    profileEditable: true,
    isUnique: '-',
  },
  {
    id: 'line',
    name: 'Line',
    registerDisplay: true,
    registerRequired: false,
    profileDisplay: '-',
    profileEditable: '-',
    isUnique: true,
  },
  {
    id: 'telegram',
    name: 'Telegram',
    registerDisplay: true,
    registerRequired: false,
    profileDisplay: '-',
    profileEditable: '-',
    isUnique: true,
  },
  {
    id: 'bank_info',
    name: '银行资料',
    registerDisplay: true,
    registerRequired: false,
    profileDisplay: '-',
    profileEditable: '-',
    isUnique: true,
    lockedIsUnique: true,
  },
];

export const MemberSettingsView: React.FC<MemberSettingsViewProps> = ({
  onShowToast = (_message: string, _type?: 'success' | 'info' | 'error') => {},
  onBack,
  memberFields: externalMemberFields,
  onUpdateMemberFields,
  isViewEncryptedInfoEnabled: externalViewEncryptedInfo = true,
  onToggleViewEncryptedInfo,
  initialLevel = 'list',
  onLevelChange,
  initialItemId = 'default3',
  onSelectItemId,
}) => {
  // Navigation level: 'list' (level 1) | 'detail' (level 2)
  const [currentLevel, setCurrentLevel] = useState<'list' | 'detail'>(initialLevel);

  // Sidebar widget drawer state (小工具選單)
  const [isWidgetMenuOpen, setIsWidgetMenuOpen] = useState(false);
  const [viewEncryptedInfo, setViewEncryptedInfo] = useState<boolean>(externalViewEncryptedInfo);

  useEffect(() => {
    if (externalViewEncryptedInfo !== undefined) {
      setViewEncryptedInfo(externalViewEncryptedInfo);
    }
  }, [externalViewEncryptedInfo]);

  const handleToggleEncryptedSwitch = (val: boolean) => {
    setViewEncryptedInfo(val);
    onToggleViewEncryptedInfo?.(val);
    onShowToast(`會員加密資訊「查看」功能已切換為：${val ? 'True (啟用)' : 'False (關閉)'}`, val ? 'success' : 'info');
  };

  // List data state (Level 1)
  const [settingItems, setSettingItems] = useState<MemberSettingListItem[]>(INITIAL_MEMBER_SETTING_LIST);

  // Config States (Level 2)
  const initialItem = INITIAL_MEMBER_SETTING_LIST.find((i) => i.id === initialItemId) || INITIAL_MEMBER_SETTING_LIST[0];
  const [settingName, setSettingName] = useState(initialItem ? initialItem.name : 'Default3');
  const [selectedItemId, setSelectedItemId] = useState<string>(initialItemId);
  const [isDepositEnabled, setIsDepositEnabled] = useState(initialItem ? initialItem.companyDeposit : true);
  const [isWithdrawEnabled, setIsWithdrawEnabled] = useState(initialItem ? initialItem.withdrawApply : true);
  const [isFreeTimeEnabled, setIsFreeTimeEnabled] = useState(true);
  const [freeTimeSlots, setFreeTimeSlots] = useState([
    '每日 02:00 ~ 02:59',
    '每日 04:00 ~ 04:59',
  ]);
  const [notes, setNotes] = useState(
    initialItem && initialItem.memo && initialItem.memo !== '-'
      ? `${initialItem.name} 相關備註：${initialItem.memo}`
      : 'Default3 系統預設會員端與經銷商端註冊規則。'
  );

  const changeLevel = (level: 'list' | 'detail') => {
    setCurrentLevel(level);
    onLevelChange?.(level);
  };

  // Member Fields config matching screenshot exactly
  const [memberFields, setMemberFields] = useState<MemberFieldConfig[]>(
    externalMemberFields || INITIAL_MEMBER_FIELDS
  );
  const [isEditingMemberInline, setIsEditingMemberInline] = useState(false);
  const [draftMemberFields, setDraftMemberFields] = useState<MemberFieldConfig[]>(
    externalMemberFields || INITIAL_MEMBER_FIELDS
  );

  useEffect(() => {
    if (externalMemberFields) {
      setMemberFields(externalMemberFields);
      setDraftMemberFields(externalMemberFields);
    }
  }, [externalMemberFields]);

  // Agent Fields config matching screenshot exactly
  const [agentFields, setAgentFields] = useState<AgentFieldConfig[]>([
    { id: 'agent_name', name: '姓名', display: true, required: true, isUnique: true },
    { id: 'agent_phone', name: '手机', display: true, required: false, isUnique: true },
    { id: 'agent_email', name: '电邮', display: true, required: true, isUnique: false },
    { id: 'agent_gender', name: '性别', display: true, required: false, isUnique: '-' },
    { id: 'agent_birthday', name: '生日', display: true, required: false, isUnique: '-' },
    { id: 'agent_line', name: 'Line', display: true, required: false, isUnique: true },
    { id: 'agent_telegram', name: 'Telegram', display: true, required: false, isUnique: true },
    { id: 'agent_bank_info', name: '银行资讯', display: true, required: false, isUnique: true },
  ]);
  const [isEditingAgentInline, setIsEditingAgentInline] = useState(false);
  const [draftAgentFields, setDraftAgentFields] = useState<AgentFieldConfig[]>(agentFields);

  // Modal / Editing states
  const [isEditingNameModal, setIsEditingNameModal] = useState(false);
  const [tempSettingName, setTempSettingName] = useState(settingName);

  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [closePromptText, setClosePromptText] = useState(
    '尊敬的会员您好，目前取款申请功能正在进行系统维护，维护期间暂不开放取款，请稍后再试或联系在线客服协助。'
  );

  const [isEditingTimeModal, setIsEditingTimeModal] = useState(false);
  const [tempTimeSlots, setTempTimeSlots] = useState(freeTimeSlots.join('\n'));

  const [isEditingMemberModal, setIsEditingMemberModal] = useState(false);
  const [editingMemberFields, setEditingMemberFields] = useState(memberFields);

  const [isEditingAgentModal, setIsEditingAgentModal] = useState(false);
  const [editingAgentFields, setEditingAgentFields] = useState(agentFields);

  const [isEditingNotesModal, setIsEditingNotesModal] = useState(false);
  const [tempNotes, setTempNotes] = useState(notes);

  // Helper render for checkmark vs dash
  const renderCellStatus = (value: boolean | '-') => {
    if (value === true) {
      return <Check className="w-4 h-4 text-[#1e7e34] stroke-[2.8] mx-auto" />;
    }
    if (value === '-') {
      return <span className="text-gray-400 font-medium">-</span>;
    }
    return <span className="text-transparent">-</span>;
  };

  // Inline editing handlers for Member Settings (会员设定)
  const handleStartMemberInline = () => {
    setDraftMemberFields(JSON.parse(JSON.stringify(memberFields)));
    setIsEditingMemberInline(true);
  };

  const handleSaveMemberInline = () => {
    setMemberFields(draftMemberFields);
    onUpdateMemberFields?.(draftMemberFields);
    setIsEditingMemberInline(false);
    onShowToast('会员设定修改完成，将于 1小时 内生效', 'success');
  };

  const handleCancelMemberInline = () => {
    setDraftMemberFields(JSON.parse(JSON.stringify(memberFields)));
    setIsEditingMemberInline(false);
    onShowToast('已取消会员设定修改', 'info');
  };

  const renderMemberCell = (
    field: MemberFieldConfig,
    key: keyof MemberFieldConfig,
    isLocked?: boolean
  ) => {
    const value = field[key] as boolean | '-';

    if (value === '-') {
      return <span className="text-gray-400 font-medium">-</span>;
    }

    if (isEditingMemberInline) {
      return (
        <div className="flex items-center justify-center">
          <TableCheckbox
            checked={Boolean(value)}
            disabled={isLocked}
            onChange={(newVal) => {
              if (isLocked) return;
              setDraftMemberFields((prev) =>
                prev.map((f) => (f.id === field.id ? { ...f, [key]: newVal } : f))
              );
            }}
          />
        </div>
      );
    }

    // Read-only mode
    if (value === true) {
      return <Check className="w-4 h-4 text-[#1e7e34] stroke-[2.8] mx-auto" />;
    }
    return <span className="text-transparent">-</span>;
  };

  // Inline editing handlers for Agent Settings (经销商注册设定)
  const handleStartAgentInline = () => {
    setDraftAgentFields(JSON.parse(JSON.stringify(agentFields)));
    setIsEditingAgentInline(true);
  };

  const handleSaveAgentInline = () => {
    setAgentFields(draftAgentFields);
    setIsEditingAgentInline(false);
    onShowToast('经销商注册设定修改完成，将于 1小时 内生效', 'success');
  };

  const handleCancelAgentInline = () => {
    setDraftAgentFields(JSON.parse(JSON.stringify(agentFields)));
    setIsEditingAgentInline(false);
    onShowToast('已取消经销商注册设定修改', 'info');
  };

  const renderAgentCell = (
    field: AgentFieldConfig,
    key: keyof AgentFieldConfig
  ) => {
    const value = field[key] as boolean | '-';

    if (value === '-') {
      return <span className="text-gray-400 font-medium">-</span>;
    }

    if (isEditingAgentInline) {
      return (
        <div className="flex items-center justify-center">
          <TableCheckbox
            checked={Boolean(value)}
            onChange={(newVal) => {
              setDraftAgentFields((prev) =>
                prev.map((f) => (f.id === field.id ? { ...f, [key]: newVal } : f))
              );
            }}
          />
        </div>
      );
    }

    // Read-only mode
    if (value === true) {
      return <Check className="w-4 h-4 text-[#1e7e34] stroke-[2.8] mx-auto" />;
    }
    return <span className="text-transparent">-</span>;
  };

  // Handlers for Level 1 List
  const handleSelectItem = (item: MemberSettingListItem) => {
    setSelectedItemId(item.id);
    onSelectItemId?.(item.id);
    setSettingName(item.name);
    setIsDepositEnabled(item.companyDeposit);
    setIsWithdrawEnabled(item.withdrawApply);
    if (item.memo && item.memo !== '-') {
      setNotes(`${item.name} 相關備註：${item.memo}`);
    } else {
      setNotes(`${item.name} 系統預設會員端與經銷商端註冊規則。`);
    }
    changeLevel('detail');
    onShowToast(`已切換至 ${item.name} 設定詳情`, 'info');
  };

  const handleToggleCompanyDeposit = (id: string) => {
    setSettingItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.companyDeposit;
          if (id === selectedItemId) {
            setIsDepositEnabled(next);
          }
          onShowToast(`${item.name} 公司入款已${next ? '開啟' : '關閉'}`, 'success');
          return { ...item, companyDeposit: next };
        }
        return item;
      })
    );
  };

  const handleToggleWithdrawApply = (id: string) => {
    setSettingItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.withdrawApply;
          if (id === selectedItemId) {
            setIsWithdrawEnabled(next);
          }
          onShowToast(`${item.name} 取款申請已${next ? '開啟' : '關閉'}`, 'success');
          return { ...item, withdrawApply: next };
        }
        return item;
      })
    );
  };

  const handleToggleAuditSwitch = (id: string) => {
    setSettingItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.auditSwitch;
          onShowToast(`${item.name} 稽核開關已${next ? '開啟' : '關閉'}`, 'info');
          return { ...item, auditSwitch: next };
        }
        return item;
      })
    );
  };

  const handleAddNewSetting = () => {
    const newName = `Config-${settingItems.length + 1}`;
    const newItem: MemberSettingListItem = {
      id: `custom-${Date.now()}`,
      name: newName,
      companyDeposit: true,
      withdrawApply: true,
      auditSwitch: false,
      memo: '-',
    };
    setSettingItems((prev) => [newItem, ...prev]);
    onShowToast(`已新增 ${newName} 設定`, 'success');
  };

  return (
    <div className="w-full bg-[#f4f6f9] min-h-screen text-gray-800 flex flex-col font-sans select-none">
      {/* 1. Top Admin Dark Navigation Bar matching screenshot exactly */}
      <header className="w-full bg-[#1c222b] text-gray-300 text-xs shadow-md">
        <div className="w-full px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Left navigation links */}
          <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto no-scrollbar">
            <span className="text-white font-bold text-sm tracking-wide shrink-0">
              【UAT-02】
            </span>
            <div 
              onClick={() => setCurrentLevel('list')}
              className="flex items-center space-x-1 hover:text-white cursor-pointer transition-colors shrink-0 text-white font-semibold"
              title="點擊返回會員端設定列表"
            >
              <span>会员</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="flex items-center space-x-1 hover:text-white cursor-pointer transition-colors shrink-0">
              <span>帐务管理</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="flex items-center space-x-1 hover:text-white cursor-pointer transition-colors shrink-0">
              <span>系统管理</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="flex items-center space-x-1 hover:text-white cursor-pointer transition-colors shrink-0">
              <span>各式报表</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="flex items-center space-x-1 hover:text-white cursor-pointer transition-colors shrink-0">
              <span>经销商</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>

          {/* Right utility items matching screenshot */}
          <div className="flex items-center space-x-4 shrink-0 pl-3">
            <div className="hidden sm:flex items-center space-x-3 text-xs text-gray-300">
              <span className="flex items-center space-x-1">
                <span className="text-gray-400">👤</span>
                <span>0人</span>
              </span>
              <span>🕒 2026/09/09 (三) 02:18:30</span>
            </div>
            <div className="relative flex items-center cursor-pointer">
              <span className="text-amber-400 text-sm">🔔</span>
              <span className="ml-1 bg-[#d9534f] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight">
                67
              </span>
            </div>
            <div className="flex items-center space-x-1 text-gray-200 hover:text-white cursor-pointer">
              <span>哈罗!! 您好</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            {/* Header Quick Tools Trigger */}
            <button
              id="btn-backend-header-widget-trigger"
              type="button"
              onClick={() => setIsWidgetMenuOpen(true)}
              className="flex items-center justify-center p-1.5 bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white rounded transition-colors cursor-pointer border border-white/10"
              title="控制會員 Portal 加密資訊「查看」功能是否開啟"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="text-[11px] bg-sky-600 hover:bg-sky-500 text-white px-2 py-1 rounded transition-colors cursor-pointer"
              >
                返回前台
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Main Page Content (White background) */}
      <main className="flex-1 bg-white p-4 sm:p-8 max-w-7xl w-full mx-auto my-2 sm:my-4 rounded-xs sm:rounded-sm shadow-xs border border-gray-200">
        {/* Level 1: 会员端设定列表 (Matching Screenshot Exactly) */}
        {currentLevel === 'list' ? (
          <div>
            {/* Page Title */}
            <div className="pb-4 mb-5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-baseline space-x-1">
                <h1 className="text-xl sm:text-2xl font-normal text-gray-800 tracking-wide">
                  会员端设定
                </h1>
                <span className="text-sm sm:text-base text-gray-700 font-normal">列表</span>
              </div>
              <div className="flex sm:hidden items-center space-x-2 text-xs text-gray-500">
                <span>0人</span>
                <span>2026/09/09 02:18:30</span>
              </div>
            </div>

            {/* List Table Component */}
            <MemberSettingsListView
              items={settingItems}
              onSelectItem={handleSelectItem}
              onToggleCompanyDeposit={handleToggleCompanyDeposit}
              onToggleWithdrawApply={handleToggleWithdrawApply}
              onToggleAuditSwitch={handleToggleAuditSwitch}
              onAddNewSetting={handleAddNewSetting}
            />
          </div>
        ) : (
          /* Level 2: 会员端设定详情 (Default3 等) */
          <div>
            {/* Page Title with Return to List Button */}
            <div className="pb-4 mb-6 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => changeLevel('list')}
                  className="px-2.5 py-1 text-xs rounded border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700 flex items-center space-x-1 transition-colors cursor-pointer"
                  title="回到会员端设定列表"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>返回会员端设定列表</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-normal text-gray-800 tracking-wide flex items-center space-x-2">
                  <span>会员端设定</span>
                  <span className="text-gray-600 text-lg sm:text-xl">{settingName}</span>
                </h1>
              </div>
              <span className="text-xs text-gray-400">系統版本: UAT-02.Release-3.1</span>
            </div>

        {/* Section 1: Bullet Settings List */}
        <div className="space-y-4 mb-8 text-xs sm:text-sm text-gray-700">
          {/* Bullet 1: 设定名称 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-900 font-bold">•</span>
            <span>设定名称为 {settingName}</span>
            <button
              onClick={() => {
                setTempSettingName(settingName);
                setIsEditingNameModal(true);
              }}
              className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer ml-1 text-xs"
            >
              修改
            </button>
          </div>

          {/* Bullet 2: 公司入款目前为 */}
          <div className="flex items-center space-x-3">
            <span className="text-gray-900 font-bold">•</span>
            <span>公司入款目前为</span>
            <button
              type="button"
              onClick={() => {
                const next = !isDepositEnabled;
                setIsDepositEnabled(next);
                onShowToast(`公司入款已${next ? '开启' : '关闭'}`, 'success');
              }}
              className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                isDepositEnabled ? 'bg-[#52c41a]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  isDepositEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs ${isDepositEnabled ? 'text-[#389e0d] font-medium' : 'text-gray-500'}`}>
              {isDepositEnabled ? '开启' : '关闭'}
            </span>
          </div>

          {/* Bullet 3: 取款申请目前为 */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-gray-900 font-bold">•</span>
              <span>取款申请目前为</span>
              <button
                type="button"
                onClick={() => {
                  const next = !isWithdrawEnabled;
                  setIsWithdrawEnabled(next);
                  onShowToast(`取款申请目前为${next ? '开启' : '关闭'}`, 'success');
                }}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  isWithdrawEnabled ? 'bg-[#52c41a]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isWithdrawEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-xs ${isWithdrawEnabled ? 'text-[#389e0d] font-medium' : 'text-gray-500'}`}>
                {isWithdrawEnabled ? '开启' : '关闭'}
              </span>
              <button
                onClick={() => setIsPromptModalOpen(true)}
                className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer ml-1 text-xs"
              >
                检视关闭时提示文字
              </button>
            </div>

            {/* Sub-item: 免切取款时间 */}
            <div className="pl-5 text-xs text-gray-600 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">免切取款时间</span>
                <button
                  type="button"
                  onClick={() => setIsFreeTimeEnabled(!isFreeTimeEnabled)}
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      isFreeTimeEnabled ? 'border-[#1890ff]' : 'border-gray-400'
                    }`}
                  >
                    {isFreeTimeEnabled && <span className="w-2 h-2 rounded-full bg-[#1890ff]" />}
                  </span>
                  <span className={isFreeTimeEnabled ? 'text-[#1890ff] font-medium' : 'text-gray-500'}>
                    开启
                  </span>
                </button>
                <span className="text-gray-800 ml-2">{freeTimeSlots[0] || '每日 02:00 ~ 02:59'}</span>
                <button
                  onClick={() => {
                    setTempTimeSlots(freeTimeSlots.join('\n'));
                    setIsEditingTimeModal(true);
                  }}
                  className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer text-xs"
                >
                  修改
                </button>
                <span
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  title="在此设定的时间段内，会员申请取款将免除切帐与审核阻断"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </span>
              </div>
              {freeTimeSlots.slice(1).map((slot, idx) => (
                <div key={idx} className="pl-24 text-gray-800">
                  {slot}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: 会员设定 (Member Settings Table) */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-900 font-bold">•</span>
              <span className="text-sm font-semibold text-gray-800">会员设定</span>
              {isEditingMemberInline ? (
                <div className="flex items-center space-x-2 ml-1 text-xs">
                  <button
                    type="button"
                    onClick={handleSaveMemberInline}
                    className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer"
                  >
                    更新
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelMemberInline}
                    className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer"
                  >
                    取消
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleStartMemberInline}
                  className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer text-xs"
                >
                  修改
                </button>
              )}
            </div>

            {isEditingMemberInline && (
              <div className="flex items-center space-x-1 text-xs text-[#d9534f] font-normal">
                <AlertTriangle className="w-3.5 h-3.5 text-[#d9534f] fill-[#d9534f] text-white shrink-0 mr-0.5" />
                <span>请注意，修改完成后将于</span>
                <span className="bg-[#d9534f] text-white px-1 py-0.2 rounded text-[11px] font-bold leading-tight">
                  1小时
                </span>
                <span>内生效</span>
              </div>
            )}
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-xs shadow-xs">
            <table className="w-full text-center text-xs text-gray-700 border-collapse">
              <thead>
                <tr className="bg-[#fafafa] border-b border-gray-200 font-medium text-gray-600">
                  <th className="py-2.5 px-4 font-semibold text-left sm:text-center w-32">栏位</th>
                  <th className="py-2.5 px-4 font-semibold w-28">注册显示</th>
                  <th className="py-2.5 px-4 font-semibold w-28">注册必填</th>
                  <th className="py-2.5 px-4 font-semibold w-32">基本资料显示</th>
                  <th className="py-2.5 px-4 font-semibold w-32">基本资料填写</th>
                  <th className="py-2.5 px-4 font-semibold w-24">
                    <span className="border-b border-dashed border-gray-400 pb-0.5">唯一</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(isEditingMemberInline ? draftMemberFields : memberFields).map((field) => (
                  <tr key={field.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-2 px-4 text-left sm:text-center font-medium text-gray-800 flex items-center justify-start sm:justify-center space-x-1">
                      <span>{field.name}</span>
                      {field.hasInfoBadge && (
                        <span
                          className="w-3.5 h-3.5 rounded-full bg-[#d9534f] text-white text-[9px] font-bold inline-flex items-center justify-center cursor-pointer ml-1 leading-none shrink-0"
                          title="核心栏位"
                        >
                          i
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4">{renderMemberCell(field, 'registerDisplay', field.lockedRegisterDisplay)}</td>
                    <td className="py-2 px-4">{renderMemberCell(field, 'registerRequired', field.lockedRegisterRequired)}</td>
                    <td className="py-2 px-4">{renderMemberCell(field, 'profileDisplay', field.lockedProfileDisplay)}</td>
                    <td className="py-2 px-4">{renderMemberCell(field, 'profileEditable', field.lockedProfileEditable)}</td>
                    <td className="py-2 px-4">{renderMemberCell(field, 'isUnique', field.lockedIsUnique)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: 经销商注册设定 (Agent Registration Settings Table) */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between mb-3 gap-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-gray-900 font-bold">•</span>
              <span className="text-sm font-semibold text-gray-800">经销商注册设定</span>
              {isEditingAgentInline ? (
                <div className="flex items-center space-x-2 ml-1 text-xs">
                  <button
                    type="button"
                    onClick={handleSaveAgentInline}
                    className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer"
                  >
                    更新
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelAgentInline}
                    className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer"
                  >
                    取消
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleStartAgentInline}
                  className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer text-xs"
                >
                  修改
                </button>
              )}
            </div>

            {isEditingAgentInline && (
              <div className="flex items-center space-x-1 text-xs text-[#d9534f] font-normal">
                <AlertTriangle className="w-3.5 h-3.5 text-[#d9534f] fill-[#d9534f] text-white shrink-0 mr-0.5" />
                <span>请注意，修改完成后将于</span>
                <span className="bg-[#d9534f] text-white px-1 py-0.2 rounded text-[11px] font-bold leading-tight">
                  1小时
                </span>
                <span>内生效</span>
              </div>
            )}
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-xs shadow-xs max-w-2xl">
            <table className="w-full text-center text-xs text-gray-700 border-collapse">
              <thead>
                <tr className="bg-[#fafafa] border-b border-gray-200 font-medium text-gray-600">
                  <th className="py-2.5 px-4 font-semibold text-left sm:text-center w-36">栏位</th>
                  <th className="py-2.5 px-4 font-semibold w-28">显示</th>
                  <th className="py-2.5 px-4 font-semibold w-28">必填</th>
                  <th className="py-2.5 px-4 font-semibold w-28">
                    <span className="border-b border-dashed border-gray-400 pb-0.5">唯一</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(isEditingAgentInline ? draftAgentFields : agentFields).map((field) => (
                  <tr key={field.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-2 px-4 text-left sm:text-center font-medium text-gray-800">
                      {field.name}
                    </td>
                    <td className="py-2 px-4">{renderAgentCell(field, 'display')}</td>
                    <td className="py-2 px-4">{renderAgentCell(field, 'required')}</td>
                    <td className="py-2 px-4">{renderAgentCell(field, 'isUnique')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

            {/* Section 4: 备注 (Notes) */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-gray-900 font-bold">•</span>
                <span className="text-sm font-semibold text-gray-800">备注</span>
                <button
                  onClick={() => {
                    setTempNotes(notes);
                    setIsEditingNotesModal(true);
                  }}
                  className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer text-xs"
                >
                  修改
                </button>
              </div>
              <div className="pl-4 text-xs text-gray-600 bg-gray-50 p-3 rounded border border-gray-100 max-w-3xl">
                {notes}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: 修改设定名称 */}
      {isEditingNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-5 space-y-4 border border-gray-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-semibold text-gray-800 text-sm">修改设定名称</h3>
              <button
                onClick={() => setIsEditingNameModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">设定名称</label>
              <input
                type="text"
                value={tempSettingName}
                onChange={(e) => setTempSettingName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsEditingNameModal(false)}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setSettingName(tempSettingName);
                  setIsEditingNameModal(false);
                  onShowToast(`设定名称已更新为 ${tempSettingName}`, 'success');
                }}
                className="px-4 py-1.5 bg-[#1890ff] hover:bg-[#40a9ff] text-white rounded text-xs font-medium"
              >
                储存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: 检视关闭时提示文字 */}
      {isPromptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-5 space-y-4 border border-gray-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-semibold text-gray-800 text-sm">关闭取款时提示文字设定</h3>
              <button
                onClick={() => setIsPromptModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                当取款申请关闭时，前台弹窗显示的提示文案：
              </label>
              <textarea
                rows={4}
                value={closePromptText}
                onChange={(e) => setClosePromptText(e.target.value)}
                className="w-full border border-gray-300 rounded p-2.5 text-xs focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsPromptModalOpen(false)}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setIsPromptModalOpen(false);
                  onShowToast('关闭提示文案已成功更新', 'success');
                }}
                className="px-4 py-1.5 bg-[#1890ff] hover:bg-[#40a9ff] text-white rounded text-xs font-medium"
              >
                确认储存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: 修改免切取款时间 */}
      {isEditingTimeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-5 space-y-4 border border-gray-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-semibold text-gray-800 text-sm">修改免切取款时间</h3>
              <button
                onClick={() => setIsEditingTimeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                时段清单 (每行一个时段，例如：每日 02:00 ~ 02:59)
              </label>
              <textarea
                rows={4}
                value={tempTimeSlots}
                onChange={(e) => setTempTimeSlots(e.target.value)}
                className="w-full border border-gray-300 rounded p-2.5 text-xs font-mono focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsEditingTimeModal(false)}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  const filtered = tempTimeSlots
                    .split('\n')
                    .map((s) => s.trim())
                    .filter(Boolean);
                  setFreeTimeSlots(filtered);
                  setIsEditingTimeModal(false);
                  onShowToast('免切取款时间已成功更新', 'success');
                }}
                className="px-4 py-1.5 bg-[#1890ff] hover:bg-[#40a9ff] text-white rounded text-xs font-medium"
              >
                储存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: 修改会员设定 */}
      {isEditingMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-5 space-y-4 border border-gray-200 animate-in fade-in max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-semibold text-gray-800 text-sm">修改会员设定</h3>
              <button
                onClick={() => setIsEditingMemberModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 text-xs">
              <p className="text-gray-500 mb-3 text-[11px]">
                勾选或取消勾选以变更各栏位之显示、必填与唯一性规则：
              </p>
              <table className="w-full text-center border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">栏位</th>
                    <th className="p-2 border">注册显示</th>
                    <th className="p-2 border">注册必填</th>
                    <th className="p-2 border">基本资料显示</th>
                    <th className="p-2 border">基本资料填写</th>
                    <th className="p-2 border">唯一</th>
                  </tr>
                </thead>
                <tbody>
                  {editingMemberFields.map((field, idx) => (
                    <tr key={field.id} className="hover:bg-gray-50">
                      <td className="p-2 border font-medium text-left pl-3">{field.name}</td>
                      <td className="p-2 border">
                        {field.registerDisplay === '-' ? (
                          '-'
                        ) : (
                          <input
                            type="checkbox"
                            checked={Boolean(field.registerDisplay)}
                            onChange={(e) => {
                              const updated = [...editingMemberFields];
                              updated[idx].registerDisplay = e.target.checked;
                              setEditingMemberFields(updated);
                            }}
                          />
                        )}
                      </td>
                      <td className="p-2 border">
                        {field.registerRequired === '-' ? (
                          '-'
                        ) : (
                          <input
                            type="checkbox"
                            checked={Boolean(field.registerRequired)}
                            onChange={(e) => {
                              const updated = [...editingMemberFields];
                              updated[idx].registerRequired = e.target.checked;
                              setEditingMemberFields(updated);
                            }}
                          />
                        )}
                      </td>
                      <td className="p-2 border">
                        {field.profileDisplay === '-' ? (
                          '-'
                        ) : (
                          <input
                            type="checkbox"
                            checked={Boolean(field.profileDisplay)}
                            onChange={(e) => {
                              const updated = [...editingMemberFields];
                              updated[idx].profileDisplay = e.target.checked;
                              setEditingMemberFields(updated);
                            }}
                          />
                        )}
                      </td>
                      <td className="p-2 border">
                        {field.profileEditable === '-' ? (
                          '-'
                        ) : (
                          <input
                            type="checkbox"
                            checked={Boolean(field.profileEditable)}
                            onChange={(e) => {
                              const updated = [...editingMemberFields];
                              updated[idx].profileEditable = e.target.checked;
                              setEditingMemberFields(updated);
                            }}
                          />
                        )}
                      </td>
                      <td className="p-2 border">
                        {field.isUnique === '-' ? (
                          '-'
                        ) : (
                          <input
                            type="checkbox"
                            checked={Boolean(field.isUnique)}
                            onChange={(e) => {
                              const updated = [...editingMemberFields];
                              updated[idx].isUnique = e.target.checked;
                              setEditingMemberFields(updated);
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end space-x-2 pt-2 border-t">
              <button
                onClick={() => setIsEditingMemberModal(false)}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setMemberFields(editingMemberFields);
                  setIsEditingMemberModal(false);
                  onShowToast('会员端设定已成功保存', 'success');
                }}
                className="px-4 py-1.5 bg-[#1890ff] hover:bg-[#40a9ff] text-white rounded text-xs font-medium"
              >
                储存设定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: 修改经销商设定 */}
      {isEditingAgentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-5 space-y-4 border border-gray-200 animate-in fade-in max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-semibold text-gray-800 text-sm">修改经销商注册设定</h3>
              <button
                onClick={() => setIsEditingAgentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 text-xs">
              <table className="w-full text-center border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">栏位</th>
                    <th className="p-2 border">显示</th>
                    <th className="p-2 border">必填</th>
                    <th className="p-2 border">唯一</th>
                  </tr>
                </thead>
                <tbody>
                  {editingAgentFields.map((field, idx) => (
                    <tr key={field.id} className="hover:bg-gray-50">
                      <td className="p-2 border font-medium text-left pl-3">{field.name}</td>
                      <td className="p-2 border">
                        {field.display === '-' ? (
                          '-'
                        ) : (
                          <input
                            type="checkbox"
                            checked={Boolean(field.display)}
                            onChange={(e) => {
                              const updated = [...editingAgentFields];
                              updated[idx].display = e.target.checked;
                              setEditingAgentFields(updated);
                            }}
                          />
                        )}
                      </td>
                      <td className="p-2 border">
                        {field.required === '-' ? (
                          '-'
                        ) : (
                          <input
                            type="checkbox"
                            checked={Boolean(field.required)}
                            onChange={(e) => {
                              const updated = [...editingAgentFields];
                              updated[idx].required = e.target.checked;
                              setEditingAgentFields(updated);
                            }}
                          />
                        )}
                      </td>
                      <td className="p-2 border">
                        {field.isUnique === '-' ? (
                          '-'
                        ) : (
                          <input
                            type="checkbox"
                            checked={Boolean(field.isUnique)}
                            onChange={(e) => {
                              const updated = [...editingAgentFields];
                              updated[idx].isUnique = e.target.checked;
                              setEditingAgentFields(updated);
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end space-x-2 pt-2 border-t">
              <button
                onClick={() => setIsEditingAgentModal(false)}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setAgentFields(editingAgentFields);
                  setIsEditingAgentModal(false);
                  onShowToast('经销商注册设定已成功保存', 'success');
                }}
                className="px-4 py-1.5 bg-[#1890ff] hover:bg-[#40a9ff] text-white rounded text-xs font-medium"
              >
                储存设定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: 修改备注 */}
      {isEditingNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-5 space-y-4 border border-gray-200 animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-semibold text-gray-800 text-sm">修改备注</h3>
              <button
                onClick={() => setIsEditingNotesModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">备注内容</label>
              <textarea
                rows={4}
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                className="w-full border border-gray-300 rounded p-2.5 text-xs focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsEditingNotesModal(false)}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setNotes(tempNotes);
                  setIsEditingNotesModal(false);
                  onShowToast('备注已成功更新', 'success');
                }}
                className="px-4 py-1.5 bg-[#1890ff] hover:bg-[#40a9ff] text-white rounded text-xs font-medium"
              >
                储存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. 側邊小工具選單 - 懸浮齒輪觸發鈕 (Floating Gear Widget Tab - 僅顯示圖示) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          id="btn-backend-sidebar-widget-trigger"
          type="button"
          onClick={() => setIsWidgetMenuOpen(true)}
          className="bg-white border-y border-l border-gray-300 hover:border-[#1890ff] shadow-md hover:shadow-lg rounded-l-md p-2.5 flex items-center justify-center cursor-pointer text-gray-700 hover:text-[#1890ff] transition-all group bg-white/95 backdrop-blur-xs"
          title="控制會員 Portal 加密資訊「查看」功能是否開啟"
        >
          <Settings className="w-5 h-5 text-gray-600 group-hover:text-[#1890ff] group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>

      {/* 4. 側邊小工具選單 Drawer (Slide-out Widget Menu) */}
      {isWidgetMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/35 backdrop-blur-xs transition-opacity"
            onClick={() => setIsWidgetMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-88 sm:w-[420px] bg-white h-full shadow-2xl flex flex-col z-10 border-l border-gray-200 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/80">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 border border-gray-200">
                  <Settings className="w-4 h-4 text-gray-700" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    控制會員 Portal 加密資訊「查看」功能是否開啟
                  </h2>
                  <p className="text-[11px] text-gray-500 font-mono">
                    Admin- 平台工具 &gt;&gt; 獨立站系統 &gt;&gt; 站台系統值 &gt;&gt; 新增參數
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWidgetMenuOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                title="關閉選單"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Feature Item: 控制會員 Portal 加密資訊「查看」功能是否開啟 */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-2xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#1890ff] shrink-0" />
                    <span className="text-xs font-semibold text-gray-800">
                      控制會員 Portal 加密資訊「查看」功能是否開啟
                    </span>
                  </div>
                  {/* Current Status Badge */}
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      viewEncryptedInfo
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {viewEncryptedInfo ? 'True(開)' : 'False(關)'}
                  </span>
                </div>

                {/* True / False Selectable Options (Radio Cards) */}
                <div className="space-y-3 pt-1">
                  {/* Option: True(開) */}
                  <div
                    onClick={() => handleToggleEncryptedSwitch(true)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start space-x-3 ${
                      viewEncryptedInfo
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-xs ring-1 ring-emerald-400/30'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      <span
                        className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                          viewEncryptedInfo
                            ? 'border-emerald-500 bg-emerald-500 text-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {viewEncryptedInfo && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-gray-900">True(開)</span>
                        <span className="text-[10px] font-medium text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                          已啟用
                        </span>
                      </div>
                      <ul className="text-[11px] text-gray-700 space-y-1 pl-1 list-disc list-outside ml-3">
                        <li>敏感欄位(銀行帳號、手機號碼、電子信箱、數位銀行帳號)旁顯示「👁 查看」圖示</li>
                        <li>點擊觸發驗證彈窗，輸入提款密碼</li>
                        <li>驗證成功後，該頁面所有加密項目同步顯示完整資料</li>
                        <li>Web、Mobile 皆依此開關統一控制</li>
                      </ul>
                    </div>
                  </div>

                  {/* Option: False(關) */}
                  <div
                    onClick={() => handleToggleEncryptedSwitch(false)}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start space-x-3 ${
                      !viewEncryptedInfo
                        ? 'border-rose-500 bg-rose-50/50 shadow-xs ring-1 ring-rose-400/30'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      <span
                        className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                          !viewEncryptedInfo
                            ? 'border-rose-500 bg-rose-500 text-white'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {!viewEncryptedInfo && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-gray-900">False(關)</span>
                        <span className="text-[10px] font-medium text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                          已關閉
                        </span>
                      </div>
                      <ul className="text-[11px] text-gray-700 space-y-1 pl-1 list-disc list-outside ml-3">
                        <li>維持現況遮罩顯示</li>
                        <li>不出現「👁 查看」圖示</li>
                        <li>會員無法查看完整明碼資訊</li>
                        <li>Web、Mobile 皆一致</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information Notice */}
              <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 text-[11px] text-sky-800 flex items-start space-x-2">
                <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong>前後台即時聯動生效：</strong>
                  <div className="mt-0.5 text-sky-700">
                    設定切換後立即同步至 Web 與 Mobile 會員中心（基本資料、銀行卡提款帳號、數位銀行帳號），不需重新整理。
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                目前狀態：<strong className="font-mono font-bold text-gray-800">{viewEncryptedInfo ? 'True(開)' : 'False(關)'}</strong>
              </span>
              <button
                type="button"
                onClick={() => setIsWidgetMenuOpen(false)}
                className="px-4 py-1.5 bg-[#1890ff] hover:bg-[#40a9ff] text-white rounded text-xs font-medium cursor-pointer transition-colors shadow-2xs"
              >
                完成
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
