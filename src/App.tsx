import { useEffect } from 'react';
import { GamePage } from './pages/GamePage';
import { StartPage } from './pages/StartPage';
import { useGameStore } from './stores/gameStore';

function App() {
  const {
    isLoaded,
    playerName,
    isMusicEnabled,
    loadSavedProgress,
    startGame,
    toggleMusic,
  } = useGameStore();

  useEffect(() => {
    void loadSavedProgress();
  }, [loadSavedProgress]);

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-sky-200 p-4">
        <p className="rounded-3xl bg-white p-6 text-xl font-black text-sky-700 shadow-xl">Memuat permainan...</p>
      </main>
    );
  }

  if (!playerName) {
    return (
      <StartPage
        savedPlayerName={playerName}
        isMusicEnabled={isMusicEnabled}
        onStart={(name) => void startGame(name)}
        onContinue={() => undefined}
        onToggleMusic={() => void toggleMusic()}
      />
    );
  }

  return <GamePage />;
}

export default App;
