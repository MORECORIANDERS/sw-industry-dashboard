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


