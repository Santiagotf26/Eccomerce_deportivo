/**
 * seedData.ts — Catálogo maestro enriquecido.
 * Contiene productos reales, variantes de color con imágenes y especificaciones técnicas.
 */

export const richSeedProducts = [
  // --- FÚTBOL ---
  {
    name: 'Vortex Phantom Elite FG',
    slug: 'vortex-phantom-elite',
    sku: 'VP-ELITE-001',
    price: 249.99,
    originalPrice: 280.00,
    costPrice: 110.00,
    categoryName: 'Calzado',
    sport: 'Fútbol',
    badge: 'Trending',
    shortDescription: 'Ingeniería de precisión con chasis de carbono para máxima velocidad.',
    description: 'Bota de fútbol diseñada para el control total en campos de hierba corta. La tecnología Vortex Grip en la parte superior proporciona un toque preciso, mientras que la placa aerodinámica te impulsa en cada zancada.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Obsidian Blue', hex: '#1a1a2e', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
      { name: 'Crimson Peak', hex: '#d90429', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800' },
      { name: 'Neon Ghost', hex: '#ccff33', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800' }
    ],
    features: [
      { icon: 'speed', title: 'Velocidad Explosiva', desc: 'Placa de fibra de carbono para tracción inmediata.' },
      { icon: 'target', title: 'Toque Maestro', desc: 'Textura micro-grip para control en climas húmedos.' }
    ],
    techSpecs: [
      { label: 'Peso', value: '185g' },
      { label: 'Suela', value: 'FG (Firm Ground)' },
      { label: 'Material', value: 'Kineti-Skin 2.0' }
    ],
    careInstructions: 'Limpiar con agua fría después de cada uso con un cepillo suave. No lavar en lavadora. Evitar secar directamente al sol para evitar que se agriete el chasis.',
    warranty: '3 meses por defectos de fabricación como desprendimiento de suela o fallos en las costuras bajo uso normal.',
    shippingDetails: 'Envío estándar gratuito. Entrega estimada en 3-5 días hábiles a ciudades principales.',
    variants: [
      { id: 'v1', sku: 'VP-8', size: '8', stock: 15, color: 'Obsidian Blue' },
      { id: 'v2', sku: 'VP-9', size: '9', stock: 22, color: 'Obsidian Blue' },
      { id: 'v3', sku: 'VP-10', size: '10', stock: 10, color: 'Obsidian Blue' },
      { id: 'v3b', sku: 'VP-11', size: '11', stock: 5, color: 'Obsidian Blue' }
    ]
  },
  {
    name: 'Kinetic Apex Pro Ball',
    slug: 'kinetic-apex-ball',
    sku: 'BALL-APX-01',
    price: 135.00,
    categoryName: 'Equipamiento',
    sport: 'Fútbol',
    badge: 'Match Ball',
    shortDescription: 'Balón oficial con certificación FIFA Pro para competiciones de élite.',
    description: 'El Kinetic Apex Pro es el resultado de años de investigación aerodinámica. Sus 12 paneles termosellados garantizan una trayectoria predecible y una absorción de agua nula.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Official White', hex: '#ffffff', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800' },
      { name: 'High-Vis Yellow', hex: '#fff01f', image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800' }
    ],
    features: [
      { icon: 'verified', title: 'FIFA Quality Pro', desc: 'Aprobado para los torneos más exigentes.' }
    ],
    techSpecs: [
      { label: 'Talla', value: '5' },
      { label: 'Paneles', value: '12 Termosellados' }
    ],
    careInstructions: 'Humedecer la aguja antes de inflar. No inflar por encima de 0.9 bar. Limpiar con un paño húmedo después de jugar en superficies húmedas.',
    warranty: 'Garantía de 6 meses por pérdida de esfericidad o fallos en el termosellado táctico.',
    shippingDetails: 'Envío gratuito en pedidos superiores a $100. Entrega estimada en 2-4 días hábiles.',
    variants: [
      { id: 'v4', sku: 'BALL-1', size: 'Talla Única', stock: 100, color: 'Official White' }
    ]
  },
  {
    name: 'Nitro Chase 2.0',
    slug: 'nitro-chase-2',
    sku: 'RUN-NC-02',
    price: 160.00,
    originalPrice: 190.00,
    costPrice: 75.00,
    categoryName: 'Calzado',
    sport: 'Running',
    badge: 'Epic Foam',
    shortDescription: 'Amortiguación reactiva para tus carreras de larga distancia.',
    description: 'Siente el retorno de energía infinito con la espuma Nitro. Diseñadas para devorar kilómetros manteniendo tus pies frescos gracias a su malla transpirable de triple capa.',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Solar Orange', hex: '#ff4d00', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800' },
      { name: 'Arctic Blue', hex: '#3a86ff', image: 'https://images.unsplash.com/photo-1512374382149-4332c69f7161?auto=format&fit=crop&q=80&w=800' }
    ],
    features: [
      { icon: 'cloud', title: 'Espuma Nitro', desc: 'Máximo retorno de energía en cada pisada.' }
    ],
    techSpecs: [
      { label: 'Drop', value: '8mm' },
      { label: 'Tipo de pisada', value: 'Neutra' }
    ],
    careInstructions: 'Retirar las plantillas y lavar a mano con jabón suave. Secar exclusivamente al aire. No usar blanqueadores ni secadora térmica.',
    warranty: '3 meses de garantía limitada que cubre defectos de material en la entresuela Nitro o el upper técnico.',
    shippingDetails: 'Envío nacional rápido incluido. Tiempo de entrega nacional: 2-5 días hábiles.',
    variants: [
      { id: 'v5', sku: 'RUN-7', size: '7', stock: 10, color: 'Solar Orange' },
      { id: 'v6', sku: 'RUN-8', size: '8', stock: 18, color: 'Solar Orange' },
      { id: 'v6b', sku: 'RUN-9', size: '9', stock: 25, color: 'Solar Orange' }
    ]
  },
  {
    name: 'WindBreaker Kinetic Pro',
    slug: 'windbreaker-pro',
    sku: 'APP-WB-05',
    price: 95.00,
    categoryName: 'Ropa',
    sport: 'Running',
    badge: 'Waterproof',
    shortDescription: 'Protección ligera contra los elementos, sin sacrificar transpirabilidad.',
    description: 'La chaqueta Kinetic Pro te mantiene seco bajo la lluvia ligera. Sus paneles de ventilación láser en la espalda aseguran que no sobrecalientes durante el esfuerzo máximo.',
    image: 'https://images.unsplash.com/photo-1506760610100-1af6025cf0c7?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Stealth Gray', hex: '#2f3542', image: 'https://images.unsplash.com/photo-1506760610100-1af6025cf0c7?auto=format&fit=crop&q=80&w=800' },
      { name: 'Volt Green', hex: '#2ecc71', image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&q=80&w=800' }
    ],
    careInstructions: 'Lavar a máquina en ciclo delicado con agua fría. No usar suavizantes (afectan la repelencia). Secar colgado a la sombra.',
    warranty: '30 días de garantía total por defectos en cremalleras termoselladas o costuras internas.',
    shippingDetails: 'Envío nacional incluido por tiempo limitado. Recíbelo en 3-6 días hábiles.',
    variants: [
      { id: 'v7', sku: 'WB-S', size: 'S', stock: 20, color: 'Stealth Gray' },
      { id: 'v8', sku: 'WB-M', size: 'M', stock: 35, color: 'Stealth Gray' },
      { id: 'v8b', sku: 'WB-L', size: 'L', stock: 28, color: 'Stealth Gray' }
    ]
  },
  {
    name: 'Power Compression Top',
    slug: 'power-comp-top',
    sku: 'APP-CT-02',
    price: 49.99,
    categoryName: 'Ropa',
    sport: 'Entrenamiento',
    badge: 'Pro Choice',
    shortDescription: 'Soporte muscular avanzado para entrenamientos intensos.',
    description: 'Optimiza tu circulación y reduce la fatiga muscular con nuestra prenda de compresión grado A. Tejido absorbente que te mantiene seco en rekord time.',
    image: 'https://images.unsplash.com/photo-1534438327276-14b5300c3a48?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Dark Metal', hex: '#34495e', image: 'https://images.unsplash.com/photo-1534438327276-14b5300c3a48?auto=format&fit=crop&q=80&w=800' },
      { name: 'Pure White', hex: '#ffffff', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' }
    ],
    careInstructions: 'Lavar con colores similares y agua fría. No planchar sobre logos o zonas de alta compresión. Evitar suavizantes químicos.',
    warranty: '30 días por pérdida prematura de elasticidad o defectos de fabricación en tejidos.',
    shippingDetails: 'Despacho inmediato desde bodega central. Tiempo estimado: 48-72 horas.',
    variants: [
      { id: 'v9', sku: 'PC-M', size: 'M', stock: 50, color: 'Dark Metal' },
      { id: 'v10', sku: 'PC-L', size: 'L', stock: 40, color: 'Dark Metal' }
    ]
  },
  {
    name: 'Precision Chrono Watch X',
    slug: 'precision-chrono-x',
    sku: 'EQ-CW-X',
    price: 110.00,
    categoryName: 'Equipamiento',
    sport: 'Entrenamiento',
    badge: 'New Era',
    shortDescription: 'Cronometraje de grado laboratorio en tu muñeca.',
    description: 'Diseñado para entrenadores y atletas que cuentan cada milésima. Resistente al agua, golpes y con retroiluminación OLED de alto contraste.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Modern Black', hex: '#1e272e', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' }
    ],
    careInstructions: 'Limpiar la correa con un paño seco para eliminar el sudor. Resistente al agua 5ATM (ducha y natación ligera). Evitar vapor caliente.',
    warranty: '1 año de garantía limitada por fallos en el mecanismo interno, pantalla OLED o batería.',
    shippingDetails: 'Envío asegurado premium. Entrega nacional en 2-4 días hábiles.',
    variants: [
      { id: 'v11', sku: 'CW-STD', size: 'Standard', stock: 45, color: 'Modern Black' }
    ]
  },
  {
    name: 'Grip-Tech Pro Gloves',
    slug: 'grip-tech-gloves',
    sku: 'EQ-GL-08',
    price: 85.00,
    categoryName: 'Equipamiento',
    sport: 'Fútbol',
    badge: 'Pro Grip',
    shortDescription: 'Látex de 4mm para un agarre insuperable en cualquier condición.',
    description: 'Los guantes Grip-Tech Pro están diseñados para porteros que no dejan nada al azar. El corte negativo proporciona un ajuste ceñido y una mayor sensibilidad al balón.',
    image: 'https://images.unsplash.com/photo-1521412644187-c49fa0b4e691?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Classic Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1521412644187-c49fa0b4e691?auto=format&fit=crop&q=80&w=800' },
      { name: 'Fire Red', hex: '#ff0000', image: 'https://images.unsplash.com/photo-1510565842603-7b700f1b40fe?auto=format&fit=crop&q=80&w=800' }
    ],
    careInstructions: 'Lavar con agua tibia y jabón especializado para látex después de cada partido. Dejar secar a la sombra, nunca en radiadores.',
    warranty: '2 meses por defectos en las costuras del pulgar o fallos en el cierre de velcro.',
    shippingDetails: 'Envío nacional certificado. Entrega estimada en 3-5 días hábiles.',
    variants: [
      { id: 'v12', sku: 'GL-9', size: '9', stock: 15, color: 'Classic Black' }
    ]
  },
  {
    name: 'Apex Training Jersey',
    slug: 'apex-training-jersey',
    sku: 'APP-TJ-01',
    price: 35.00,
    categoryName: 'Ropa',
    sport: 'Entrenamiento',
    badge: 'Best Seller',
    shortDescription: 'Ligereza y ventilación para tus sesiones diarias.',
    description: 'Nuestra camiseta más vendida. El tejido Apex-Breath permite una circulación de aire óptima, manteniéndote fresco incluso en los momentos más intensos del entrenamiento.',
    image: 'https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Electric Blue', hex: '#2980b9', image: 'https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?auto=format&fit=crop&q=80&w=800' },
      { name: 'Stealth Black', hex: '#2c3e50', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' }
    ],
    careInstructions: 'Lavar a máquina a 30°C. No utilizar blanqueador. Planchar a temperatura baja si es necesario, evitando las zonas de ventilación.',
    warranty: '3 meses por defectos de color o roturas prematuras en costillas laterales bajo uso normal.',
    shippingDetails: 'Envío gratuito por compras de 2 o más unidades. Entrega en 2-5 días.',
    variants: [
      { id: 'v13', sku: 'TJ-M', size: 'M', stock: 60, color: 'Electric Blue' }
    ]
  },
  {
    name: 'Elite Gym Bag 45L',
    slug: 'elite-gym-bag',
    sku: 'ACC-GB-45',
    price: 65.00,
    categoryName: 'Equipamiento',
    sport: 'Entrenamiento',
    badge: 'Heavy Duty',
    shortDescription: 'Espacio optimizado con compartimento ventilado para calzado.',
    description: 'La compañera perfecta para el gimnasio o viajes cortos. Hecha con material resistente al desgarro y una base impermeable para proteger tu equipo.',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Shadow Gray', hex: '#34495e', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800' }
    ],
    careInstructions: 'Limpiar con esponja húmeda. No sumergir en agua. Dejar los compartimentos abiertos para ventilación después del uso.',
    warranty: '6 meses limitada por fallos en cremalleras principales o desprendimiento de correas.',
    shippingDetails: 'Envío estándar nacional gratuito. Recíbelo en 4-7 días hábiles.',
    variants: [
      { id: 'v14', sku: 'GB-STD', size: 'Talla Única', stock: 25, color: 'Shadow Gray' }
    ]
  },
  {
    name: 'Velocity Strike Shorts',
    slug: 'velocity-shorts',
    sku: 'APP-SH-12',
    price: 30.00,
    categoryName: 'Ropa',
    sport: 'Running',
    badge: 'Ultra Light',
    shortDescription: 'Shorts de running con forro interno y bolsillo oculto.',
    description: 'Maximiza tu rango de movimiento con los Velocity Strike. Su diseño lateral abierto y tejido elástico te permiten correr sin restricciones.',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Midnight', hex: '#000000', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800' },
      { name: 'Ocean', hex: '#3498db', image: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?auto=format&fit=crop&q=80&w=800' }
    ],
    careInstructions: 'Lavar en ciclo rápido a 30°C. No usar secadora. El tejido de secado rápido queda listo en pocos minutos al aire libre.',
    warranty: '30 días de satisfacción total por defectos de costura o elasticidad.',
    shippingDetails: 'Despacho en 24h. Tiempo de entrega nacional: 2-4 días hábiles.',
    variants: [
      { id: 'v15', sku: 'SH-M', size: 'M', stock: 40, color: 'Midnight' }
    ]
  },
  {
    name: 'Nitro Carbon Race',
    slug: 'nitro-carbon-race',
    sku: 'RUN-CR-01',
    price: 275.00,
    categoryName: 'Calzado',
    sport: 'Running',
    badge: 'Record Breaker',
    shortDescription: 'La bota de running definitiva para competición.',
    description: 'Placa de carbono de longitud completa y nuestra espuma Nitro-Elite más ligera. Diseñada para batir tus marcas personales en maratón.',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Volt White', hex: '#f9f9f9', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800' },
      { name: 'Nitro Pink', hex: '#ff0055', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800' }
    ],
    careInstructions: 'Uso exclusivo en asfalto/pista. Limpiar con paño seco. No lavar en agua para proteger la integridad de la placa de carbono.',
    warranty: '3 meses limitada. Cubre fallos estructurales en la placa de carbono y entresuela Nitro-Elite.',
    shippingDetails: 'Envío prioritario gratuito con seguimiento en tiempo real. Entrega en 2-4 días.',
    variants: [
      { id: 'v16', sku: 'CR-9', size: '9', stock: 12, color: 'Volt White' }
    ]
  },
  {
    name: 'Thermal Grip Base Layer',
    slug: 'thermal-base-layer',
    sku: 'APP-TH-02',
    price: 55.00,
    categoryName: 'Ropa',
    sport: 'Fútbol',
    badge: 'Winter Ready',
    shortDescription: 'Mantiene el calor corporal en temperaturas bajo cero.',
    description: 'Capa base térmica con zonas de compresión estratégica y tecnología de gestión de humedad para que el frío no te detenga en el campo.',
    image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800',
    colors: [
      { name: 'Deep Navy', hex: '#0a3d62', image: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800' }
    ],
    careInstructions: 'Lavar a máquina a baja temperatura. No usar suavizante. No planchar para no degradar el acabado térmico Grip-Tech.',
    warranty: '30 días por defectos en zonas de compresión o costuras planas térmicas.',
    shippingDetails: 'Envío nacional inmediato. Recíbelo en 2-5 días hábiles.',
    variants: [
      { id: 'v17', sku: 'TH-M', size: 'M', stock: 25, color: 'Deep Navy' }
    ]
  }
];
