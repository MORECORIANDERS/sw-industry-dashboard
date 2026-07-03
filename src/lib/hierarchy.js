import hierarchyData from '../../data/申万行业层级关系.json';

export const hierarchy = hierarchyData;

export function getSecondaryCount() {
  let n = 0;
  for (const s of hierarchyData.六大板块) {
    for (const p of s.children) n += p.children.length;
  }
  return n;
}
