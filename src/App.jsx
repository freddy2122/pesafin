import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { 
  Home, 
  Plus, 
  History as HistoryIcon, 
  BarChart3, 
  Settings, 
  User, 
  Brain,
  ArrowUp,
  ArrowDown,
  PieChart,
  Download,
  Languages,
  CreditCard,
  ChevronRight,
  Bell,
  Target,
  TrendingUp,
  Wallet,
  Eye,
  EyeOff,
  Star,
  Shield,
  Smartphone
} from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './App.css';
import pesafinLogo from './assets/pesafin_logo.png';
import onboardingIllustration from './assets/onboarding_illustration.png';
import successIllustration from './assets/success_illustration.png';
import aiCoachingIllustration from './assets/ai_coaching_illustration.png';

// Données pour les graphiques
const pieData = [
  { name: 'Nourriture', value: 44, color: '#ef4444' },
  { name: 'Transport', value: 29, color: '#3b82f6' },
  { name: 'Loisirs', value: 20, color: '#22c55e' },
  { name: 'Autre', value: 7, color: '#f59e0b' }
];

const barData = [
  { name: 'Jan', revenus: 85000, depenses: 42000 },
  { name: 'Fév', revenus: 90000, depenses: 45000 },
  { name: 'Mar', revenus: 88000, depenses: 40000 },
  { name: 'Avr', revenus: 92000, depenses: 48000 }
];

// Composant d'animation de page
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Écran de splash/chargement
const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center text-white"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img 
          src={pesafinLogo} 
          alt="PesaFin" 
          className="w-24 h-24 mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <h1 className="text-3xl font-bold mb-2">PesaFin</h1>
        <p className="text-lg opacity-90">Gérez vos finances intelligemment</p>
        <motion.div 
          className="mt-8"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5 }}
        >
          <div className="w-32 h-1 bg-white/30 rounded-full mx-auto overflow-hidden">
            <motion.div 
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Écran d'onboarding
const OnboardingScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Bienvenue sur PesaFin",
      description: "Votre compagnon intelligent pour une gestion financière simplifiée en Afrique",
      image: onboardingIllustration
    },
    {
      title: "Suivez vos dépenses",
      description: "Ajoutez facilement vos transactions et catégorisez vos dépenses pour mieux comprendre vos habitudes",
      image: successIllustration
    },
    {
      title: "Coach IA Premium",
      description: "Bénéficiez de conseils personnalisés et d'alertes intelligentes pour optimiser vos finances",
      image: aiCoachingIllustration
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-sm"
        >
          <img 
            src={steps[currentStep].image} 
            alt={steps[currentStep].title}
            className="w-64 h-64 mx-auto mb-8 object-contain"
          />
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            {steps[currentStep].title}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {steps[currentStep].description}
          </p>
        </motion.div>
      </div>
      
      <div className="p-8">
        <div className="flex justify-center mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 transition-colors ${
                index === currentStep ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <div className="flex gap-4">
          {currentStep > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1"
            >
              Précédent
            </Button>
          )}
          <Button 
            onClick={nextStep}
            className="flex-1"
          >
            {currentStep === steps.length - 1 ? 'Commencer' : 'Suivant'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Composant de navigation principale amélioré
const Navigation = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const navItems = [
    { id: 'dashboard', path: '/', icon: Home, label: 'Accueil' },
    { id: 'add', path: '/add', icon: Plus, label: 'Ajouter' },
    { id: 'history', path: '/history', icon: HistoryIcon, label: 'Historique' },
    { id: 'stats', path: '/stats', icon: BarChart3, label: 'Stats' },
    { id: 'ai', path: '/ai', icon: Brain, label: 'IA', premium: true }
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-4 py-2 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <Link 
            key={item.id}
            to={item.path} 
            className="flex flex-col items-center p-2 relative"
            onClick={() => setActiveTab(item.id)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full transition-colors ${
                activeTab === item.id ? 'bg-primary/10' : ''
              }`}
            >
              <item.icon 
                className={`w-6 h-6 transition-colors ${
                  activeTab === item.id ? 'text-primary' : 'text-gray-600'
                }`} 
              />
            </motion.div>
            <span className={`text-xs mt-1 transition-colors ${
              activeTab === item.id ? 'text-primary font-medium' : 'text-gray-600'
            }`}>
              {item.label}
            </span>
            {item.premium && (
              <Badge className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs px-1 py-0">
                Premium
              </Badge>
            )}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

// Écran d'accueil/tableau de bord amélioré
const Dashboard = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [notifications] = useState(3);

  return (
    <PageTransition>
      <div className="p-4 pb-20 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
        {/* Header amélioré */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center">
            <motion.img 
              src={pesafinLogo} 
              alt="PesaFin" 
              className="w-12 h-12 mr-3"
              whileHover={{ rotate: 5 }}
            />
            <div>
              <h1 className="text-xl font-bold">Bonjour, John 👋</h1>
              <p className="text-gray-600 text-sm">Gérez vos finances intelligemment</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-6 h-6 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </motion.div>
            <Link to="/profile">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-6 h-6 text-gray-600" />
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Solde principal avec animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-6 bg-gradient-to-r from-primary via-blue-600 to-secondary text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm opacity-90">Solde total</p>
                  <div className="flex items-center gap-2">
                    <motion.h2 
                      className="text-3xl font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {balanceVisible ? '125,000 FCFA' : '••••••'}
                    </motion.h2>
                    <motion.button
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {balanceVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </motion.button>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Wallet className="w-8 h-8 opacity-70" />
                </motion.div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-xs opacity-75">Revenus ce mois</p>
                  <p className="font-semibold text-green-200">+85,000 FCFA</p>
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-xs opacity-75">Dépenses ce mois</p>
                  <p className="font-semibold text-red-200">-42,000 FCFA</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions rapides avec animations */}
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/add">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-red-100 hover:border-red-200">
                <CardContent className="p-4 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <ArrowDown className="w-6 h-6 text-red-500" />
                  </motion.div>
                  <p className="font-medium">Ajouter Dépense</p>
                  <p className="text-xs text-gray-500 mt-1">Enregistrer une sortie</p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
          <Link to="/add">
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-green-100 hover:border-green-200">
                <CardContent className="p-4 text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"
                  >
                    <ArrowUp className="w-6 h-6 text-green-500" />
                  </motion.div>
                  <p className="font-medium">Ajouter Revenu</p>
                  <p className="text-xs text-gray-500 mt-1">Enregistrer une entrée</p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        </motion.div>

        {/* Objectifs d'épargne */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-6 border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Target className="w-5 h-5 mr-2 text-accent" />
                Objectif d'épargne
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">39,000 / 50,000 FCFA</span>
                <span className="text-sm text-accent font-bold">78%</span>
              </div>
              <Progress value={78} className="h-2 mb-2" />
              <p className="text-xs text-gray-600">Plus que 11,000 FCFA pour atteindre votre objectif !</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions récentes améliorées */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Transactions récentes</span>
                <Link to="/history" className="text-primary text-sm flex items-center">
                  Voir tout <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: '🍔', name: 'Restaurant', time: 'Aujourd\'hui', amount: '-5,500 FCFA', color: 'red' },
                  { icon: '🚌', name: 'Transport', time: 'Hier', amount: '-1,200 FCFA', color: 'red' },
                  { icon: '💰', name: 'Salaire', time: '1 Jan', amount: '+85,000 FCFA', color: 'green' }
                ].map((transaction, index) => (
                  <motion.div 
                    key={index}
                    className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-${transaction.color === 'red' ? 'red' : 'green'}-100 rounded-full flex items-center justify-center mr-3`}>
                        <span className="text-lg">{transaction.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-gray-500 text-sm">{transaction.time}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${transaction.color === 'red' ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

// Application principale avec gestion des états
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setIsReady(true);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <Router>
      <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Autres routes à implémenter */}
          </Routes>
        </AnimatePresence>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
