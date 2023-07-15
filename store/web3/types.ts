export interface IUserData {
    id: number
    userName: string
    password: string | undefined | any
    email: string | undefined
    purchase: string | undefined
    role: number
    emailVerificationToken: any
    emailVerified: 0 | 1
    avatar: string | undefined
    banner: string | undefined
    description: string | undefined
    firstName: string | undefined
    lastName: string | undefined
    name: string | undefined
    phone: string | undefined
    about: string | undefined
    website: string | undefined
    facebookSite: string | undefined
    instagramSite: string | undefined
    twitterSite: string | undefined
    twitterVerified: 0 | 1
    instagramVerified: 0 | 1
    youtubeVerified: 0 | 1
    websiteVerified: 0 | 1
    locale: string | undefined
    youtubeSite: string | undefined
    discordSite: string | undefined
    zoomMail: string | undefined
    inviteCode: string | undefined
    following: number
    followers: number
    userNftRole: number
    isNonCrypto: number
    status: number
    createdAt: string
    updatedAt: string
    forgotPassword: any
    lastLogin: any
    discord: string
    userWallet: {
        id: number
        address: string
        type: number
        nonce: number
    }

    youtube: string
    zoom: string
    setHide: boolean
    hide: boolean
    FA2_enabled: boolean
    xanaPassword: string | undefined
}
