import { UploadIcon, VideoIcon, ZapIcon } from 'lucide-react';

export const featuresData = [
    {
        icon: <UploadIcon className="w-6 h-6" />,
        title: 'Model & Product Sync',
        desc: 'Upload your product and a model photo; our AI seamlessly blends them into a realistic scene.'
    },
    {
        icon: <ZapIcon className="w-6 h-6" />,
        title: 'AI Scripting & Voice',
        desc: 'Automatically generate high-converting scripts and studio-quality voiceovers in seconds.'
    },
    {
        icon: <VideoIcon className="w-6 h-6" />,
        title: 'Viral Social Formats',
        desc: 'Instantly export videos in 9:16 or 16:9 formats, optimized for TikTok, Reels, and YouTube Shorts.'
    }
];

export const plansData = [
    {
        id: 'starter',
        name: 'Starter',
        price: '$0',
        desc: 'Perfect for trying out our AI.',
        credits: '5 Credits',
        features: [
            'Basic Model & Product Sync',
            'Standard AI Voiceovers',
            'Watermarked exports',
        ]
    },
    {
        id: 'pro',
        name: 'Growth',
        price: '$29',
        desc: 'For active creators and brands.',
        credits: '50 Credits',
        features: [
            'Premium AI Scenery',
            'Studio-quality Voiceovers',
            'No watermarks',
            'Priority rendering',
            'Email support'
        ],
        popular: true
    },
    {
        id: 'ultra',
        name: 'Scale',
        price: '$99',
        desc: 'For high-volume performance ads.',
        credits: '200 Credits',
        features: [
            'Custom AI Fine-tuning',
            'Unlimited video storage',
            'Dedicated account manager',
            'API Access',
            '24/7 Priority support'
        ]
    }
];

export const faqData = [
    {
        question: 'How does the AI generation work?',
        answer: 'We use advanced vision-language models to analyze your product and model images, blending them into a cohesive scene with professional lighting and motion.'
    },
    {
        question: 'What kind of images should I upload?',
        answer: 'High-resolution photos with clear lighting work best. Ensure the product is well-centered and the model has a natural pose for the best results.'
    },
    {
        question: 'Can I use the videos for commercial ads?',
        answer: 'Absolutely! All generated content includes a commercial license, allowing you to use them across all advertising and social platforms.'
    },
    {
        question: 'How long does it take to generate a video?',
        answer: 'Our AI engine typically processes and renders your video in 60-90 seconds, delivering high-quality results in real-time.'
    }
];

export const footerLinks = [
    {
        title: "Platform",
        links: [
            { name: "Home", url: "/" },
            { name: "Generate", url: "/generate" },
            { name: "Pricing", url: "/plans" }
        ]
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", url: "#" },
            { name: "Terms of Service", url: "#" }
        ]
    },
    {
        title: "Support",
        links: [
            { name: "Help Center", url: "#" },
            { name: "Contact Us", url: "#" },
            { name: "Twitter", url: "#" }
        ]
    }
];