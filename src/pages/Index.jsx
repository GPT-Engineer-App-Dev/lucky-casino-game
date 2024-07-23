import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '7️⃣'];
const colors = ['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500'];

const LuckySpin = () => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [balance, setBalance] = useState(1000);
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState(0);
  const [jackpot, setJackpot] = useState(10000);

  const spin = () => {
    if (balance < 10) return;
    setSpinning(true);
    setBalance(prev => prev - 10);
    setWin(0);

    const newReels = reels.map(() => Math.floor(Math.random() * symbols.length));
    const spinDuration = 2000 + Math.random() * 1000;

    setTimeout(() => {
      setReels(newReels);
      setSpinning(false);
      checkWin(newReels);
    }, spinDuration);
  };

  const checkWin = (newReels) => {
    if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
      // Jackpot
      if (newReels[0] === 5) {
        setWin(jackpot);
        setBalance(prev => prev + jackpot);
        setJackpot(10000);
      } else {
        const winAmount = (newReels[0] + 1) * 100;
        setWin(winAmount);
        setBalance(prev => prev + winAmount);
      }
    }
    setJackpot(prev => prev + 5);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Lucky Spin Casino</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Lucky Spin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-4 mb-8">
              {reels.map((reel, index) => (
                <div key={index} className={`w-24 h-24 ${colors[reel]} rounded-full flex items-center justify-center text-4xl`}>
                  {spinning ? <Loader2 className="animate-spin" size={48} /> : symbols[reel]}
                </div>
              ))}
            </div>
            <Button 
              onClick={spin} 
              disabled={spinning || balance < 10} 
              className="w-full text-lg py-6"
            >
              {spinning ? 'Spinning...' : 'Spin (10 credits)'}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Game Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-2xl font-bold">Balance: {balance} credits</p>
              <p className="text-xl">Jackpot: {jackpot} credits</p>
              {win > 0 && (
                <Alert>
                  <AlertTitle>Congratulations!</AlertTitle>
                  <AlertDescription>You won {win} credits!</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => setBalance(prev => prev + 100)} className="w-full">
                  <DollarSign className="mr-2" />
                  Add 100 credits
                </Button>
                <Button onClick={() => setBalance(1000)} variant="outline" className="w-full">
                  <RefreshCw className="mr-2" />
                  Reset Balance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LuckySpin;