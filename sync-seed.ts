import { productService } from './src/services/productService';
import { richSeedProducts } from './src/data/seedData';

async function sync() {
  console.log('🚀 Iniciando sincronización forzada de productos...');
  
  try {
    const dbProducts = await productService.getAll();
    console.log(`📡 Conectado. Encontrados ${dbProducts.length} productos en la base de datos.`);

    let updatedCount = 0;

    for (const seedProduct of richSeedProducts) {
      // Buscamos coincidencia por slug
      const match = dbProducts.find(p => p.slug === seedProduct.slug);
      
      if (match) {
        console.log(`📦 Actualizando información técnica: ${seedProduct.name}...`);
        
        // Actualizamos forzosamente los campos de información extendida
        await productService.update(match.id, {
          careInstructions: seedProduct.careInstructions,
          warranty: seedProduct.warranty,
          shippingDetails: seedProduct.shippingDetails,
          features: seedProduct.features,
          techSpecs: seedProduct.techSpecs,
          specsDescription: seedProduct.specsDescription,
          // También aseguramos el badge por si acaso
          badge: seedProduct.badge
        });
        
        updatedCount++;
      } else {
        console.log(`⚠️  Producto del seed no encontrado en DB: ${seedProduct.name}`);
      }
    }

    console.log(`\n✨ ¡Éxito! Se han sincronizado ${updatedCount} productos con la nueva información técnica.`);
  } catch (err: any) {
    console.error('❌ Error fatal durante la sincronización:', err.message);
  }
}

sync();
