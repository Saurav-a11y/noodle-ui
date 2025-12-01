"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";

export default function ComparisonModal({ isOpen, onClose, data }) {
    if (!isOpen || !data) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[900px] w-full bg-[var(--bg-block)]">
                <DialogHeader>
                    <DialogTitle className="text-reddit text-[var(--text)]">
                        <p className="text-xl font-semibold mb-1">
                            Comparison Result
                        </p>
                        <p className="text-xs font-light">Side-by-side comparison of {data.assets.length} stabelcoins</p>
                    </DialogTitle>
                </DialogHeader>

                {/* Grid of cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-b py-5">
                    {data.assets.map((asset) => {
                        const isWinnerMarketCap =
                            data.summary.highestMarketCap === asset.id;

                        const isWinnerVolume = data.summary.highestVolume === asset.id;

                        const isWinnerPeg = data.summary.closestToPeg === asset.id;

                        return (
                            <div
                                key={asset.id}
                                className="p-4 rounded-xl border text-[var(--text)]"
                            >
                                <p className="font-semibold">{asset.name}</p>
                                <p className="text-xs opacity-60 mb-2">{asset.id}</p>

                                {/* Market Cap */}
                                <div className="mt-3">
                                    <p className="text-sm flex justify-between mb-2">
                                        <span className="opacity-60">
                                            Market Cap
                                        </span>
                                        {isWinnerMarketCap && (
                                            <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                                👑 Highest
                                            </span>
                                        )}
                                    </p>
                                    <p className="font-medium">${asset.metrics.marketCap.toLocaleString()}</p>
                                </div>

                                {/* Volume */}
                                <div className="mt-3">
                                    <p className="text-sm flex justify-between mb-2">
                                        <span className="opacity-60">
                                            24h Volume
                                        </span>
                                        {isWinnerVolume && (
                                            <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                                                👑 Highest
                                            </span>
                                        )}
                                    </p>
                                    <p className="font-medium">${asset.metrics.volume24h.toLocaleString()}</p>
                                </div>

                                {/* Price */}
                                <div className="mt-2">
                                    <p className="text-sm flex justify-between mb-2">
                                        <span className="opacity-60">Price</span>
                                        {isWinnerPeg && (
                                            <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                                                👑 Best Peg
                                            </span>
                                        )}
                                    </p>
                                    <p className="font-medium">${asset.metrics.price}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="text-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}