import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

export interface MemberSettingListItem {
  id: string;
  name: string;
  companyDeposit: boolean;
  withdrawApply: boolean;
  auditSwitch: boolean;
  memo: string;
}

export const INITIAL_MEMBER_SETTING_LIST: MemberSettingListItem[] = [
  {
    id: 'default3',
    name: 'Default3',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '1212555',
  },
  {
    id: '02',
    name: '02',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '勿動',
  },
  {
    id: 'maggieTest',
    name: 'maggieTest',
    companyDeposit: false,
    withdrawApply: false,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: 'test1',
    name: 'test1',
    companyDeposit: false,
    withdrawApply: false,
    auditSwitch: false,
    memo: '123',
  },
  {
    id: 'test2',
    name: 'TEST2',
    companyDeposit: false,
    withdrawApply: true,
    auditSwitch: false,
    memo: '123',
  },
  {
    id: 'jiji4',
    name: 'JIJI4',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: 'jiji2',
    name: 'JIJI2',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: 'jiji2_2',
    name: 'JIJI2',
    companyDeposit: true,
    withdrawApply: false,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: 'r1',
    name: 'R1',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: 'memo',
  },
  {
    id: 'r2',
    name: 'R2',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: 'memo',
  },
  {
    id: 'r2_2',
    name: 'R2',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: 'memo',
  },
  {
    id: 'jiji',
    name: 'JIJI',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: '88',
    name: '88',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: '77',
    name: '77',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: 'jkTest01',
    name: 'jkTest01',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: 'testjk01',
    name: 'testjk01',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: 'joy',
    name: 'joy',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: 'jktest03',
    name: 'JKTEST03',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: 'jktest05',
    name: 'JKTEST05',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '-',
  },
  {
    id: 'finSss',
    name: 'finSss',
    companyDeposit: true,
    withdrawApply: false,
    auditSwitch: false,
    memo: '備註00',
  },
  {
    id: 'ycc',
    name: 'ycc',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: '1234',
  },
  {
    id: 'tientest',
    name: 'tientest',
    companyDeposit: true,
    withdrawApply: true,
    auditSwitch: false,
    memo: 'ttt',
  },
];

interface MemberSettingsListViewProps {
  items: MemberSettingListItem[];
  onSelectItem: (item: MemberSettingListItem) => void;
  onToggleCompanyDeposit: (id: string) => void;
  onToggleWithdrawApply: (id: string) => void;
  onToggleAuditSwitch: (id: string) => void;
  onAddNewSetting?: () => void;
}

export const MemberSettingsListView: React.FC<MemberSettingsListViewProps> = ({
  items,
  onSelectItem,
  onToggleCompanyDeposit,
  onToggleWithdrawApply,
  onToggleAuditSwitch,
  onAddNewSetting,
}) => {
  return (
    <div className="w-full">
      {/* Action Button: 新增会员端设定 */}
      <div className="mb-4">
        <button
          id="btn-add-member-setting"
          type="button"
          onClick={onAddNewSetting}
          className="bg-[#205081] hover:bg-[#1a436d] text-white px-3.5 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors shadow-xs flex items-center space-x-1 cursor-pointer"
        >
          <span>新增会员端设定</span>
        </button>
      </div>

      {/* Main Table Matching Screenshot Pixel for Pixel */}
      <div className="overflow-x-auto border border-gray-300 rounded-xs shadow-xs bg-white">
        <table className="w-full border-collapse text-xs sm:text-sm text-center">
          <thead>
            {/* First header row */}
            <tr className="bg-[#fafafa] text-gray-800 border-b border-gray-300 font-medium text-xs">
              <th rowSpan={2} className="border-r border-gray-300 px-4 py-2.5 w-36 font-semibold">
                名称
              </th>
              <th rowSpan={2} className="border-r border-gray-300 px-4 py-2.5 w-28 font-semibold">
                公司入款
              </th>
              <th colSpan={2} className="border-r border-gray-300 px-4 py-1.5 font-semibold bg-[#fafafa]">
                出款
              </th>
              <th rowSpan={2} className="border-r border-gray-300 px-4 py-2.5 w-36 font-semibold">
                会员设定
              </th>
              <th rowSpan={2} className="border-r border-gray-300 px-4 py-2.5 w-36 font-semibold">
                经销商注册设定
              </th>
              <th rowSpan={2} className="px-4 py-2.5 w-32 font-semibold">
                备注
              </th>
            </tr>
            {/* Second header row for 出款 subcolumns */}
            <tr className="bg-[#fafafa] text-gray-800 border-b border-gray-300 font-medium text-xs">
              <th className="border-r border-gray-300 px-3 py-1.5 w-24 font-normal text-gray-700">
                取款申请
              </th>
              <th className="border-r border-gray-300 px-3 py-1.5 w-28 font-normal text-gray-700">
                <div className="inline-flex items-center space-x-0.5">
                  <span>稽核开关</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-gray-800 text-white text-[9px] flex items-center justify-center font-bold">
                    i
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((row) => (
              <tr key={row.id} className="hover:bg-sky-50/50 transition-colors">
                {/* 1. 名称 (Clickable link to second level) */}
                <td className="border-r border-gray-200 px-4 py-2.5 text-center font-medium">
                  <button
                    type="button"
                    onClick={() => onSelectItem(row)}
                    className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer font-medium"
                    title={`检视 ${row.name} 会员端设定`}
                  >
                    {row.name}
                  </button>
                </td>

                {/* 2. 公司入款 Switch */}
                <td className="border-r border-gray-200 px-4 py-2.5 text-center">
                  <button
                    type="button"
                    onClick={() => onToggleCompanyDeposit(row.id)}
                    className={`relative inline-flex h-4.5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      row.companyDeposit ? 'bg-[#52c41a]' : 'bg-gray-300'
                    }`}
                    title={row.companyDeposit ? '已开启' : '已关闭'}
                  >
                    <span
                      className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        row.companyDeposit ? 'translate-x-4.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </td>

                {/* 3. 出款 - 取款申请 Switch */}
                <td className="border-r border-gray-200 px-3 py-2.5 text-center">
                  <button
                    type="button"
                    onClick={() => onToggleWithdrawApply(row.id)}
                    className={`relative inline-flex h-4.5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      row.withdrawApply ? 'bg-[#52c41a]' : 'bg-gray-300'
                    }`}
                    title={row.withdrawApply ? '已开启' : '已关闭'}
                  >
                    <span
                      className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        row.withdrawApply ? 'translate-x-4.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </td>

                {/* 4. 出款 - 稽核开关 Switch */}
                <td className="border-r border-gray-200 px-3 py-2.5 text-center">
                  <button
                    type="button"
                    onClick={() => onToggleAuditSwitch(row.id)}
                    className={`relative inline-flex h-4.5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      row.auditSwitch ? 'bg-[#52c41a]' : 'bg-gray-300'
                    }`}
                    title={row.auditSwitch ? '已开启' : '已关闭'}
                  >
                    <span
                      className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        row.auditSwitch ? 'translate-x-4.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </td>

                {/* 5. 会员设定 (检视会员设定) */}
                <td className="border-r border-gray-200 px-4 py-2.5 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectItem(row)}
                    className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer text-xs sm:text-sm"
                  >
                    检视会员设定
                  </button>
                </td>

                {/* 6. 经销商注册设定 (检视经销商注册设定) */}
                <td className="border-r border-gray-200 px-4 py-2.5 text-center">
                  <button
                    type="button"
                    onClick={() => onSelectItem(row)}
                    className="text-[#1890ff] hover:text-[#40a9ff] hover:underline cursor-pointer text-xs sm:text-sm"
                  >
                    检视经销商注册设定
                  </button>
                </td>

                {/* 7. 备注 */}
                <td className="px-4 py-2.5 text-center text-gray-700 text-xs sm:text-sm">
                  {row.memo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
