"use client";
import * as React from "react";

type Holding = {
  id: string;
  title: string;
  tokens_owned: number;
  current_price_usd: number;
  est_value_usd: number;
  invested_usd: number;
};

export function InvestmentsTable({ holdings }: { holdings: Holding[] }) {
  if (!holdings?.length) {
    return (
      <div className="text-sm text-gray-600 border rounded-xl p-4">
        No investments yet. Buy your first tokens to see them here.
      </div>
    );
  }
  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3">Property</th>
            <th className="text-right p-3">Tokens</th>
            <th className="text-right p-3">Price (USD)</th>
            <th className="text-right p-3">Est. Value (USD)</th>
            <th className="text-right p-3">Invested (USD)</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => (
            <tr key={h.id} className="border-t">
              <td className="p-3">{h.title}</td>
              <td className="p-3 text-right">{h.tokens_owned}</td>
              <td className="p-3 text-right">{"$"}{h.current_price_usd}</td>
              <td className="p-3 text-right">{"$"}{h.est_value_usd}</td>
              <td className="p-3 text-right">{"$"}{h.invested_usd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

