#!/usr/bin/env python3
"""
盘后抓取申万行业指数日报数据，输出为 JSON 供前端静态使用。
周一至五 16:30 CST 由 GitHub Actions 触发。
"""

import akshare as ak
import pandas as pd
import json
from datetime import datetime, timezone, timedelta
from pathlib import Path

OUTPUT = Path(__file__).resolve().parent.parent / "public" / "data" / "market-data.json"
TZ_CST = timezone(timedelta(hours=8))


def to_float(val):
    try:
        return round(float(val), 2)
    except (ValueError, TypeError):
        return None


def fetch():
    today = datetime.now(TZ_CST).strftime("%Y%m%d")
    yesterday = (datetime.now(TZ_CST) - timedelta(days=1)).strftime("%Y%m%d")

    result = {
        "updated_at": datetime.now(TZ_CST).strftime("%Y-%m-%d %H:%M:%S"),
        "sector": [],
        "primary": [],
        "secondary": [],
    }

    symbols = [("sector", "风格指数"), ("primary", "一级行业"), ("secondary", "二级行业")]

    for key, symbol in symbols:
        try:
            df = ak.index_analysis_daily_sw(symbol=symbol, start_date=yesterday, end_date=today)
            if df is None or df.empty:
                print(f"[{symbol}] 无数据")
                continue
            items = []
            for _, row in df.iterrows():
                items.append({
                    "指数代码": str(row.get("指数代码", "")).strip(),
                    "指数名称": str(row.get("指数名称", "")).strip(),
                    "最新价": to_float(row.get("收盘指数")),
                    "涨跌幅": to_float(row.get("涨跌幅")),
                    "成交量": to_float(row.get("成交量")),
                })
            result[key] = items
            print(f"[{symbol}] {len(items)} 条")
        except Exception as e:
            print(f"[{symbol}] 失败: {e}")

    return result


if __name__ == "__main__":
    data = fetch()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n已保存到 {OUTPUT}")
