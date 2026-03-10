export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/abbysegalmagic/',
  youtube: 'https://www.youtube.com/channel/UC9IvIVvbBis47CZWKV7tjLg',
  facebook: 'https://www.facebook.com/abbysegalmagic/',
} as const

export const SOCIAL_LINKS_ARRAY = [
  { label: 'Instagram', url: SOCIAL_LINKS.instagram },
  { label: 'YouTube', url: SOCIAL_LINKS.youtube },
  { label: 'Facebook', url: SOCIAL_LINKS.facebook },
] as const