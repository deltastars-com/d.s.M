import { companyData } from '@/data/company';
import {
  Facebook,
  Instagram,
  Send,
  PlayCircle,
  Zap,
  Music,
  MessageCircle,
  Users,
  Link as LinkIcon,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  facebook: <Facebook size={20} />,
  instagram: <Instagram size={20} />,
  send: <Send size={20} />,
  'play-circle': <PlayCircle size={20} />,
  zap: <Zap size={20} />,
  music: <Music size={20} />,
  'message-circle': <MessageCircle size={20} />,
  users: <Users size={20} />,
};

export default function SocialMediaBar() {
  const { isRTL } = useLanguage();
  const socialLinks = Object.values(companyData.socialMedia);

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {/* Phone */}
          <a
            href={`tel:${companyData.contact.phone}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition text-sm font-medium"
            title="اتصل بنا"
          >
            <span>📞</span>
            <span className="hidden sm:inline">{companyData.contact.phone}</span>
          </a>

          {/* WhatsApp */}
          <a
            href={companyData.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#25D366] text-white hover:opacity-90 transition text-sm font-medium"
            title="واتساب"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Social Media Icons */}
          {socialLinks.map((social: any) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:scale-110 transition"
              style={{
                backgroundColor: social.color || '#10b981',
                color: 'white',
              }}
              title={social.name}
            >
              {iconMap[social.icon] || <LinkIcon size={18} />}
            </a>
          ))}

          {/* Linktree */}
          <a
            href={companyData.linktree.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition text-sm font-medium"
            title="جميع المنصات"
          >
            <LinkIcon size={18} />
            <span className="hidden sm:inline">Linktree</span>
          </a>
        </div>
      </div>
    </div>
  );
}
