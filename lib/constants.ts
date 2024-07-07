import BarChart from '@/components/icons/bar_chart'
import Calendar from '@/components/icons/calendar'
import CheckCircle from '@/components/icons/check_circled'
import Chip from '@/components/icons/chip'
import ClipboardIcon from '@/components/icons/clipboardIcon'
import Compass from '@/components/icons/compass'
import Database from '@/components/icons/database'
import Flag from '@/components/icons/flag'
import Headphone from '@/components/icons/headphone'
import Home from '@/components/icons/home'
import Info from '@/components/icons/info'
import LinkIcon from '@/components/icons/link'
import Lock from '@/components/icons/lock'
import Message from '@/components/icons/messages'
import Notification from '@/components/icons/notification'
import Payment from '@/components/icons/payment'
import Person from '@/components/icons/person'
import Pipelines from '@/components/icons/pipelines'
import PluraCategory from '@/components/icons/plura-category'
import Power from '@/components/icons/power'
import Receipt from '@/components/icons/receipt'
import Send from '@/components/icons/send'
import Settings from '@/components/icons/settings'
import Shield from '@/components/icons/shield'
import Star from '@/components/icons/star'
import Tune from '@/components/icons/tune'
import Video from '@/components/icons/video_recorder'
import Wallet from '@/components/icons/wallet'
import Warning from '@/components/icons/warning'
import { FacebookIcon, Github, Instagram, Linkedin, Twitter } from 'lucide-react'



export const SideBarOptions = [
    {
        id: 1,
        label: 'Profile',
        icon: BarChart,
        href: '/',
    },
    {
        id: 2,
        label: 'Chat',
        icon: Warning,
        href: '/chat',
    },
    {
        id: 3,
        label: 'Dashboard',
        icon: Pipelines,
        href: '/dashboard',
    },
    {
        id: 4,
        label: 'Website',
        icon: Database,
        href: '/website',
    },
    {
        id: 5,
        label: 'Card',
        icon: Flag,
        href: '/card',
    },
]


export const SocialLinks = [
    {
        id: 1,
        name: "LinkedIn",
        icon: Linkedin,
        tw: "text-blue-400"
    },
    {
        id: 2,
        name: "FaceBook",
        icon: FacebookIcon,
        tw: "text-blue-400"
    },
    {
        id: 3,
        name: "Instagram",
        icon: Instagram,
        tw: "text-purple-400"
    },
    {
        id: 4,
        name: "Twitter",
        icon: Twitter,
        tw: 'text-blue-400'
    },
    {
        id: 5,
        name: "GitHub",
        icon: Github,
        tw: 'text-red-400'
    }
]