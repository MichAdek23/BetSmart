
import React, { useState, useEffect } from 'react';
import { X, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BetItem {
  id: string;
  title: string;
  odds: string;
  stake?: number;
}

interface BetSlipProps {
  bets: BetItem[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onStakeChange: (id: string, stake: number) => void;
}

const BetSlip: React.FC<BetSlipProps> = ({ 
  bets, 
  onRemove, 
  onClearAll,
  onStakeChange
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [totalStake, setTotalStake] = useState(0);
  const [potentialWinnings, setPotentialWinnings] = useState(0);

  useEffect(() => {
    // Calculate total stake and potential winnings
    let total = 0;
    let winnings = 0;

    bets.forEach(bet => {
      const stake = bet.stake || 0;
      total += stake;
      winnings += stake * parseFloat(bet.odds);
    });

    setTotalStake(total);
    setPotentialWinnings(winnings);
  }, [bets]);

  if (bets.length === 0) {
    return null;
  }

  return (
    <div className={cn(
      "fixed bottom-0 right-0 z-40 w-full md:w-80 bg-white border-t md:border-l border-border shadow-lg transition-transform duration-300 ease-in-out",
      isCollapsed ? "transform translate-y-[calc(100%-3rem)]" : ""
    )}>
      <div 
        className="p-3 flex justify-between items-center bg-background border-b border-border cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center">
          <span className="font-medium">Bet Slip</span>
          <span className="ml-2 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {bets.length}
          </span>
        </div>
        <div className="flex items-center">
          {!isCollapsed && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClearAll();
              }}
              className="mr-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear All
            </button>
          )}
          {isCollapsed ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto">
        {bets.map((bet) => (
          <div key={bet.id} className="p-3 border-b border-border animate-fade-in">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium flex-1 pr-2">{bet.title}</p>
              <button 
                onClick={() => onRemove(bet.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-muted-foreground">Odds</span>
              <span className="text-sm font-medium">{bet.odds}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground mr-2">Stake:</span>
              <input
                type="number"
                value={bet.stake || ''}
                onChange={(e) => onStakeChange(bet.id, Number(e.target.value))}
                className="w-full border border-border rounded-md px-2 py-1 text-sm"
                placeholder="Enter amount"
                min="0"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-border bg-background">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Total Stake:</span>
          <span className="font-medium">${totalStake.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm">Potential Winnings:</span>
          <span className="font-medium text-primary">${potentialWinnings.toFixed(2)}</span>
        </div>
        <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-md transition-colors">
          Place Bet
        </button>
      </div>
    </div>
  );
};

export default BetSlip;
