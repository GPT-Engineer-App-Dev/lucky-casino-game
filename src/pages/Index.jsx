import React, { useState, useEffect } from 'react';
import { Loader2, RefreshCw, DollarSign, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '7️⃣'];
const colors = ['bg-red-500', 'bg-yellow-500', 'bg-orange-500', 'bg-purple-500', 'bg-blue-500', 'bg-green-500'];

const LuckySpin = () => {
  const [reels, setReels] = useState([0, 0, 0]);
  const [balance, setBalance] = useState(1000);
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState(0);
  const [jackpot, setJackpot] = useState(10000);
  const [sound, setSound] = useState(true);

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
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-yellow-500 animate-pulse">Lucky Spin Casino</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="col-span-2 bg-gray-800 border-yellow-500 border-2">
            <CardHeader>
              <CardTitle className="text-3xl text-yellow-500">Lucky Spin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-4 mb-8">
                {reels.map((reel, index) => (
                  <div key={index} className={`w-32 h-32 ${colors[reel]} rounded-full flex items-center justify-center text-6xl transition-all duration-500 ease-in-out ${spinning ? 'animate-spin' : ''}`}>
                    {spinning ? <Loader2 className="animate-spin" size={64} /> : symbols[reel]}
                  </div>
                ))}
              </div>
              <Button 
                onClick={spin} 
                disabled={spinning || balance < 10} 
                className="w-full text-2xl py-8 bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-all duration-300"
              >
                {spinning ? 'Spinning...' : 'Spin (10 credits)'}
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-yellow-500 border-2">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-500">Game Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-3xl font-bold">Balance: <span className="text-green-500">{balance}</span> credits</p>
                <p className="text-2xl">Jackpot: <span className="text-yellow-500">{jackpot}</span> credits</p>
                {win > 0 && (
                  <Alert className="bg-green-500 text-black animate-bounce">
                    <AlertTitle className="text-xl font-bold">Congratulations!</AlertTitle>
                    <AlertDescription className="text-lg">You won {win} credits!</AlertDescription>
                  </Alert>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={() => setBalance(prev => prev + 100)} className="w-full bg-green-500 hover:bg-green-600 text-black">
                    <DollarSign className="mr-2" />
                    Add 100 credits
                  </Button>
                  <Button onClick={() => setBalance(1000)} variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                    <RefreshCw className="mr-2" />
                    Reset Balance
                  </Button>
                </div>
                <Button onClick={() => setSound(!sound)} className="w-full bg-blue-500 hover:bg-blue-600">
                  {sound ? <Volume2 className="mr-2" /> : <VolumeX className="mr-2" />}
                  {sound ? 'Mute Sound' : 'Unmute Sound'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LuckySpin;