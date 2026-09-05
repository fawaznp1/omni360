import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import AIConsole from '@/components/ai/AIConsole/AIConsole';
import styles from './Layout.module.scss';
import { Bot, X } from 'lucide-react';

export default function Layout() {
    const [aiOpen, setAiOpen] = useState(false);
    const location = useLocation();
    const isAIPage = location.pathname === '/ai';

    return (
        <div className={styles.layout}>
            <Header onToggleAI={() => setAiOpen(!aiOpen)} />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />

            {/* Persistent FAB Desktop & Mobile */}
            {!isAIPage && (
                <button
                    className={`${styles.aiFab} ${aiOpen ? styles.fabOpen : ''}`}
                    onClick={() => setAiOpen(!aiOpen)}
                    aria-label={aiOpen ? "Close AI Assistant" : "Open AI Assistant"}
                >
                    {aiOpen ? <X size={24} /> : <Bot size={24} />}
                    {!aiOpen && <span className={styles.fabPulse} />}
                </button>
            )}

            {/* Universal AI Popup */}
            {aiOpen && !isAIPage && (
                <div className={styles.aiPopupOverlay} onClick={() => setAiOpen(false)}>
                    <div className={styles.aiPopupModal} onClick={e => e.stopPropagation()}>
                        <AIConsole onClose={() => setAiOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}
