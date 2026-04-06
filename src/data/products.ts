export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  sport: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: 'vortex-elite-fg',
    name: 'Vortex Elite FG',
    price: 219.99,
    category: 'Footwear',
    sport: 'Soccer',
    rating: 4.9,
    reviews: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwG3PC6Nr9e7cDTRQlqNDUb1-YPV6JyLX-h-Ik4RLu-YE2jQ6Q6zOYboQDiWBrXMnuEHkzD5H3J8dYDa8jLOf_MXTWg2yxvV5fmDWUcOrZHOAMKbOhdTDd_3k5Y1oK9Tk3-Bnol9B7a5aJ_rX9zEx8E1O54Bcp_Bl8mULb2JmK50a5RifHL37vJr37dF1e61fBprfnOhooLqnYxRyNoFjTrpAwJMEdiT77VKUVq04Fc-wOKLao5hkTJUNrv8NqyCRzznuUax323xo',
    badge: 'New Arrival',
    description: 'Precision engineered for elite strikers. Aerodynamic synthetic upper with adaptive traction system.',
  },
  {
    id: 'aero-pulse-jersey',
    name: 'Aero-Pulse Jersey',
    price: 65.00,
    category: 'Apparel',
    sport: 'Training',
    rating: 4.7,
    reviews: 84,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV2frIJwtHfB3vavtIRx3_8bgnjQuRoE4M95-FQQ6t2tVasqp70nlKcWfcoeI8TG_kngRv0sS0v20F4Khm8aWKtOO3o1jqduIrxaV1XaSFmtPx9hVfDjuU69-US6XOCk7HFrwDEr55YvtZOF9MAXeyHoiFXKVjK3-M3CVpiOM1dTA4c7pgqIz0LF8zIJVTwlbiaM319Kk3uUBHCZfpcgwaEsAWiDNECpgMDSAL7PJ2elFBzQCtqqoPefBcYDxABSycVNuGxVhMSqQ',
    description: 'High-performance black training jersey with kinetic momentum branding.',
  },
  {
    id: 'momentum-pro-ball',
    name: 'Momentum Pro Ball',
    price: 140.00,
    category: 'Equipment',
    sport: 'Soccer',
    rating: 5.0,
    reviews: 215,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQJIW8nCboO0XaTqaGoQ9BlqUOABc4zo8Tiilis_ygPNS0g-XTLPTLCkHat-RPYv8FiWAiB2_8CQLkOPzYDHnH7DQy6gRK23gnOz5h4L0fMFTSW7poyhnL9QFRh2btFcrliV-FPVSqWpm47e-w57ehLBALkinzI2oSub_gOK1TQkfiO4CIwFlpAzfNs6u3l7wfnx-n5ygV0ElhyfIrO7pcWDIEOrp0Zbf7qp5pSRDgKIi3ohd0PpvmBOOcfs7FruedMEEQG6T74xo',
    description: 'Premium pro-level soccer ball with geometric patterns and bright orange accents.',
  },
  {
    id: 'velocity-trainer-z',
    name: 'Velocity Trainer Z',
    price: 128.00,
    originalPrice: 160.00,
    category: 'Footwear',
    sport: 'Training',
    rating: 4.8,
    reviews: 312,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLHSCBPQ6llBDoXzXTXE6THX5SmxAqotbwo94v8zQ6J0ZWYhKrG4EOR4Kajm6IEg1ycbm7q7FkUteSij3EPuI-mWa5rQHRK5cJ7abyCsCtVKkSBNF9HMtzc0LyKqa9D_91tCzo8Xgew0vKHTduDYrPpkuTw8zJfGsdZ9D5eWk3knhUyQPaJrkPyM-614BHaWBFTfIFsnYFPxZmAApeAN51PijW0BrWJZD0vYZ4kRHmF5zHmw9YNAAfWqqjAvdoBx6jYGPbJQpdOho',
    badge: 'Sale -20%',
    description: 'Lime green athletic running shoes with breathable mesh and dynamic sole design.',
  },
  {
    id: 'kinetix-base-layer',
    name: 'Kinetix Base Layer',
    price: 45.00,
    category: 'Apparel',
    sport: 'Training',
    rating: 4.6,
    reviews: 56,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEPNnshFeAUV9182Phh_lHQko-to8_kVQeBbjU_-Fohrfuy-_fmElnVmI78zQJ6kjFOSd5A4EhnyKCV97jDDOPtA4e2q4CXQe_MvtJ-kjpT2Z5e08IFB3pn7iIWWq28rdN-NSJWG_3u9uWoUKxCG6N7kPtqbO1K0RR9mCrksav0bueD8HYrx5O6n95KcKzotuo8NCgMMQzNMrkPUYNdjv4dtqnfO3XkMM0pzOAgF8h5JrvL8lc6oMOs9lt6ZL0vyc8Kfsh5EoOXLU',
    description: 'Black compression tights for athletes with ergonomic stitching and reflective details.',
  },
  {
    id: 'precision-chrono-x',
    name: 'Precision Chrono X',
    price: 89.00,
    category: 'Equipment',
    sport: 'Coach',
    rating: 4.9,
    reviews: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLA6WzA8kI1sLf7SpxoBdOeAz3PTyMMT4-tgf1JZLmONL0nSshP1h-IliSeBp92Ug9NGZO-_oMYtIcblpxxndz-5Yc-CF41ieHqZrT9WB5L3Fo_5MsVLEyKaNDSFo1ksSKYejOA6wHVi1nGs_9n1BclfluV8tufs84LS2grHzzcPoYUz4NYpNU80NSnJmFZjqYFpCFZDgqjhSpoAq19Nmy8jhlQhXoJf1AnRoQc2AnnSO-xBM-7WFLMrgnppsC0hDmrbHcEATKKds',
    description: 'Professional sports stopwatch with digital display and rugged tactile design.',
  },
];

export const featuredProducts = {
  hero: {
    name: 'VELOCITY ELITE PRO',
    subtitle: 'Precision carbon-fiber chassis.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_Yp1juV1Cu6uZlivPTfetFg2Fk9K9pa_KhLr2PZ1yvVp_c4lM4eqTILaKQ7ad2fM1_QgNZtJ5dsTbWX2r2B11FGulNu_z7LtMdNN7W-0i5GKpb2bWD8rTlz2taBtsrIRpsMpWbqO2uV0hGn9OkgPqFYmqu6Er_6IuYsUI2ECgkK4SoPD1cJe-Q2PU_sKxoatPi4h68-Mz3Ctza7j4y3LhaC1hGz6UCCCwT2s67ySxAfzoseW-qY-9geb_qtqBOgpslD_pCtF8x54',
  },
  small: [
    {
      tag: 'Tactical',
      name: 'GRIP-TECH GOALIE GLOVES',
      price: '$120.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoQYTfYAWg9ZXDzEAfTDTUoDG5es5NEiPwBZpIQDAxlgGLZyGcoAk0bDMrT_hUTAgoOelGK75ZQg9TcG0z9A6lJJ1LAjUIFhJ0WwcTfw4OhyHgxiYEvERoUQGQMD-LbGYp1DNxc57aEs5BrQCyE9fzaKpSVNx4I3iges9HW9h79pnA5SV8jx4jdcoex7Y2T2Dc3f9PzS38dlZ7GkAJye9oN-uUl8LNosZJeDcM-0uj5PesIJDsHUBhcWNJ_pEl7oyX0Gpkuq2pMww',
    },
    {
      tag: 'Apparel',
      name: 'STADIUM PRE-MATCH KIT',
      price: '$85.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtFcU-ouZi75UYtlsWXzNDh_2o317tP7XEnhIOFmAC3aHQEmmSUA7xdw5jMm-WNMeotFrG8VxF48TAU_T-OqJ6CyJaBgU-dFEGiRZ2FwypymKox-71A0Rk3lr-DvHUsojjO6ARfcb3iUWsUZzbqnMwoHJs_mG085DvxsUMyHJOoVfm4Qr2mhOr9RL9nc6gDFKkuZly3PsSYnpgyDCBA6Eu3HKUcz7zaBg9t5AmdR7YeH6fWVWxA6Vd3WuKEPJZtE2vnAP52NDkc6o',
    },
  ],
};

export const relatedProducts = [
  {
    name: 'MOMENTUM ELITE BALL',
    price: '$140.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPVOeoYd-w7kcRfR1M8EDwbbddXEadb17kOTjrYBEjJr5taaFm-wGw11taBcNQ0JPJNPhlWLAIUgPEBRcNdblNkdxG4Q0Pvonb9OraQCGfuCmq-Zoe0EG6CNuh0DtijSP3HbYczN82DVc6yrj-Fe760_MzvJ_rTcnitc41er9nTb9Eu-_T6EDJZjwajdOYGwQY73dXsP2aSQLE52pGqpJkGSuRuYmkP28BmnLKBvoANWA150zil9O6RZkfsHPtEDwMReXvjism5hU',
  },
  {
    name: 'STRIKER TRAINING JERSEY',
    price: '$85.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdWLtsEPZzO25i6685hHEAD3ex5YnuFDfkdKvOCO5nFP4B1kUZbMXgz-aCew6pemqQXQU7lBSS0Nf7L_InLx_OX_yT91Q4_VJLuUC60WdsOlEOSOAnCvAfPA_U8u9bzfkKfS007eKT81CcQDag3KITOwN6bu_rl3pqHygZgr_2F3PhA6Ijt934fYFg-28u8xRwTDHr0yL0P-7iIGnoYN-dR0rL0npvO6EFE0uB-pLcb9YBwtIjx_xvN_wVzPkNsG6exw62tEDSKAs',
  },
  {
    name: 'GRIP-PRO PERFORMANCE SOCKS',
    price: '$32.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3ygAEsHhu_HiL1E9xdtJP3Mg6Sr1rgkPI6GWJr5cLM3XSy5MpDhGUoJxPHBZ5YKFrZLLxYP-PjoLsFlf9AM_gcIRgWF_hvKTbz_9N3NSgu2CpnHdrqebEnLjf_0O-Lit1iVLfRctNqzA9lBP93KTreeaDOw8nP_8Jd-7BI454l9rAEbunAqjT5loI3pmbUIewfTCmj74dBq8SJvqsnIRU-AyMdW_eCrlH-hkjly9jTE19Z38CSeZSzvVevgiFY0dTjSJHJQZOvZ0',
  },
];
