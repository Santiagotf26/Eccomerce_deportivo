const API_URL = 'http://localhost:3000/api';

const productsData = [
  {
    slug: 'vortex-phantom-elite-fg',
    name: 'Vortex Phantom Elite FG',
    careInstructions: 'Limpiar con agua fría después de cada uso. No secar bajo el sol directo para proteger el chasis de carbono.',
    warranty: '12 meses por defectos de fábrica en la estructura y costuras.',
    shippingDetails: 'Envío premium con estuche rígido incluido. Entrega en 2-3 días hábiles.'
  },
  {
    slug: 'kinetic-apex-pro',
    name: 'Kinetic Apex Pro Ball',
    careInstructions: 'Mantener a 12psi para óptimo desempeño. Limpiar con paño húmedo. No usar solventes.',
    warranty: '6 meses contra pérdida de presión o deformidades de forma.',
    shippingDetails: 'Se envía inflado en caja protectora. Envío gratis nacional.'
  },
  {
    slug: 'nitro-chase-2',
    name: 'Nitro Chase 2.0',
    careInstructions: 'Retirar plantillas tras usar. Lavar cordones por separado. No usar lavadora.',
    warranty: '6 meses limitada. No cubre desgaste natural de la suela por uso en asfalto.',
    shippingDetails: 'Entrega estándar (3-5 días). Devoluciones gratis los primeros 15 días.'
  },
  {
    slug: 'windbreaker-kinetic-pro',
    name: 'WindBreaker Kinetic Pro',
    careInstructions: 'Ciclo delicado a 30°C. No planchar. Reactivar repelencia al agua con secadora suave.',
    warranty: '1 año en cremalleras y sellado de costuras térmicas.',
    shippingDetails: 'Empaque biodegradable. Envío en 24h hábiles.'
  },
  {
    slug: 'power-compression-top',
    name: 'Power Compression Top',
    careInstructions: 'Lavar con colores similares. No usar suavizante (afecta la transpirabilidad).',
    warranty: '3 meses en elasticidad y costuras planas.',
    shippingDetails: 'Envío gratis en compras superiores a $50.'
  },
  {
    slug: 'precision-chrono-watch',
    name: 'Precision Chrono Watch X',
    careInstructions: 'Resistente 5ATM. Limpiar sensor tras nadar en mar. Cargar solo con cable original.',
    warranty: '24 meses en componentes electrónicos y batería.',
    shippingDetails: 'Envío asegurado con seguimiento en tiempo real.'
  },
  {
    slug: 'grip-tech-gloves',
    name: 'Grip-Tech Pro Gloves',
    careInstructions: 'Humedecer ligeramente el látex antes de usar. Lavar a mano sin frotar agresivamente.',
    warranty: '30 días en el látex de palma (zona de alto desgaste). 90 días en el cuerpo.',
    shippingDetails: 'Incluye bolsa de transporte ventilada.'
  },
  {
    slug: 'apex-training-jersey',
    name: 'Apex Training Jersey',
    careInstructions: 'No necesita planchado. Lavar del revés para proteger el logo estampado.',
    warranty: '6 meses contra decoloración prematura.',
    shippingDetails: 'Entrega en oficina de correos o domicilio.'
  },
  {
    slug: 'elite-gym-bag',
    name: 'Elite Gym Bag 45L',
    careInstructions: 'Limpiar interior con alcohol diluido. Secar totalmente antes de guardar prendas húmedas.',
    warranty: '12 meses en correas y base reforzada.',
    shippingDetails: 'Garantía de entrega protegida contra daños.'
  },
  {
    slug: 'velocity-strike-shorts',
    name: 'Velocity Strike Shorts',
    careInstructions: 'Lavar en frío. El secado rápido elimina la necesidad de secadora eléctrica.',
    warranty: '6 meses en banda elástica de cintura.',
    shippingDetails: 'Envío nacional económico.'
  },
  {
    slug: 'nitro-carbon-race',
    name: 'Nitro Carbon Race',
    careInstructions: 'Solo para uso en pista o asfalto limpio. Limpiar suela de carbono con paño de microfibra.',
    warranty: '6 meses en integridad del chasis de carbono.',
    shippingDetails: 'Envío express prioritario.'
  },
  {
    slug: 'thermal-grip-layer',
    name: 'Thermal Grip Base Layer',
    careInstructions: 'Lavar a mano preferiblemente. No usar blanqueadores ni secadora.',
    warranty: '6 meses en retención térmica.',
    shippingDetails: 'Entrega en 2 días hábiles.'
  }
];

async function run() {
  console.log('--- KINETIC MASS SYNC ---');
  
  try {
    // 1. Login to get token
    console.log('🔐 Iniciando sesión como admin...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@kinetic.com', password: 'admin123' })
    });
    
    if (!loginRes.ok) throw new Error('Error de login');
    const { access_token } = await loginRes.json();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    };

    // 2. Get all products to find IDs
    console.log('📡 Obteniendo lista de productos...');
    const prodRes = await fetch(`${API_URL}/products`, { headers });
    const dbProducts = await prodRes.json();
    console.log(`Encontrados ${dbProducts.length} productos.`);

    // 3. Sync
    let updated = 0;
    for (const seed of productsData) {
      const match = dbProducts.find(p => p.slug === seed.slug);
      if (match) {
        console.log(`📦 Sincronizando: ${seed.name}...`);
        const updateRes = await fetch(`${API_URL}/products/${match.id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            care_instructions: seed.careInstructions,
            warranty: seed.warranty,
            shipping_details: seed.shippingDetails
          })
        });
        
        if (updateRes.ok) updated++;
        else console.error(`   ❌ Error al actualizar ${seed.name}`);
      } else {
        console.log(`⚠️  Saltando ${seed.name} (no existe en DB)`);
      }
    }

    console.log(`\n✅¡Éxito! Se han actualizado ${updated} productos.`);
  } catch (error) {
    console.error('❌ Error fatal:', error.message);
  }
}

run();
