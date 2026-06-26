import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "₹2B+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
    title: "Advanced Analytics",
    description:
      "Get detailed insights into your spending patterns with AI-powered analytics",
  },
  {
    icon: <Receipt className="h-8 w-8 text-blue-500" />,
    title: "Smart Receipt Scanner",
    description:
      "Extract data automatically from receipts using advanced AI technology",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-500" />,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-blue-500" />,
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-500" />,
    title: "Multi-Currency",
    description: "Support for multiple currencies with real-time conversion",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    title: "Automated Insights",
    description: "Get automated financial insights and recommendations",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-500" />,
    title: "1. Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
    title: "2. Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-500" />,
    title: "3. Get Insights",
    description:
      "Receive AI-powered insights and recommendations to optimize your finances",
  },
];

// Pricing Plans Data in Indian Rupees (₹)
export const pricingPlans = [
  {
    name: "Basic",
    price: "999",
    period: "month",
    description: "Essential financial tracking and AI budget recommendations for individuals.",
    buttonText: "Get Started",
    features: [
      "Track up to 5 accounts or cards",
      "Basic AI budget recommendations",
      "Smart receipt scanning (50/month)",
      "Standard financial analytics & reports",
      "Email support",
      "Real-time transaction sync"
    ],
    subtext: "1500+ users trusted free"
  },
  {
    name: "Standard",
    price: "2,499",
    period: "month",
    description: "Complete expense management and advanced AI analytics for growing teams.",
    buttonText: "Get Started",
    isPopular: true,
    features: [
      "Everything in Basic",
      "Unlimited accounts & cards tracking",
      "Advanced AI budget optimization",
      "Unlimited receipt scanning",
      "Multi-currency support & conversion",
      "24/7 chat support & insights"
    ],
    subtext: "750+ growing businesses"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "custom",
    description: "Bespoke financial solutions, custom AI agents, and corporate consolidation.",
    buttonText: "Contact Sales",
    features: [
      "Bespoke-grade AI auditing agent",
      "Full developer API access",
      "Multi-entity & corporate consolidation",
      "Dedicated advisor & support manager"
    ],
    subtext: "250+ global enterprises"
  }
];

// FAQ Data referencing WELTH
export const faqData = [
  {
    question: "What is WELTH?",
    answer: "WELTH is a state-of-the-art AI-powered platform designed to automate and optimize financial management. It uses intelligent agents to track, analyze, and forecast your finances."
  },
  {
    question: "How are AI Agents different from automation tools?",
    answer: "Unlike static rule-based automation tools, AI Agents learn from your behavior, adapt to new transaction patterns, make intelligent budgeting suggestions, and proactively flag anomalies."
  },
  {
    question: "Can WELTH integrate with existing systems?",
    answer: "Yes, WELTH integrates seamlessly with bank accounts, credit cards, invoicing software, and developer APIs to consolidate your financial data in real time."
  },
  {
    question: "Is WELTH secure for enterprise use?",
    answer: "Security is our core priority. We use industry-standard encryption, comply with global data regulations, and support secure MFA verification."
  },
  {
    question: "How quickly can WELTH be implemented?",
    answer: "Setup takes under two minutes. Bank feeds, categorization models, and real-time visualization dashboards are generated instantly on integration."
  },
  {
    question: "Can AI Agents replace human financial advisors?",
    answer: "No. Our AI agents automate execution and heavy analytical computation, giving you and your advisor better data to make informed strategic decisions."
  },
  {
    question: "How does WELTH improve daily workflows?",
    answer: "By automating manual data entry, processing invoices, reading receipts, and alerting you dynamically to critical cash flow changes."
  },
  {
    question: "Is WELTH scaleable for global operations?",
    answer: "Yes. WELTH natively supports multi-currency transactions, automatic tax structures, and multi-entity account consolidation."
  }
];
