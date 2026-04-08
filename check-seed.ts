import { productService } from './src/services/productService';
import { richSeedProducts } from './src/data/seedData';

async function verify() {
  console.log('Verificando productos en el backend...');
  try {
    const products = await productService.getAll();
    console.log(`Encontrados ${products.length} productos en el backend.`);
    
    const seedSlugs = richSeedProducts.map(p => p.slug);
    const existingSeed = products.filter(p => seedSlugs.includes(p.slug));
    
    console.log(`Productos del seed encontrados: ${existingSeed.length} de ${richSeedProducts.length}`);
    
    if (existingSeed.length === 0) {
      console.log('EL SEED NO SE HA CARGADO AÚN.');
    } else if (existingSeed.length < richSeedProducts.length) {
      console.log('EL SEED ESTÁ CARGADO PARCIALMENTE.');
    } else {
      console.log('EL SEED YA ESTÁ TOTALMENTE CARGADO.');
    }
  } catch (err: any) {
    console.error('Error al conectar con la API:', err.message);
  }
}

verify();
