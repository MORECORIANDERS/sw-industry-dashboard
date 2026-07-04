const CLOUDBASE_URL = import.meta.env.PUBLIC_CLOUDBASE_URL || '';
const CLOUDBASE_ENV = import.meta.env.PUBLIC_CLOUDBASE_ENV || '';

function getApiUrl(type) {
  if (CLOUDBASE_URL) {
    return `${CLOUDBASE_URL}/sw-index?type=${type}`;
  }
  if (CLOUDBASE_ENV) {
    return `https://${CLOUDBASE_ENV}.service.tcloudbase.com/sw-index?type=${type}`;
  }
  return '';
}

export async function fetchIndexData(type) {
  const url = getApiUrl(type);
  if (!url) {
    throw new Error('未配置 Cloudbase 环境 ID，请在 .env 中设置 PUBLIC_CLOUDBASE_ENV');
  }
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`API 请求失败 (${res.status})`);
  }
  return res.json();
}

export function isEmptyValue(v) {
  return v === null || v === undefined || v === '--';
}

export function formatPrice(v) {
  if (isEmptyValue(v)) return '--';
  return Number(v).toFixed(2);
}

export function formatChange(v) {
  if (isEmptyValue(v)) return { text: '--', cls: '' };
  const n = Number(v);
  return {
    text: n >= 0 ? `+${n.toFixed(2)}%` : `${n.toFixed(2)}%`,
    cls: n >= 0 ? 'up' : 'down',
  };
}

export const SECTOR_COLORS = {
  '周期': '#e74c3c',
  '先进制造': '#3498db',
  '科技(TMT)': '#9b59b6',
  '消费': '#e67e22',
  '医药医疗': '#2ecc71',
  '金融地产': '#f1c40f',
};

export const SECTOR_ORDER = /** @deprecated 未使用 */ ['周期', '先进制造', '科技(TMT)', '消费', '医药医疗', '金融地产'];
